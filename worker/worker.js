// dharmAI AI Worker (runs free on Cloudflare Workers).
// It keeps the Gemini API key secret and forwards two kinds of requests:
//   POST /ask        -> answer a question, citing only the passages sent with it
//   POST /translate  -> translate a batch of app strings
// Settings (Cloudflare dashboard -> Worker -> Settings -> Variables):
//   GEMINI_API_KEY   (secret)  key from aistudio.google.com
//   GEMINI_MODEL     (optional) defaults to gemini-2.5-flash
//   ALLOWED_ORIGINS  (optional) comma-separated, defaults to the site below

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
    if (!env.GEMINI_API_KEY) return reply({ error: "GEMINI_API_KEY is not set" }, 500);

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

async function gemini(env, system, contents, json) {
  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 1200, ...(json ? { responseMimeType: "application/json" } : {}) },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data.error && data.error.message) || `Gemini error ${res.status}`);
  const parts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
  return parts.map((p) => p.text || "").join("");
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

  const contents = [];
  for (const m of (body.history || []).slice(-8)) {
    contents.push({ role: m.role === "user" ? "user" : "model", parts: [{ text: clip(m.text, 2000) }] });
  }
  contents.push({ role: "user", parts: [{ text: clip(body.question, 1000) }] });
  // Gemini needs the conversation to start with a user turn.
  while (contents.length && contents[0].role !== "user") contents.shift();

  const answer = await gemini(env, system, contents, false);
  return { answer };
}

async function translate(body, env) {
  const strings = (body.strings || []).slice(0, 60).map((s) => clip(s, 1500));
  const lang = clip(body.lang, 40);
  const system = `Translate each string in the JSON array into ${lang}. Rules: return ONLY a JSON array of the same length and order. Keep proper names and technical terms (Brahman, Rāmānuja, Vedānta, prapatti, etc.) recognisable, transliterated into ${lang}'s script if it doesn't use the Latin alphabet. Keep line breaks (\\n) and bullet characters (•). Keep the tone friendly and simple, suitable for kids and teens. Do not add explanations.`;
  const out = await gemini(env, system, [{ role: "user", parts: [{ text: JSON.stringify(strings) }] }], true);
  let arr;
  try { arr = JSON.parse(out); } catch { arr = []; }
  if (!Array.isArray(arr) || arr.length !== strings.length) arr = strings.map(() => null);
  return { strings: arr };
}
