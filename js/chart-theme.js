/*!
 * chart-theme.js: a tiny bridge between the kit's CSS tokens and D3.
 * No dependencies of its own; works with D3 v7 (pinned in the examples).
 *
 *   var t = ChartTheme.read(container);   // token values as plain strings
 *   ChartTheme.styleAxis(gAxis, t);       // hairline axis, muted sans labels
 *   ChartTheme.observe(container, render) // re-render on theme change + resize
 *   var tip = ChartTheme.tooltip(container); tip.show(html, x, y); tip.hide();
 *
 * Colours are read at runtime with getComputedStyle, so a chart inside an
 * element with data-theme="dark" (or a page in dark mode) picks up the dark
 * values. Never hard-code hex values in chart code.
 */
(function (global) {
  'use strict';

  var NAMES = {
    ink: '--ink', ink2: '--ink-2', ink3: '--ink-3', ink4: '--ink-4',
    line: '--line', line2: '--line-2', card: '--card', win: '--win', pane: '--pane', page: '--page',
    blue: '--blue', coral: '--coral', orange: '--orange', yellow: '--yellow', green: '--green', violet: '--violet', grey: '--grey',
    other: '--chart-other', serif: '--serif', sans: '--sans'
  };

  /** Read all chart-relevant tokens as computed on `el` (default: <html>). */
  function read(el) {
    var cs = getComputedStyle(el || document.documentElement);
    var t = {};
    Object.keys(NAMES).forEach(function (k) { t[k] = cs.getPropertyValue(NAMES[k]).trim(); });
    // Categorical series in fixed order. Never cycle: a fifth series goes to `other`.
    t.series = [1, 2, 3, 4].map(function (i) { return cs.getPropertyValue('--chart-' + i).trim(); });
    // Status colours are reserved for meaning (good / bad), never for "series 5".
    t.good = t.green; t.bad = t.coral;
    t.fontSize = 10.5;          // axis and tick labels (matches --fs-label)
    t.surface = t.card;         // the colour used for 2px gaps and rings around marks
    return t;
  }

  /** Style a D3 axis group: hairline domain in --line-2, no tick marks, labels in --ink-3. */
  function styleAxis(g, t, opts) {
    opts = opts || {};
    g.attr('font-family', t.sans).attr('font-size', t.fontSize);
    g.select('.domain').attr('stroke', opts.hideDomain ? 'none' : t.line2).attr('stroke-width', 1);
    g.selectAll('.tick line').attr('stroke', opts.grid ? t.line : 'none').attr('stroke-width', 1);
    g.selectAll('.tick text').attr('fill', t.ink3).style('font-variant-numeric', 'tabular-nums');
    return g;
  }

  /** Call `render` once now, again when the theme changes and when `el` resizes. Returns a stop function. */
  function observe(el, render) {
    var frame = 0;
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(function () { render(); }); }
    render();

    var mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    var mq = global.matchMedia ? global.matchMedia('(prefers-color-scheme: dark)') : null;
    if (mq) { if (mq.addEventListener) mq.addEventListener('change', schedule); else mq.addListener(schedule); }

    var lastW = el.clientWidth;
    var ro = global.ResizeObserver ? new ResizeObserver(function () {
      if (el.clientWidth !== lastW) { lastW = el.clientWidth; schedule(); }
    }) : null;
    if (ro) ro.observe(el); else global.addEventListener('resize', schedule);

    return function stop() {
      mo.disconnect();
      if (mq && mq.removeEventListener) mq.removeEventListener('change', schedule);
      if (ro) ro.disconnect(); else global.removeEventListener('resize', schedule);
    };
  }

  /** A positioned HTML tooltip (.chart-tip) inside `container` (which must be position: relative). */
  function tooltip(container) {
    var tip = container.querySelector(':scope > .chart-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'chart-tip';
      tip.setAttribute('role', 'status');
      tip.hidden = true;
      container.appendChild(tip);
    }
    return {
      show: function (html, x, y) {
        tip.innerHTML = html;
        tip.hidden = false;
        var w = tip.offsetWidth, h = tip.offsetHeight, cw = container.clientWidth;
        var left = Math.max(0, Math.min(cw - w, x - w / 2));
        var top = Math.max(0, y - h - 10);
        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
      },
      hide: function () { tip.hidden = true; }
    };
  }

  /** Compact numbers for ticks (0, 2K, 14.8K, 1.2M) and full numbers for tooltips. */
  var nf = new Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  var cf = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
  function compact(v) { return Math.abs(v) >= 1000 ? cf.format(v) : nf.format(v); }
  function full(v) { return nf.format(v); }

  /** SVG path for a column with a 4px rounded top and a square baseline. */
  function columnPath(x, y, w, h, r) {
    r = Math.min(r == null ? 4 : r, w / 2, h);
    if (h <= 0) return '';
    return 'M' + x + ',' + (y + h) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y +
      'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) + 'V' + (y + h) + 'Z';
  }

  global.ChartTheme = { read: read, styleAxis: styleAxis, observe: observe, tooltip: tooltip, compact: compact, full: full, columnPath: columnPath };
})(window);
