/* =====================================================================
   Shared script. The menu comes from the EOE site's eoe.js.
   1 last-updated stamp in the footer
   2 mobile menu
   ===================================================================== */
(function () {
  var doc = document, root = doc.documentElement;

  /* ---------- 1 last-updated stamp ---------- */
  (function () {
    var el = doc.getElementById('last-updated');
    if (!el) return;
    var d = new Date(doc.lastModified);
    if (isNaN(d.getTime())) return;
    el.textContent = d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0');
  })();

  /* ---------- 2 mobile menu: aria-expanded, Esc, closes when focus leaves the header ---------- */
  (function () {
    var btn = doc.querySelector('.menu'), nav = doc.getElementById('nav'), head = doc.querySelector('.site-head');
    if (!btn || !nav || !head) return;
    function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }
    function set(open, refocus) {
      root.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
      if (!open && refocus) btn.focus();
    }
    btn.addEventListener('click', function () { set(!isOpen()); });
    nav.addEventListener('click', function (e) { if (isOpen() && e.target.closest('a')) set(false); });
    doc.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) { e.preventDefault(); set(false, true); }
    });
    head.addEventListener('focusout', function (e) {
      if (isOpen() && e.relatedTarget && !head.contains(e.relatedTarget)) set(false);
    });
    var wide = matchMedia('(min-width:768px)');
    wide.addEventListener('change', function () { if (wide.matches && isOpen()) set(false); });
  })();
})();
