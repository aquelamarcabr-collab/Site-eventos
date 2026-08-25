// G.R. Master Eventos & Consultoria — scripts do site
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* Highlight active nav link */
  var current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* Scroll reveal (with generous margin + failsafe so content never gets stuck hidden) */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(function (el) { obs.observe(el); });
    // Failsafe: reveal everything after a short delay, in case of fast jumps/edge cases.
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }, 2500);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Portfolio filters */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = cat === 'all' || item.getAttribute('data-cat') === cat;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* Contact form: success message (Netlify handles the actual submission) */
  var form = document.getElementById('orcamento-form');
  if (form) {
    form.addEventListener('submit', function () {
      window.setTimeout(function () {
        var success = document.querySelector('.form-success');
        if (success) success.classList.add('show');
      }, 50);
    });
  }

  /* Set current year in footer */
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
