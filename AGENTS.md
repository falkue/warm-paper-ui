# Instructions for building pages with this kit

These rules are for AI coding agents and for humans. Follow them whenever you create or
change a page, component or chart that uses this kit. They are short on purpose: when in
doubt, copy a pattern from `examples/` instead of inventing a new one.

## 1. Setup

- Link, in this order: `css/tokens.css`, `css/base.css`, `css/components.css`.
- Load the fonts from Google Fonts: Instrument Serif (`ital@0;1`) and Inter (`wght@400;500;600;700`).
- Optional: `js/theme.js` in `<head>` without `defer` (theme switch, mobile sidebar);
  `icons/icons.js` with `defer` when you use `<use href="#i-…">` icons.
- Set `<html lang="en">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
  and `<meta name="color-scheme" content="light dark">`.
- No frameworks or CSS libraries are required. Do not add Tailwind, Bootstrap or a UI kit on top.

## 2. Colour

- **Use tokens, never raw colour values.** Write `var(--ink-2)`, `var(--card)`, `var(--line)`,
  never `#5D5A54` or `rgba(…)` in page code. The only exception is `#fff` on `--solid` or
  `--coral`, as the kit itself does.
- Hierarchy comes from the ink scale: `--ink` (primary), `--ink-2` (secondary), `--ink-3`
  (meta, labels). `--ink-4` is for placeholders, disabled items and decoration only, never
  for text people must read.
- Accents have fixed meanings: blue = selection, links, today · green = done, positive ·
  coral = emphasis in headings, errors, destructive · orange = attention · yellow = expiring,
  highlight · violet = generated or suggested content · grey = neutral. Do not use an accent
  for anything else and do not add new accent colours.
- Accents appear as **tints**, not fills: use components that read `--c` (`.pill`, `.notice`,
  `.card.tinted`, `.chip`, `.avatar`, `.icon-badge`, `.span-bar`, `.progress`) and set the
  accent with `.c-green` etc. or `style="--c: var(--green)"`. One solid fill per screen:
  the primary action (`.btn.primary`).
- Never convey meaning by colour alone: a pill has a word, a status has a label, a chart
  has a legend or direct labels.

## 3. Type

- Headings (`h1`–`h5`, `.display`, `.h1`–`.h5`, `.topbar .title`) use the serif display face
  at regular weight. Never bold the serif and never use it for body text, buttons or numbers.
- Accent at most **one** word per heading with `<em>`; it becomes italic coral automatically.
  Do not colour headings any other way.
- Section names use `.label` (uppercase, letter-spaced, `--ink-3`); a label above a hero title
  is a `.kicker`.
- UI text is Inter at the kit sizes (13 px body, 12.5 px controls, 11–11.5 px meta). Long
  reading text goes in `.prose` (16 px). Numbers in columns use `.num` (tabular figures).
- Write all copy in **English**, sentence case, no exclamation marks in UI labels.

## 4. Layout and components

- Group content in `.card` (white, hairline border, soft shadow). Use `.card.flat` inside other
  cards, `.panel` for recessed tool areas, `.note` (dashed) for hints and "coming later".
- Apps: `.app` > `.side` + `.content`; inside the content a `.topbar` and either plain
  `.section`s or a `.view` with `.view-main` and `.view-pane`. Websites: `.site-bar`,
  `.container`, `.hero`, `.prose`, `.card-grid`, `.site-footer`.
- Prefer existing components over new CSS. If you must add CSS, build it from tokens
  (`--radius*`, `--line*`, `--shadow-*`, `--fs-*`) so it matches and supports dark mode.
- Keep borders hairline (1 px `--line` or `--line-2`) and shadows from the tokens. No heavy
  outlines, gradients on controls, or drop shadows of your own.

## 5. Dark mode

- Every page must work in both themes. Do not hard-code colours, do not use `filter: invert`.
- Test with `?theme=dark` and `?theme=light` in the URL (needs `js/theme.js`) or with the
  system setting. To show both at once, set `data-theme="dark"` on a container.

## 6. Responsive

