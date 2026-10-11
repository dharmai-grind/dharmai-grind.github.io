# DHARMAi

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

## Every update

Bump the `?v=` number on every file link in `index.html` (e.g. `?v=4` to `?v=5`), so visitors get all the new files together instead of a mix of old and new.

## Every year

Add the new Navaratri dates to `js/config.js` so the "Happening now" badge shows at the right time.

## Connecting the AI (free)

The AI runs on Cloudflare Workers AI (free daily allowance), using the open Gemma model. No outside API key is needed.
(We don't use the Gemini API: its terms require users to be 18+ and forbid sites likely to be used by under-18s.)

1. Go to **dash.cloudflare.com**, then **Workers & Pages**, **Create**, **Create Worker**. Name it `dharmai`, then **Deploy**.
2. Click **Edit code**, delete what's there, paste everything from `worker/worker.js`, and click **Deploy**.
3. Open the Worker's **Settings**, then **Bindings**, **Add binding**, **Workers AI**. Name it `AI`, then save and deploy.
4. Copy the Worker's address (like `https://dharmai.<something>.workers.dev`) into `WORKER_URL` in `js/config.js`.

## Accounts (free)

Accounts use a free Cloudflare D1 database: username + password only, no email.
Passwords and recovery codes are stored as salted hashes; nobody can read them.

1. In Cloudflare, go to **Storage & Databases → D1 SQL Database → Create**, and name it `dharmai-db`.
2. Open the Worker, then **Settings → Bindings → Add binding → D1 database**. Name it `DB`, pick `dharmai-db`, and deploy.
3. That's it. The Worker creates its tables automatically on first use.

## Deploying the Worker automatically

`tools/deploy-worker.ps1` uploads `worker/worker.js` to the `dharmai` Worker, keeping its AI and DB bindings:

```
powershell -ExecutionPolicy Bypass -File tools\deploy-worker.ps1
```

It reads a Cloudflare API token (template "Edit Cloudflare Workers") from `%USERPROFILE%\.dharmai\cloudflare-token.txt`, a private file outside this folder that is never committed. If the token is ever lost or leaked, delete it at dash.cloudflare.com/profile/api-tokens and make a new one.

Manual fallback: paste `worker/worker.js` into the Worker's code editor and click **Deploy**.

Free-tier limits apply. If lots of people use it in one day, the tutor may say "try again later."
If Cloudflare retires the default model, set an `AI_MODEL` variable on the Worker to another model from developers.cloudflare.com/workers-ai/models.

## Adding content

- New verse: add it to `js/data/sources.js` with the original text (`sa`, in any script; set `olang` if it isn't Sanskrit), romanization (`iast`) and our own translation (`en`). Don't paste copyrighted modern translations.
- New lesson: copy an existing one in a course file. Card types: `teach`, `mcq`, `tf`, `match`, `order`, `reflect`, `debate`. Questions are tagged `core`, `think` or `trivia`.
- New course: make `js/data/course-<name>.js`, add it to `index.html`, and set its status to `"live"` in `catalog.js`.
