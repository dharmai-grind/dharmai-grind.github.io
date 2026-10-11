// dharmAI AI Worker (runs free on Cloudflare Workers, using Cloudflare's own
// Workers AI, so there's no outside API key). Two kinds of requests:
//   POST /ask        -> answer a question, citing only the passages sent with it
//   POST /translate  -> translate a batch of app strings
// Setup (Cloudflare dashboard -> this Worker -> Settings -> Bindings):
//   add a "Workers AI" binding named AI
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
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const reply = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method !== "POST") return reply({ error: "Use POST" }, 405);
    if (!allowed.includes(origin)) return reply({ error: "Origin not allowed" }, 403);
    if (!env.AI) return reply({ error: "Workers AI binding named AI is missing" }, 500);

    let body;
    try {
      const text = await request.text();
      if (text.length > 60000) return reply({ error: "Request too large" }, 413);
      body = JSON.parse(text);
    } catch {
      return reply({ error: "Bad JSON" }, 400);
    }

    const path = new URL(request.url).pathname;
    try {
      if (path === "/ask") return reply(await ask(body, env));
      if (path === "/translate") return reply(await translate(body, env));
      return reply({ error: "Not found" }, 404);
    } catch (e) {
      return reply({ error: String(e.message || e) }, 502);
    }
  },
};

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

async function ask(body, env) {
  const p = body.profile || {};
  const passages = (body.passages || []).slice(0, 8);
  const lib = passages
    .map((x) => `[[${clip(x.id, 60)}]] (${clip(x.kind, 20)}) ${clip(x.title, 120)}\n${x.sanskrit ? "Original: " + clip(x.sanskrit, 600) + "\n" : ""}Meaning: ${clip(x.text, 900)}`)
    .join("\n\n");

  const debate = body.mode === "debate";
  const system = `You are dharmAI (speaking as Angada, a friendly young vānara from the Rāmāyaṇa), a tutor for Hindu philosophy, history, texts and festivals. Learners range from kids to adults with short attention spans.

LANGUAGE: Reply in ${clip(p.language, 40) || "English"}. Keep Sanskrit, Tamil or other source terms in transliteration where helpful.
LEARNER: studying "${clip(p.school, 40)}"; tradition/background they gave: "${clip(p.tradition, 120) || "none"}"; prefers ${clip(p.focus, 20)} (think = critical thinking, trivia = facts, both). Use their tradition only to choose relevant sources and perspectives, never to assume what they personally believe.

SOURCES (very important):
- Below is a LIBRARY of passages. Cite a passage by writing its id in double square brackets exactly as given, e.g. [[bg-2.13]], right after the sentence it supports.
- NEVER invent a citation or verse number. Only cite ids from the library. Classical sources in any language (Sanskrit, Tamil, Hindi/Awadhi, Telugu, etc.) are welcome when relevant.
- If the library doesn't cover something, you may still answer from general knowledge, but say plainly that it isn't from dharmAI's source library, and don't present it as a quote.
- Distinguish clearly between (a) what a text says, (b) how a school or teacher interprets it, and (c) regional or family practice.
- When schools disagree (e.g. Advaita, Vishishtadvaita, Dvaita), present each fairly. Don't declare one the correct Hindu view.

STYLE: Short and clear: usually under 170 words, short paragraphs, **bold** for key terms. End with one curious follow-up question when natural.
SAFETY: Be respectful of all traditions and of other religions. For questions about someone's own rituals or obligations, explain that customs vary and suggest asking family, a teacher or an ācārya. If someone seems upset or unsafe, gently encourage them to talk to a trusted adult. Don't ask for personal information.
${debate ? `
DEBATE MODE: The learner wants a friendly debate. ${body.side ? `Their side: "${clip(body.side, 200)}".` : ""} Respectfully argue against their position: raise the strongest objection a thoughtful philosopher from another view would raise, ideally with a source, then ask how they'd respond. Never say the learner is wrong as a person or that their beliefs are invalid; challenge the argument. You may still correct a clear factual error, kindly. Keep each turn short, one main objection at a time. If they ask, switch sides or summarize both positions.` : ""}

LIBRARY:
${lib || "(no matching passages)"}`;

  const messages = [];
  for (const m of (body.history || []).slice(-8)) {
    messages.push({ role: m.role === "user" ? "user" : "assistant", content: clip(m.text, 2000) });
  }
  messages.push({ role: "user", content: clip(body.question, 1000) });
  // The conversation should start with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();

  const answer = await llm(env, system, messages, 1500);
  return { answer };
}

async function translate(body, env) {
  const strings = (body.strings || []).slice(0, 60).map((s) => clip(s, 1500));
  const lang = clip(body.lang, 40);
  const system = `Translate each string in the JSON array into ${lang}. Rules: return ONLY a JSON array of the same length and order. Keep proper names and technical terms (Brahman, Rāmānuja, Vedānta, prapatti, etc.) recognisable, transliterated into ${lang}'s script if it doesn't use the Latin alphabet. Keep line breaks (\\n) and bullet characters (•). Keep the tone friendly and simple, suitable for kids and teens. Do not add explanations.`;
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