- Every page must work from **375 px** wide up, with **no horizontal page scroll**.
  Wide content (week grid, month grid, tables) goes inside `.scroll-x` / `.table-wrap` so only
  that block scrolls.
- Check at 375 px and at 1280 px before you finish. Give `min-width: 0` to flex and grid
  children that hold long text.
- Below 760 px the app sidebar is an off-canvas drawer (`.mobile-bar`, `.scrim`,
  `data-sidebar-open` / `data-sidebar-close`).

## 7. Accessibility

- Keep the visible focus ring (do not remove outlines). Icon-only buttons need `aria-label`;
  decorative icons `aria-hidden="true"`. Use real `<button>` and `<a>` elements.
- `--ink-3` is below 4.5:1 for small text in the light theme (see README, Accessibility).
  Do not put essential information only in `--ink-3`; if AA is required, apply the overrides
  listed in the README.

## Visualisations

These rules are **mandatory** for every chart, graph, plot or other data visualisation.

1. **D3.js only.** Load D3 from cdnjs or jsDelivr with an **exact, pinned version**, for example
   `https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js` (with its `integrity` hash).
   No other chart libraries (no Chart.js, ECharts, Highcharts, Plotly, Vega, Recharts …), no
   chart images (PNG/JPG/static SVG exports). Small inline meters such as `.progress` and
   `.stat` tiles are components, not charts, and may be used without D3.
2. **Research the form first, then build.** Before writing any chart code:
   - look up which forms of representation exist for this kind of data and question, using
     the [D3 gallery](https://observablehq.com/@d3/gallery) and a chart-choice reference such
     as the [Data Viz Project](https://datavizproject.com) or the
     [Financial Times Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary);
   - **list the candidate forms, each with a one-line rationale** (what it shows well, what
     it hides);
   - **pick the most fitting one** and say why. Sometimes the answer is not a chart but a
     stat tile or a table.
   - Only then implement it. Keep the list with the chart (the examples put it in a
     "Why this form" box) or in the pull request description.
3. **Colours from the kit tokens, read at runtime.** Use `js/chart-theme.js`:
   `ChartTheme.read(container)` returns the current token values via `getComputedStyle`, and
   `ChartTheme.observe(container, render)` re-renders on theme change and resize, so dark mode
   works. Series colours are `t.series[0..3]` (`--chart-1` … `--chart-4`) in that fixed order;
   never cycle them, fold a fifth series into `t.other` or use small multiples. Status meaning
   (good/bad) uses `t.good` / `t.bad`, never a series colour.
4. **Styling.** Axes and gridlines are hairlines in `--line-2` / `--line`
   (`ChartTheme.styleAxis`). Tick and axis labels are `--ink-3`, sans, 10.5 px. Chart titles
   use the serif (`.chart-title`, one `<em>` accent allowed). Values and labels use ink
   tokens, never the series colour. Marks: columns at most 24 px wide with a 4 px rounded end
   (`ChartTheme.columnPath`), lines 2 px, end dots r = 4 with a 2 px ring in the surface colour.
5. **One y-axis per chart.** Never two scales on one chart; use two charts or small multiples.
6. **Accessibility.** Two or more series get a legend (`.legend`); label selectively (the end
   or the extreme, not every point); add a hover tooltip (`ChartTheme.tooltip`) and a table
   view (`details.chart-table`); give the chart container `role="img"` and an `aria-label`
   that states the main finding.
7. **Responsive.** Size the SVG from the container width on every render; reduce ticks and
   drop direct labels on narrow screens, keep the legend.

See `examples/charts.html` for a column chart, a multi-series line chart and small multiples
that follow all of the above.

## Before you finish

- [ ] Only tokens, no raw colours; no new accent colours.
- [ ] Serif only for headings, at most one coral `<em>` per heading.
- [ ] Works in light and dark.
- [ ] No horizontal scroll at 375 px; checked at 1280 px.
- [ ] Charts: D3 pinned, form candidates listed and one chosen, token colours, legend/table.
- [ ] All copy in English.
