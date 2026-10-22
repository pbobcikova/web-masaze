(function () {
  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* Close the procedures dropdown on outside click / Escape */
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".site-nav__sub[open]").forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".site-nav__sub[open]").forEach(function (d) {
      d.removeAttribute("open");
      var s = d.querySelector("summary");
      if (s) s.focus();
    });
  });

  /* Count-up numbers in the stats band (final value is in the HTML, so no-JS is fine) */
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  counters.forEach(function (el) { el.textContent = "0"; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      var el = entry.target, end = Number(el.dataset.count), start = null, dur = 1400;
      function step(t) {
        start = start || t;
        var p = Math.min((t - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  counters.forEach(function (el) { io.observe(el); });
})();
