(function () {
  var el = document.getElementById('last-updated');
  if (!el) return;
  var d = new Date(document.lastModified);
  if (isNaN(d.getTime())) return;
  var yyyy = d.getFullYear();
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  el.textContent = yyyy + '.' + mm;
})();
