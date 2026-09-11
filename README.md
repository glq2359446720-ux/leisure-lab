# Leisure Lab｜我们的休闲活动

Bilingual (Chinese–English) learning website for a 5-person English study group. Each member gives a ~5-minute speech on their favourite leisure activities and the benefits.

**Live site:** https://glq2359446720-ux.github.io/leisure-lab/

## What's inside

- **40 activities** across 8 categories (Sports, Outdoor, Reading & Language, Music & Performance, Art & Crafts, Lifestyle Hobbies, Social, Culture & Entertainment)
- **5 bilingual sample speeches** (548 / 535 / 548 / 549 / 548 English words — all within 500–550)
- **Search & filter** by name, category, benefit type, solo/group, cost
- **Favorites** (♡) and **compare** (⚖, max 4) with localStorage persistence
- **Team page**: 5 members with editable names, activity pickers, status tracking, JSON import/export
- **Speech workshop**: editable bilingual text, auto-save, live word count, timer, font sizes, prompt cards, copy / download / print
- **Sources page**: 9 references with verified / 待核验 badges and evidence-usage notes

## File structure

```
leisure-lab/
├── index.html                  # HTML shell
├── css/style.css               # All styling (responsive, print)
├── js/app.js                   # Core app logic (routing, rendering, state)
├── js/data/
│   ├── categories.js           # 8 categories
│   ├── activities-sports.js    # 5 activities
│   ├── activities-outdoor.js   # 5 activities
│   ├── activities-reading.js   # 5 activities
│   ├── activities-music.js     # 5 activities
│   ├── activities-art.js       # 5 activities
│   ├── activities-lifestyle.js # 5 activities
│   ├── activities-social.js    # 5 activities
│   ├── activities-culture.js   # 5 activities
│   ├── speeches.js             # 5 bilingual speeches
│   └── sources.js              # 9 source references
└── README.md
```

## How to run locally

```bash
cd leisure-lab
python3 -m http.server 8765
# Open http://127.0.0.1:8765/
```

Or just open `index.html` directly in a browser.

## How to update content

| Task | File to edit |
|---|---|
| Add or edit an activity | `js/data/activities-*.js` (one file per category) |
| Edit a speech | `js/data/speeches.js` |
| Add or edit a source | `js/data/sources.js` |
| Change colours / layout | `css/style.css` |
| Change app behaviour | `js/app.js` |

After editing, push to the `main` branch — GitHub Actions auto-deploys.

## Data persistence

All user data (favorites, compare list, drafts, member names, settings) is stored in the browser's localStorage under these keys:

| Key | Contents |
|---|---|
| `ll_favorites` | Favorited activity IDs |
| `ll_compare` | Activities selected for comparison |
| `ll_drafts` | Workshop speech edits per member |
| `ll_members` | Team member names, selections, status |
| `ll_settings` | Speech rate, pause time |

Data does not sync across browsers. Use the JSON export/import on the Team page to share configurations.

## Deployment

The site is a static SPA (no build step) deployed to GitHub Pages.

- **Repository:** https://github.com/glq2359446720-ux/leisure-lab
- **Deploy workflow:** `.github/workflows/deploy.yml`
- **Live URL:** https://glq2359446720-ux.github.io/leisure-lab/

To redeploy after changes: push to `main`. The Actions workflow uploads and publishes automatically.

## Browser support

Works in any modern browser (Chrome, Firefox, Safari, Edge). Responsive on mobile and desktop. No login, no paid APIs, no AI-generated core content.
