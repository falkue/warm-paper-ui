# Icons

26 stroke icons on a 24 × 24 grid: 1.7 px stroke, round caps and joins, no fill.
They take the text colour (`currentColor`).

## Three ways to use them

**1. Inline (simplest, works everywhere)**: copy the markup from `svg/<name>.svg`
and give the element the `ic` class:

```html
<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 5v14M5 12h14"/>
</svg>
```

**2. Sprite + `<use>`**: inline `icons.svg` once at the top of `<body>`, then reference symbols:

```html
<svg class="ic" aria-hidden="true"><use href="#i-calendar"/></svg>
```

If you serve the site over HTTP you can also reference the file directly:
`<use href="/icons/icons.svg#i-calendar"/>`. Browsers block that for pages opened
from `file://`, so the examples load `icons.js`, which inlines the same sprite.

**3. As an image**: `<img src="icons/svg/search.svg" alt="" width="16" height="16">`
(the stroke is then fixed to black; prefer 1 or 2 for themed UIs).

Sizes: `.ic` is 16 px, `.ic.sm` 14 px, `.ic.lg` 20 px.
Decorative icons get `aria-hidden="true"`. An icon-only button needs an `aria-label`.

## Names and origins

| Icon | Origin |
|---|---|
| bulb, bars, phone, mail, mic, users | original |
| check, search, arrow-right, home | original (added with the kit) |
| message, settings, plus, chevron-left, chevron-right, chevron-down, close, log-out, pen, eye | same or nearly the same geometry as [Feather](https://github.com/feathericons/feather) (MIT) |
| image | same geometry as [Lucide](https://github.com/lucide-icons/lucide) (ISC) |
| calendar, chart-line, menu, archive, user | closely follow the Lucide/Feather construction (ISC/MIT) |

Very simple shapes (plus, close, chevrons, menu) are hard to draw any other way, but
because the coordinates match, all icons in the last three rows are treated as
derived from Feather or Lucide and carry their licences. See
[`LICENSE-THIRD-PARTY.md`](LICENSE-THIRD-PARTY.md). Both licences are permissive and
only ask you to keep the notice.
