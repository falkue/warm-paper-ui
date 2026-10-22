# warm-paper-ui

A small, framework-free design kit for calm, warm-toned interfaces and websites.
Three CSS files, an optional 4 KB script, and a set of stroke icons. No build step, no
dependencies, no JavaScript framework. Light and dark themes come built in.

It works for dense app screens (sidebar, week planner, stat tiles) as well as plain
content pages (articles, landing pages, documentation).

**Live examples:** [component gallery](https://falkue.github.io/warm-paper-ui/examples/index.html) · [app shell](https://falkue.github.io/warm-paper-ui/examples/app-shell.html) · [article](https://falkue.github.io/warm-paper-ui/examples/article.html) · [D3 charts](https://falkue.github.io/warm-paper-ui/examples/charts.html)

| | |
|---|---|
| **Examples** | open `examples/index.html` in a browser (works straight from disk) |
| **Gallery** | `examples/index.html`: every component, light and dark side by side |
| **App shell** | `examples/app-shell.html`: sidebar, top bar, stats, week grid, right pane |
| **Article** | `examples/article.html`: a content page with a big serif title and cards |
| **Charts** | `examples/charts.html`: three D3 charts styled from the tokens |
| **For AI agents** | [`AGENTS.md`](AGENTS.md): rules for anyone (human or model) building pages with the kit |

## Quick start

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">

  <!-- Fonts: Instrument Serif (display) + Inter (text), both SIL Open Font License -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap">

  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">

  <!-- Optional: theme switch + mobile sidebar. Load in <head>, without defer. -->
  <script src="js/theme.js"></script>
</head>
<body>
  <main class="container">
    <header class="hero">
      <span class="kicker">Journal</span>
      <h1 class="display">Hello, <em>paper</em></h1>
      <p class="lead">Warm neutrals, one serif, colour only where it means something.</p>
    </header>
    <div class="card">
      <span class="pill c-green">ready</span>
      <b>A card</b>
      <button class="btn primary">Continue</button>
    </div>
  </main>
</body>
</html>
```

Order matters: `tokens.css` first, then `base.css`, then `components.css`.
If you only want the colours and type, `tokens.css` + `base.css` is enough.

Want true half-weights (550, 650)? Load the variable axis instead:
`family=Inter:wght@400..700`. With the static weights above, 550 renders as 600 and 650 as 700.

## Files

```
css/tokens.css       design tokens, light + dark
css/base.css         reset, typography, focus, utilities
css/components.css   all components and layouts
js/theme.js          optional: light/dark/system switch, mobile sidebar
js/chart-theme.js    optional: token bridge for D3 charts
icons/               26 stroke icons (single SVGs, sprite, loader, notes)
examples/            gallery, app shell, article, charts
AGENTS.md            rules for building pages with the kit (humans and AI agents)
```

## Principles of the look

1. **Warm paper neutrals.** Surfaces step from the page (`--page`, a warm off-white with a
   faint three-colour glow) to the window (`--win`), panes (`--pane`) and white cards
   (`--card`). In dark mode the same steps run from near-black to a warm charcoal.
2. **One serif display face.** Instrument Serif at regular weight for titles and headings
   only. One word per heading may be set in `<em>`: it turns italic and coral. Everything
   else is Inter at small, dense sizes (13 px body, 12.5 px controls).
3. **A quiet ink scale.** Four inks (`--ink` to `--ink-4`) carry hierarchy. Uppercase,
   letter-spaced labels (`.label`) name sections instead of heavy headings.
4. **Colour only as tint, and only for meaning.** Seven accents, each with a fixed job:
   blue = selection, links, today · green = done, up · coral = emphasis, error, destructive ·
   orange = attention · yellow = expiring, highlight · violet = generated or suggested ·
   grey = neutral. Accents are mixed into the card colour (`--tint`, 13 % light / 20 %
   dark) rather than used as fills. The one solid fill is the primary action (`--solid`).
5. **Soft shadows, hairline borders.** Translucent 1 px lines (`--line`, `--line-2`) and
   warm, diffuse shadows (`--shadow-card`, `--shadow-win`). No heavy outlines.
6. **Small radii, consistent everywhere.** 7 px for controls, 10–11 px for tiles and cards,
   pills fully rounded.

## Tokens

All tokens are CSS custom properties on `:root`. Override any of them after `tokens.css`.

### Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--page` | `#F3EFE7` | `#141312` | outer page background |
| `--page-2` | `#E9E4D9` | `#1C1B19` | deeper page tone (code, wells) |
| `--win` | `#FBF9F5` | `#1E1D1B` | main content area |
| `--pane` | `#F6F3ED` | `#1A1918` | side panes, table heads |
| `--card` | `#FFFFFF` | `#272624` | cards, tiles |
| `--side` | `rgba(238,233,224,.66)` | `rgba(44,41,37,.62)` | translucent sidebar |
| `--ink` | `#22211F` | `#EEEBE4` | primary text |
| `--ink-2` | `#5D5A54` | `#B4AFA6` | secondary text |
| `--ink-3` | `#8C887F` | `#88847C` | meta text, labels (see Accessibility) |
| `--ink-4` | `#B7B2A8` | `#5D5953` | placeholders, disabled, decoration |
| `--line` | `rgba(45,38,28,.10)` | `rgba(255,248,235,.085)` | hairlines |
| `--line-2` | `rgba(45,38,28,.17)` | `rgba(255,248,235,.14)` | control borders, dashed boxes |
| `--sel` | `rgba(45,38,28,.075)` | `rgba(255,248,235,.09)` | selected item, segmented track |
| `--hover` | `rgba(45,38,28,.04)` | `rgba(255,248,235,.05)` | hover wash |
| `--blue` | `#3E78D8` | `#6C9DEC` | selection, links, focus |
| `--coral` | `#E05A6D` | `#EE7587` | heading accent, errors |
| `--orange` | `#E5893A` | `#EFA062` | attention |
| `--yellow` | `#D69A1E` | `#E5B54E` | expiring, highlight |
| `--green` | `#3A9A5D` | `#5DB67E` | done, positive |
| `--violet` | `#8466D3` | `#A38BE7` | generated, suggested |
| `--grey` | `#8A877F` | `#9D998F` | neutral |
| `--solid` / `--onsolid` | `#3A73D3` / `#FFF` | `#3F7BDB` / `#FFF` | primary button, own chat bubble |
| `--tint` | `13%` | `20%` | accent share in tinted backgrounds |
| `--w1` `--w2` `--w3` | peach, blue, rose | dark equivalents | background glow |
| `--chart-1` … `--chart-4`, `--chart-other` | blue, dark orange, violet, green, grey | lighter steps | chart series, fixed order |

### Shadows

| Token | Use |
|---|---|
| `--shadow-card` | cards, tiles, calendar entries |
| `--shadow-win` | windows, dialogs, off-canvas sidebar, toasts |
| `--shadow-pop` | menus and popovers |
| `--scrim` | dialog backdrop |

### Type, radius, layout

| Token | Value | Use |
|---|---|---|
| `--serif` | Instrument Serif, then Iowan Old Style, Palatino, Georgia | display, headings |
| `--sans` | Inter, then system UI fonts | everything else |
| `--mono` | system monospace | code |
| `--fs-label` / `--fs-meta` / `--fs-small` / `--fs-ui` / `--fs-body` / `--fs-prose` | 10.5 / 11 / 11.5 / 12.5 / 13 / 16 px | |
| `--fw-medium` / `--fw-label` | 550 / 650 | |
| `--radius-xs` … `--radius-dialog` | 5, 6, 7, 8, 9, 10, 11, 12, 14 px | see `tokens.css` comments |
| `--radius-pill` | 999px | pills, chips |
| `--side-w` / `--right-w` / `--gutter` | 228 px / clamp(260px, 20vw, 290px) / 18 px (12 px on mobile) | app shell |

Headings: `h1` clamp(30–44 px), `h2` 32 px, `h3` 26 px, `h4` 24 px, `h5` 20 px, all serif regular;
`.display` clamp(40–72 px) for hero titles.

## Components

Every tinted component reads its accent from `--c`. Set it with a helper class
(`.c-blue`, `.c-coral`, `.c-orange`, `.c-yellow`, `.c-green`, `.c-violet`, `.c-grey`) or inline
(`style="--c: var(--green)"`). Defaults are set with `:where()`, so your value always wins.

| Component | Classes | Snippet |
|---|---|---|
| Buttons | `.btn` + `.primary` `.ghost` `.danger` `.tint` `.big` `.sm` `.icon` `.block` | `<button class="btn primary">Save</button>` |
| Link button | `.linkbtn` | `<button class="linkbtn">Undo</button>` |
| Pill | `.pill` (+ `.out`) | `<span class="pill c-green">published</span>` |
| Badge | `.badge` | `<span class="badge">2</span>` |
| Dot | `.dot` (+ `.sm`) | `<span class="dot c-blue"></span>` |
| Chip | `.chip`, `.chips` | `<button class="chip" aria-pressed="true">Filter</button>` |
| Card | `.card` (+ `.flat` `.raised` `.tinted`), `.card-title` | `<div class="card tinted"><span class="label">Suggestion</span>…</div>` |
| Panel | `.panel` | `<div class="panel">…</div>` |
| Note box (dashed) | `.note` | `<div class="note"><b>Later:</b> …</div>` |
| Notice | `.notice` (+ `.c-green` etc.) | `<div class="notice c-orange"><span>Expires soon</span></div>` |
| Field, input | `.field`, `.input`, `.textarea`, `select.input`, `.counter`, `.form-grid` | `<label class="field">Title<input class="input"></label>` |
| Switch | `input.toggle` | `<input type="checkbox" class="toggle" aria-label="Auto">` |
| Radio cards | `.radios`, `.radio` | `<label class="radio"><input type="radio" name="m"><i></i><div><b>Auto</b><span>…</span></div></label>` |
| Check mark | `.check` (+ `.on`) | `<span class="check on"></span>` |
| Segmented | `.seg` | `<div class="seg"><button aria-pressed="true">Week</button><button>Month</button></div>` |
| Tabs | `.tabs` (+ `.fill`), `.count` | `<div class="tabs" role="tablist"><button role="tab" aria-selected="true">One</button></div>` |
| Label / kicker | `.label`, `.kicker` | `<span class="label">Drafts</span>` |
| Avatar | `.avatar` (+ `.lg` `.square` `.sm`), `.avatars` | `<span class="avatar c-coral">AB</span>` |
| Icon badge | `.icon-badge` | `<span class="icon-badge c-green"><svg class="ic">…</svg></span>` |
| Stat tiles | `.stats`, `.stat`, `.delta` (+ `.down` `.flat`) | `<div class="stat"><b>41<span class="delta">+8%</span></b><span>Sign-ups</span></div>` |
| Progress | `.progress` | `<div class="progress c-green"><i style="width:60%"></i></div>` |
| List rows | `.list`, `.list-row`, `.time` | `<a class="list-row" href="#"><div><b>Title</b><small>Meta</small></div><span class="pill">draft</span></a>` |
| Settings row | `.setting` | `<div class="setting"><div><b>Weekly mail</b><span>Mondays</span></div><input type="checkbox" class="toggle"></div>` |
| Table | `.table-wrap`, `.table`, `.r`, `tr.dim` | `<table class="table">…</table>` |
| Timeline | `.timeline`, `.node` | `<ol class="timeline"><li><span class="node c-green">…</span><div><b>Done</b><small>Today</small></div></li></ol>` |
| Empty slot / drop target | `.empty`, `.dropzone` (+ `.over`) | `<button class="empty" aria-label="Add">+</button>` |
| Chat bubbles | `.thread`, `.bubble.me`, `.bubble.them` | `<div class="bubble me">Hi</div>` |
| Menu | `.menu`, `.menu-item`, `.menu-foot` | `<div class="menu"><button class="menu-item on">…</button></div>` |
| Dialog | `dialog.dialog`, `.dialog-head/-body/-foot` (`.static` for inline) | `<dialog class="dialog">…</dialog>` |
| Toast | `.toast` (+ `.err` `.static`) | `<div class="toast">Saved <button class="btn ghost sm">Undo</button></div>` |
| Spinner | `.spinner` | `<span class="spinner"></span>` |
| Brand | `.brand`, `.brand-mark` | `<a class="brand" href="/"><span class="brand-mark"></span>Name</a>` |
| App shell | `.app`, `.side`, `.side-head`, `.side-label`, `.side-foot`, `.account`, `.nav`, `.nav-item` (+ `.sub`, `.count`, `.badge`), `.nav-row` (+ `.status`), `.content`, `.topbar` (`.title`, `.sub`), `.view`, `.view-main`, `.view-pane`, `.section` | see `examples/app-shell.html` |
| Mobile | `.mobile-bar`, `.scrim`, `.only-mobile`, `[data-sidebar-open]`, `[data-sidebar-close]` | see below |
| Calendar | `.scroll-x`, `.week` (+ `.compact`), `.day-head` (`.wd`, `.n`, `.today`), `.band`, `.span-bar`, `.day` (+ `.today`), `.event` (+ `.placeholder`, `.edge`; `.time`, `.meta`), `.month`, `.month-head`, `.month-day` (+ `.out`, `.today`), `.mini-event` | see gallery |
| Website layout | `.container` (+ `.narrow`), `.site-bar`, `.site-nav`, `.hero`, `.byline`, `.card-grid`, `.media`, `.prose`, `.site-footer` | see `examples/article.html` |
| Charts | `.chart`, `.chart-head`, `.chart-title`, `.legend`, `.chart-tip`, `.chart-table`, `.multiples` | see `examples/charts.html` |

Utilities in `base.css`: `.row` (+ `.wrap`, `.top`), `.stack` (+ `.tight`), `.sp` (spacer),
`.pad`, `.muted`, `.small`, `.num` (tabular figures), `.serif`, `.lead`, `.ellipsis`, `.sr-only`.

### App shell and mobile behaviour

Above 1100 px the content shows a main column and a right pane; below that the pane drops
under the main column. Below 760 px the sidebar becomes an off-canvas drawer:

```html
<div class="app">
  <header class="mobile-bar">
    <button class="btn ghost icon" data-sidebar-open aria-label="Open menu" aria-expanded="false">…</button>
    <a class="brand" href="/"><span class="brand-mark"></span>Name</a>
  </header>
  <div class="scrim" hidden></div>
  <aside class="side">
    <div class="side-head">… <button class="btn ghost icon only-mobile" data-sidebar-close aria-label="Close menu">…</button></div>
    <nav class="nav">…</nav>
  </aside>
  <main class="content">…</main>
</div>
```

`js/theme.js` wires the buttons, the scrim and the Escape key. Without the script, the
drawer stays closed on small screens, so add your own toggle if you skip it.

## Dark mode

- **Automatic:** the dark tokens apply when the system prefers dark
  (`@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`).
- **Forced:** `<html data-theme="dark">` or `<html data-theme="light">` overrides the system.
- **Scoped:** `data-theme="dark"` (or `"light"`) also works on any element, which is how
  the gallery shows both themes side by side.
- **Switch:** with `js/theme.js`, any element with `data-theme-set="light|dark|system"`
  becomes a switch; the choice is saved in `localStorage` (inside `try/catch`, so a blocked
  storage just falls back to the system setting). `?theme=dark` in the URL overrides it for
  one view. Use `data-storage-key="…"` on the script tag to choose your own key.

Dark mode is not an automatic inversion: every token has its own, hand-picked dark value.

## Visualisations

Charts are built with **D3.js only** (exact version pinned, e.g. `d3@7.9.0` from cdnjs), with
colours read from the tokens at runtime through `js/chart-theme.js`, so they follow the
theme. Before building any chart, the form is chosen deliberately: list the candidate forms
for the data and question, give each a one-line rationale, then pick one. The full rules are
in [`AGENTS.md`](AGENTS.md#visualisations); `examples/charts.html` shows a column chart, a
multi-series line chart and small multiples, each with a table view and its form rationale.

The chart series tokens `--chart-1` to `--chart-4` were checked with a colour-vision
deficiency validator (adjacent pairs ΔE ≥ 15 under protan/deutan simulation, ≥ 3:1 against
`--card` in both themes). `--chart-2` is a darker orange than `--orange` for that reason.
More than four series: fold the rest into `--chart-other` or use small multiples.

## Accessibility

- **Focus:** every focusable element gets a 2 px blue outline on keyboard focus
  (`:focus-visible`). Inputs show a blue border with a soft blue ring.
- **Motion:** `prefers-reduced-motion` turns off transitions; the spinner slows down.
- **Colour is never the only signal:** pills carry words, status rows carry a status word,
  charts have legends, direct labels and table views.
- **Icons:** decorative icons get `aria-hidden="true"`; icon-only buttons need `aria-label`.

### Contrast (WCAG 2.x, measured)

Normal text needs 4.5:1, large text (≥ 24 px, or ≥ 18.7 px bold) and UI parts 3:1.

| Pair | Light | Dark | Verdict |
|---|---|---|---|
| `--ink-2` on all surfaces | 6.0 – 6.9 | 6.9 – 8.5 | passes |
| `--ink-3` on `--page` / `--win` / `--pane` / `--card` | 3.08 / 3.36 / 3.19 / 3.53 | 4.98 / 4.52 / 4.71 / **4.06** | **below 4.5 in light everywhere; in dark on `--card`** |
| `--ink-4` on all surfaces | 1.8 – 2.1 | 2.2 – 2.7 | **fails for text**; use only for placeholders, disabled items and decoration |
| White on `--solid` (primary button) | 4.59 | **4.14** | dark slightly below 4.5 (the 12.5 px label is not large text) |
| White on `--coral` (danger button, error toast) | **3.59** | **2.79** | below 4.5 |
| White on `--orange` (`.badge`) | **2.63** | **2.13** | below 4.5 |
| Pill text on tint: orange / yellow | **3.87 / 3.70** | 5.7 / 5.9 | light below 4.5; blue, coral, green, violet, grey pills pass (4.8 – 5.5) |
| `--coral` / `--green` as text on `--win` (`.error`, `.ok`, `.delta`) | **3.41 / 3.35** | 6.0 / 6.8 | light below 4.5 |

`--ink-3` is used for meta text, labels and counts at 10.5–12 px, so the light theme does not
meet AA for that text. The look is kept as designed; if you need AA, these drop-in overrides
are the smallest changes that pass (they make the meta text a little darker and nothing else):

```css
:root, [data-theme="light"] { --ink-3: #706D66; }      /* 4.5:1 on --page, more on the rest */
[data-theme="dark"] { --ink-3: #908C84; --solid: #3B74CE; } /* also inside the dark media query */
.pill { color: color-mix(in srgb, var(--c) 60%, var(--ink)); } /* orange/yellow pills ≥ 4.5 */
.badge { color: var(--ink); background: color-mix(in srgb, var(--orange) 35%, var(--card)); }
.btn.danger, .toast.err { background: color-mix(in srgb, var(--coral) 80%, #000); }
.error { color: color-mix(in srgb, var(--coral) 75%, var(--ink)); }
```

## Browser support

Current versions of Chrome, Edge, Firefox and Safari (2023 and later). The kit relies on:

- `color-mix()` for all tints (Chrome/Edge 111+, Firefox 113+, Safari 16.2+). Older browsers
  drop those declarations, so tinted pills and cards lose their tint but stay readable.
- `backdrop-filter` for the translucent sidebar and bars (with `-webkit-` prefix for Safari).
  Without it the semi-transparent `--side` colour still reads well.
- `:has()` for radio cards (CSS-only checked state; `.on` works as a fallback) and
  `:where()`/`:is()`, `text-wrap: balance`, `env(safe-area-inset-*)`.

## Licence

- **Code** (CSS, JavaScript, examples, documentation): MIT, see [`LICENSE`](LICENSE).
- **Fonts:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and
  [Inter](https://fonts.google.com/specimen/Inter) are loaded from Google Fonts and are
  licensed under the SIL Open Font License 1.1. They are not bundled in this repository.
- **Icons:** most icons are original; several reproduce or closely follow icons from
  [Feather](https://github.com/feathericons/feather) (MIT) and
  [Lucide](https://github.com/lucide-icons/lucide) (ISC). See
  [`icons/README.md`](icons/README.md) and [`icons/LICENSE-THIRD-PARTY.md`](icons/LICENSE-THIRD-PARTY.md).
- **D3.js** (charts example only) is loaded from a CDN and is licensed under the ISC licence.

Author: Falk Uebernickel.
