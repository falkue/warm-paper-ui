/*!
 * theme.js: optional helper for the design kit. No dependencies.
 *
 * 1. Theme: light / dark / system.
 *    - Any element with data-theme-set="light|dark|system" becomes a switch.
 *      The active one gets class "on" and aria-pressed="true".
 *    - The choice is stored in localStorage (wrapped in try/catch, so private
 *      windows and blocked storage simply fall back to "system").
 *    - A ?theme=light|dark|system query parameter overrides the stored choice
 *      for that page view (handy for screenshots and previews).
 *    - Load this file in <head> without "defer" to avoid a flash of the wrong
 *      theme; it only touches <html> until the DOM is ready.
 *
 * 2. Mobile sidebar.
 *    - data-sidebar-open / data-sidebar-close on buttons, a .side element and
 *      an optional .scrim element. Escape and a click on the scrim close it.
 *
 * Optional: set data-storage-key="my-site-theme" on the <script> tag to use
 * your own localStorage key.
 */
(function () {
  'use strict';

  var script = document.currentScript;
  var KEY = (script && script.getAttribute('data-storage-key')) || 'theme';
  var root = document.documentElement;
  var VALID = { light: 1, dark: 1, system: 1 };

  function read() {
    try { var v = localStorage.getItem(KEY); return VALID[v] ? v : 'system'; } catch (e) { return 'system'; }
  }
  function write(v) {
    try { if (v === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable */ }
  }
  function apply(v) {
    if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v);
    else root.removeAttribute('data-theme');
    var els = document.querySelectorAll('[data-theme-set]');
    for (var i = 0; i < els.length; i++) {
      var on = els[i].getAttribute('data-theme-set') === v;
      els[i].classList.toggle('on', on);
      els[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  var override = null;
  try { override = new URLSearchParams(location.search).get('theme'); } catch (e) { /* old browser */ }
  var current = VALID[override] ? override : read();
  apply(current);

  function setTheme(v) {
    if (!VALID[v]) return;
    current = v; write(v); apply(v);
  }
  window.setTheme = setTheme;

  function ready() {
    apply(current);

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-theme-set]');
      if (t) { e.preventDefault(); setTheme(t.getAttribute('data-theme-set')); }
    });

    // Mobile sidebar
    var side = document.querySelector('.side');
    var scrim = document.querySelector('.scrim');
    if (!side) return;
    var opener = null;

    function open(btn) {
      opener = btn || null;
      side.classList.add('open');
      if (scrim) scrim.hidden = false;
      var openers = document.querySelectorAll('[data-sidebar-open]');
      for (var i = 0; i < openers.length; i++) openers[i].setAttribute('aria-expanded', 'true');
      var first = side.querySelector('[data-sidebar-close], a, button');
      if (first) first.focus();
    }
    function close() {
      side.classList.remove('open');
      if (scrim) scrim.hidden = true;
      var openers = document.querySelectorAll('[data-sidebar-open]');
      for (var i = 0; i < openers.length; i++) openers[i].setAttribute('aria-expanded', 'false');
      if (opener) opener.focus();
      opener = null;
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      var o = e.target.closest('[data-sidebar-open]');
      if (o) { e.preventDefault(); open(o); return; }
      if (e.target.closest('[data-sidebar-close]') || e.target === scrim) { e.preventDefault(); close(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && side.classList.contains('open')) close();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
