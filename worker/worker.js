// dharmAI Worker (runs free on Cloudflare Workers).
//
// AI (Cloudflare Workers AI, no outside API key):
//   POST /ask        tutor answer, citing only the passages sent with it
//   POST /debate     one debate turn, or a closing summary (action: "summary")
//   POST /translate  translate a batch of app strings
// Accounts (Cloudflare D1 database, username + password, no email):
//   POST /signup  /login  /logout  /recover  /progress/get  /progress/save  /account/delete
//
// Setup (Cloudflare dashboard -> this Worker -> Settings -> Bindings):
//   "Workers AI" binding named AI
//   "D1 database" binding named DB (tables are created automatically)
// Optional variables (Settings -> Variables and Secrets):
//   AI_MODEL         defaults to @cf/google/gemma-4-26b-a4b-it
//   ALLOWED_ORIGINS  comma-separated, defaults to the site below

const DEFAULT_ORIGINS = "https://dharmai-grind.github.io,http://localhost:8080";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || DEFAULT_ORIGINS).split(",").map((s) => s.trim());
    const cors = {
      "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const reply = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method !== "POST") return reply({ error: "Use POST" }, 405);
    if (!allowed.includes(origin)) return reply({ error: "Origin not allowed" }, 403);

    let body;
    try {
      const text = await request.text();
      if (text.length > 200000) return reply({ error: "Request too large" }, 413);
      body = JSON.parse(text || "{}");
    } catch {
      return reply({ error: "Bad JSON" }, 400);
    }

    const path = new URL(request.url).pathname;
    try {
      if (path === "/ask" || path === "/debate" || path === "/translate") {
        if (!env.AI) return reply({ error: "Workers AI binding named AI is missing" }, 500);
        if (path === "/ask") return reply(await ask(body, env));
        if (path === "/debate") return reply(await debate(body, env));
        return reply(await translate(body, env));
      }
      if (!env.DB) return reply({ error: "Accounts aren't set up yet (D1 binding named DB is missing)" }, 500);
      await ensureTables(env);
      const token = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      const r = await accounts(path, body, token, env);
      return reply(r.body, r.status || 200);
    } catch (e) {
      return reply({ error: String(e.message || e) }, 502);
    }
  },
};

// ===================== AI =====================

const MAIN_MODEL = "@cf/google/gemma-4-26b-a4b-it";
const BACKUP_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";

