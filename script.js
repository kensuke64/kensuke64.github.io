(function () {
  var el = document.getElementById('last-updated');
  if (!el) return;
  var d = new Date(document.lastModified);
  if (isNaN(d.getTime())) return;
  var yyyy = d.getFullYear();
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  el.textContent = yyyy + '.' + mm;
})();

/* Priority nav: keep the menu on one row; tuck overflowing links under a "⋯" fold. */
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;
  var ul = nav.querySelector('ul');
  if (!ul) return;

  var items = Array.prototype.slice.call(ul.children);

  var more = document.createElement('li');
  more.className = 'nav-more';
  var details = document.createElement('details');
  var summary = document.createElement('summary');
  summary.textContent = '⋯';
  summary.setAttribute('aria-label', 'More menu');
  var panel = document.createElement('ul');
  panel.className = 'nav-more-panel';
  details.appendChild(summary);
  details.appendChild(panel);
  more.appendChild(details);

  function layout() {
    if (more.parentNode) more.parentNode.removeChild(more);
    panel.innerHTML = '';
    items.forEach(function (li) { ul.appendChild(li); });

    if (ul.scrollWidth <= ul.clientWidth + 1) return; // everything fits

    ul.appendChild(more);
    for (var i = items.length - 1; i >= 0; i--) {
      if (ul.scrollWidth <= ul.clientWidth + 1) break;
      panel.insertBefore(items[i], panel.firstChild);
    }
    if (!panel.children.length && more.parentNode) {
      more.parentNode.removeChild(more);
    }
  }

  var t;
  function onResize() { clearTimeout(t); t = setTimeout(layout, 100); }
  layout();
  window.addEventListener('resize', onResize);
  window.addEventListener('load', layout);

  document.addEventListener('click', function (e) {
    if (!details.contains(e.target)) details.removeAttribute('open');
  });
})();
