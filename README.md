# dharmAI

Bite-sized, Duolingo-style lessons on Hindu philosophy, history, texts and festivals,
with Angada the vānara and an AI tutor that cites its sources.

Live site (once published): https://dharmai-grind.github.io

## What's where

| File | What it is |
|---|---|
| `index.html` | The page itself |
| `css/style.css` | All the colors and layout |
| `js/config.js` | Settings: the AI Worker address and the Navaratri dates |
| `js/data/sources.js` | The source library (verses and summaries). Lessons and the AI may only cite these. |
| `js/data/course-*.js` | Course content (units, lessons, cards) |
| `js/data/catalog.js` | The course list, including "coming soon" courses |
| `js/data/languages.js` | Languages in the picker |
| `js/mascot.js` | Angada, drawn in code |
| `js/core.js`, `js/lesson.js`, `js/app.js` | How the app works |
| `worker/worker.js` | The free AI helper that runs on Cloudflare (keeps the API key secret) |

Progress, XP and streaks are saved only in each visitor's browser. There are no accounts and no personal data.

## Every year

Add the new Navaratri dates to `js/config.js` so the "Happening now" badge shows at the right time.

## Connecting the AI (free)

1. Go to **aistudio.google.com** with the dharmAI email and click **Get API key**. Copy it, but don't paste it anywhere else.
2. Go to **dash.cloudflare.com** with the same email, then **Workers & Pages**, **Create**, **Create Worker**. Name it `dharmai`, then **Deploy**.
3. Click **Edit code**, delete what's there, paste everything from `worker/worker.js`, and click **Deploy**.
4. Open the Worker's **Settings**, then **Variables and Secrets**, then **Add**. Type `Secret`, name `GEMINI_API_KEY`, and paste the key. Save.
5. Copy the Worker's address (like `https://dharmai.<something>.workers.dev`) into `WORKER_URL` in `js/config.js`.

Free-tier limits apply. If lots of people use it in one day, the tutor may say "try again later."
Google may use free-tier conversations to improve its products, which is why the app tells people not to share personal info.
If Google retires the default model, set a `GEMINI_MODEL` variable on the Worker to a current free model name.

## Adding content

- New verse: add it to `js/data/sources.js` with the original text (`sa`, in any script; set `olang` if it isn't Sanskrit), romanization (`iast`) and our own translation (`en`). Don't paste copyrighted modern translations.
- New lesson: copy an existing one in a course file. Card types: `teach`, `mcq`, `tf`, `match`, `order`, `reflect`, `debate`. Questions are tagged `core`, `think` or `trivia`.
- New course: make `js/data/course-<name>.js`, add it to `index.html`, and set its status to `"live"` in `catalog.js`.