// Pull the reply text out of whatever shape the model returns.
function readText(out) {
  let text = "";
  if (typeof out === "string") text = out;
  else if (out && typeof out.response === "string") text = out.response;
  else if (out && out.choices && out.choices[0]) {
    const c = out.choices[0];
    text = (c.message && c.message.content) || c.text || "";
  } else if (out && out.response && typeof out.response === "object") text = JSON.stringify(out.response);
  // Drop any visible "thinking" from reasoning models.
  return String(text || "").replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

// Short description of an empty/odd reply, for debugging.
function describe(out) {
  try {
    const c = out && out.choices && out.choices[0];
    return JSON.stringify({ keys: Object.keys(out || {}), finish: c && c.finish_reason, usage: out && out.usage }).slice(0, 400);
  } catch { return "unreadable"; }
}

// messages: [{ role: "user" | "assistant", content }]
// Tries the main model (thinking off), then the backup model if the reply is empty.
async function llm(env, system, messages, maxTokens) {
  const all = [{ role: "system", content: system }, ...messages];
  const models = [env.AI_MODEL || MAIN_MODEL, BACKUP_MODEL];
  const notes = [];
  for (const model of models) {
    try {
      const out = await env.AI.run(model, {
        messages: all,
        max_tokens: maxTokens,
        max_completion_tokens: maxTokens,
        temperature: 0.4,
        chat_template_kwargs: { enable_thinking: false },
      });
      const text = readText(out);
      if (text) return text;
      notes.push(model + " empty " + describe(out));
    } catch (e) {
      notes.push(model + " error " + String(e.message || e).slice(0, 200));
    }
  }
  throw new Error("No answer from AI: " + notes.join(" | "));
}

const clip = (s, n) => String(s || "").slice(0, n);

function library(body) {
  return (body.passages || []).slice(0, 8)
    .map((x) => `[[${clip(x.id, 60)}]] (${clip(x.kind, 20)}) ${clip(x.title, 120)}\n${x.sanskrit ? "Original: " + clip(x.sanskrit, 600) + "\n" : ""}Meaning: ${clip(x.text, 900)}`)
    .join("\n\n") || "(no matching passages)";
}

function history(body) {
  const messages = [];
  for (const m of (body.history || []).slice(-10)) {
    messages.push({ role: m.role === "user" ? "user" : "assistant", content: clip(m.text, 2000) });
  }
  return messages;
}

// Rules shared by the tutor and the debater.
function common(p) {
  return `LANGUAGE: Reply in ${clip(p.language, 40) || "English"}. Keep key Sanskrit or Tamil terms, transliterated into that language's script if it doesn't use the Latin alphabet.
LEARNER: studying "${clip(p.school, 40)}"; tradition/background they gave: "${clip(p.tradition, 120) || "none"}". Use their tradition only to choose relevant sources and perspectives, never to assume what they personally believe.
LEVELS: how well the learner knows each topic: ${clip(p.levels, 300) || "not given"}. First decide which topic the question is about, then match that topic's level. The levels must give clearly DIFFERENT answers:
- "new": like explaining to a curious 10-year-old. Story, people, places and why it mattered. NO formulas, NO equations, NO symbols, and no technical terms (e.g. say "adding up an endless list of smaller and smaller numbers", not "infinite series"; say "how things change", not "derivatives"). Use an everyday comparison.
- "basics": name the key technical terms and explain each one simply; at most one simple formula, explained in words.
- "well": full technical detail: correct terminology, formulas, and how the method works, as you'd tell a strong student.
If the topic isn't listed, use "new" unless the question itself is clearly technical.
FORMATTING: never use LaTeX or $…$. Write math in plain text with Unicode symbols, e.g. π/4 = 1 − 1/3 + 1/5 − …, x², √2.
ACCURACY ABOUT SCIENCE HISTORY: credit real, documented achievements (zero, place value, Pāṇini, Āryabhaṭa, the Kerala school, Suśruta, metallurgy) and say clearly what is debated. Never repeat exaggerated claims (e.g. ancient aircraft, "the Vedas contain all modern science"). Traditional medicine is history, not medical advice.

SOURCES (very important):
- Below is a LIBRARY of passages. Cite a passage by writing its id in double square brackets exactly as given, e.g. [[bg-2.13]], right after the sentence it supports.
- NEVER invent a citation or verse number. Only cite ids from the library. Classical sources in any language (Sanskrit, Tamil, Hindi/Awadhi, Telugu, etc.) are welcome when relevant.
- If the library doesn't cover something, you may still use general knowledge, but say plainly it isn't from dharmAI's source library, and don't present it as a quote.
- Distinguish clearly between (a) what a text says, (b) how a school or teacher interprets it, and (c) regional or family practice.
- When schools disagree (e.g. Advaita, Vishishtadvaita, Dvaita), represent each fairly. Never declare one the correct Hindu view.

NO GREETINGS: Do not open with a greeting, salutation or religious exclamation (no "Namaste", "Jai Śrī Rām", "Hari Om", etc.) and don't introduce yourself. Start directly with the content.
SAFETY: Be respectful of all traditions and of other religions. For questions about someone's own rituals or obligations, explain that customs vary and suggest asking family, a teacher or an ācārya. If someone seems upset or unsafe, gently encourage them to talk to a trusted adult. Never ask for personal information.`;
}

async function ask(body, env) {
  const p = body.profile || {};
  const system = `You are dharmAI's tutor, voiced by Angada, a friendly young vānara from the Rāmāyaṇa. You explain Hindu philosophy, history, texts and festivals, and the history of science in ancient and medieval India, to learners from kids to adults with short attention spans. Learner prefers: ${clip(p.focus, 20)} (think = reasoning and comparing views, trivia = facts and stories, both = a mix).

${common(p)}

STYLE: Short and clear: under 120 words. 2–4 short paragraphs or a short list, **bold** for key terms. Explain, don't argue. End with one short follow-up question that invites curiosity.

LIBRARY:
${library(body)}`;
  const messages = history(body);
  messages.push({ role: "user", content: clip(body.question, 1000) });
  while (messages.length && messages[0].role !== "user") messages.shift();
  return { answer: await llm(env, system, messages, 900) };
}

async function debate(body, env) {
  const p = body.profile || {};
  const topic = clip(body.topic, 300);
  const side = clip(body.side, 200);
  const swap = body.style === "both";
  const summary = body.action === "summary";

  const system = summary
    ? `You are the fair judge at the end of a friendly philosophy debate on dharmAI.
Debate question: "${topic}". The learner defended: "${side}".

${common(p)}

Write a short closing summary (under 150 words) with exactly these parts, as bold headings:
**Your strongest point:** the best argument the learner made, in one or two sentences.
**The other side's strongest point:** the best objection raised against them.
**Worth thinking about:** one open question this debate leaves.
No winner, no score, no judgment of the learner's beliefs. Cite library passages where relevant.

LIBRARY:
${library(body)}`
    : `You are Angada, a friendly young vānara from the Rāmāyaṇa, acting as a respectful debate partner on dharmAI.
Debate question: "${topic}". The learner is defending: "${side}". You argue the OPPOSING view${swap ? ", but the learner wants to practice both sides: after about three exchanges, offer to swap sides" : ""}.

${common(p)}

HOW TO DEBATE:
- Each turn, make ONE clear point: the strongest objection a thoughtful philosopher from the opposing view would raise, ideally grounded in a library passage. Then ask one direct question about how the learner would respond.
- If the learner hasn't argued yet, open by briefly stating the opposing position and your first point.
- Engage with what the learner actually said. Acknowledge a good point before pushing back.
- Challenge arguments, never the person. Never say their beliefs are wrong or invalid. You may kindly correct a clear factual error.
- Under 90 words per turn. No lists unless needed.

LIBRARY:
${library(body)}`;

  const messages = history(body);
  messages.push({ role: "user", content: summary ? "Please summarize the debate now." : clip(body.message, 1000) || "Please start the debate." });
  while (messages.length && messages[0].role !== "user") messages.shift();
  return { answer: await llm(env, system, messages, summary ? 900 : 600) };
}

async function translate(body, env) {
  const strings = (body.strings || []).slice(0, 60).map((s) => clip(s, 1500));
  const lang = clip(body.lang, 40);
  const system = `Translate each string in the JSON array into ${lang}. Rules: return ONLY a JSON array of the same length and order. Write everything in ${lang}'s own script: transliterate proper names and technical terms (Brahman, Rāmānuja, Vedānta, prapatti, etc.) into that script rather than leaving them in Latin letters, unless ${lang} uses the Latin alphabet. Keep line breaks (\\n) and bullet characters (•). Keep the tone friendly and simple, suitable for kids and teens. Do not add explanations.`;
  const out = await llm(env, system, [{ role: "user", content: JSON.stringify(strings) }], 4000);
  let arr;
  try {
    // Take the JSON array even if the model wrapped it in ```json fences.
    const s = out.indexOf("["), e = out.lastIndexOf("]");
    arr = JSON.parse(out.slice(s, e + 1));
  } catch { arr = []; }
  if (!Array.isArray(arr) || arr.length !== strings.length) arr = strings.map(() => null);
  return { strings: arr };
}

// ===================== Accounts =====================
// Passwords and recovery codes are stored only as salted PBKDF2 hashes.
// Login tokens are stored only as SHA-256 hashes.

let tablesReady = false;
async function ensureTables(env) {
  if (tablesReady) return;
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, pass_salt TEXT NOT NULL, pass_hash TEXT NOT NULL, rec_salt TEXT NOT NULL, rec_hash TEXT NOT NULL, created INTEGER NOT NULL, fails INTEGER NOT NULL DEFAULT 0, locked_until INTEGER NOT NULL DEFAULT 0)").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created INTEGER NOT NULL)").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS progress (user_id INTEGER PRIMARY KEY, data TEXT NOT NULL, updated INTEGER NOT NULL)").run();
  tablesReady = true;
}

const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const randomHex = (n) => hex(crypto.getRandomValues(new Uint8Array(n)));

async function pbkdf2(secret, saltHex) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), "PBKDF2", false, ["deriveBits"]);
  const salt = new Uint8Array(saltHex.match(/../g).map((h) => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256));
}
const sha256 = async (s) => hex(await crypto.subtle.digest("SHA-256", enc.encode(s)));

function sameHex(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function recoveryCode() {
  const abc = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const r = crypto.getRandomValues(new Uint8Array(12));
  const s = [...r].map((x) => abc[x % abc.length]).join("");
  return s.slice(0, 4) + "-" + s.slice(4, 8) + "-" + s.slice(8);
}
const normCode = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

const SESSION_DAYS = 180;

async function newSession(env, userId) {
  const token = randomHex(32);
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, created) VALUES (?, ?, ?)").bind(await sha256(token), userId, Date.now()).run();
  return token;
}

async function userFromToken(env, token) {
  if (!token) return null;
  const row = await env.DB.prepare("SELECT s.user_id AS id, s.created AS created, u.username AS username FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?").bind(await sha256(token)).first();
  if (!row) return null;
  if (Date.now() - row.created > SESSION_DAYS * 86400000) return null;
  return row;
}

function checkUsername(u) {
  u = String(u || "").trim().toLowerCase();
  if (!/^[a-z0-9_]{3,20}$/.test(u)) return { error: "Usernames are 3–20 characters: letters, numbers and _ only." };
  return { u };
}
function checkPassword(pw) {
  pw = String(pw || "");
  if (pw.length < 8 || pw.length > 200) return "Passwords need at least 8 characters.";
  return null;
}

async function accounts(path, body, token, env) {
  const now = Date.now();

  if (path === "/signup") {
    const cu = checkUsername(body.username);
    if (cu.error) return { status: 400, body: { error: cu.error } };
    const pwErr = checkPassword(body.password);
    if (pwErr) return { status: 400, body: { error: pwErr } };
    const exists = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(cu.u).first();
    if (exists) return { status: 409, body: { error: "That username is taken. Try another." } };
    const code = recoveryCode();
    const ps = randomHex(16), rs = randomHex(16);
    const res = await env.DB.prepare("INSERT INTO users (username, pass_salt, pass_hash, rec_salt, rec_hash, created) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(cu.u, ps, await pbkdf2(String(body.password), ps), rs, await pbkdf2(normCode(code), rs), now).run();
    const userId = res.meta.last_row_id;
    return { body: { token: await newSession(env, userId), username: cu.u, recoveryCode: code } };
  }

  if (path === "/login" || path === "/recover") {
    const u = String(body.username || "").trim().toLowerCase();
    const user = await env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(u).first();
    const bad = { status: 401, body: { error: path === "/login" ? "Wrong username or password." : "Wrong username or recovery code." } };
    if (!user) return bad;
    if (user.locked_until > now) return { status: 429, body: { error: "Too many tries. Wait 15 minutes and try again." } };
    const ok = path === "/login"
      ? sameHex(await pbkdf2(String(body.password || ""), user.pass_salt), user.pass_hash)
      : sameHex(await pbkdf2(normCode(body.recoveryCode), user.rec_salt), user.rec_hash);
    if (!ok) {
      const fails = user.fails + 1;
      await env.DB.prepare("UPDATE users SET fails = ?, locked_until = ? WHERE id = ?").bind(fails >= 10 ? 0 : fails, fails >= 10 ? now + 15 * 60000 : 0, user.id).run();
      return bad;
    }
    if (path === "/recover") {
      const pwErr = checkPassword(body.newPassword);
      if (pwErr) return { status: 400, body: { error: pwErr } };
      const code = recoveryCode();
      const ps = randomHex(16), rs = randomHex(16);
      await env.DB.prepare("UPDATE users SET pass_salt = ?, pass_hash = ?, rec_salt = ?, rec_hash = ?, fails = 0, locked_until = 0 WHERE id = ?")
        .bind(ps, await pbkdf2(String(body.newPassword), ps), rs, await pbkdf2(normCode(code), rs), user.id).run();
      await env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(user.id).run();
      return { body: { token: await newSession(env, user.id), username: user.username, recoveryCode: code } };
    }
    await env.DB.prepare("UPDATE users SET fails = 0, locked_until = 0 WHERE id = ?").bind(user.id).run();
    return { body: { token: await newSession(env, user.id), username: user.username } };
  }

  // Everything below needs a valid login token.
  const me = await userFromToken(env, token);
  if (!me) return { status: 401, body: { error: "You've been logged out. Log in again." } };

  if (path === "/logout") {
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
    return { body: { ok: true } };
  }
  if (path === "/progress/get") {
    const row = await env.DB.prepare("SELECT data, updated FROM progress WHERE user_id = ?").bind(me.id).first();
    return { body: { username: me.username, state: row ? JSON.parse(row.data) : null, updated: row ? row.updated : 0 } };
  }
  if (path === "/progress/save") {
    const data = JSON.stringify(body.state || {});
    if (data.length > 150000) return { status: 413, body: { error: "Progress too large" } };
    const updated = Number(body.updated) || now;
    await env.DB.prepare("INSERT INTO progress (user_id, data, updated) VALUES (?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated = excluded.updated")
      .bind(me.id, data, updated).run();
    return { body: { ok: true, updated } };
  }
  if (path === "/account/delete") {
    const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(me.id).first();
    if (!sameHex(await pbkdf2(String(body.password || ""), user.pass_salt), user.pass_hash)) {
      return { status: 401, body: { error: "Wrong password." } };
    }
    await env.DB.batch([
      env.DB.prepare("DELETE FROM progress WHERE user_id = ?").bind(me.id),
      env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(me.id),
      env.DB.prepare("DELETE FROM users WHERE id = ?").bind(me.id),
    ]);
    return { body: { ok: true } };
  }
  return { status: 404, body: { error: "Not found" } };
}
