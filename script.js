// ─── PROGRESS BAR ─────────────────────────────────────────────────────────
(function initProgressBar() {
  setTimeout(function () {
    var fill = document.getElementById('slotFill');
    if (fill) fill.style.width = '55%';
  }, 600);
})();

// ─── SMOOTH SCROLL HELPERS ────────────────────────────────────────────────
function scrollTo(selector) {
  var el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── NAV ACTIVE STATE ─────────────────────────────────────────────────────
(function initNavHighlight() {
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
(function initReveal() {
  if (!window.IntersectionObserver) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ─── ANIMATED BAR FILLS (AEO DASHBOARD) ───────────────────────────────────
(function initBarFills() {
  if (!window.IntersectionObserver) return;

  var fills = document.querySelectorAll('.aeo-dash-bar-fill');
  if (!fills.length) return;

  // store target widths then reset to 0
  var targets = [];
  fills.forEach(function (fill) {
    targets.push(fill.style.width);
    fill.style.width = '0';
    fill.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
  });

  var dashboard = document.querySelector('.aeo-dashboard');
  if (!dashboard) return;

  var triggered = false;
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      fills.forEach(function (fill, i) {
        setTimeout(function () {
          fill.style.width = targets[i];
        }, i * 120);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(dashboard);
})();

// ─── MAILTO CTA HANDLER ───────────────────────────────────────────────────
var MAILTO =
  'mailto:jason.daniels@sonicjobs.com' +
  '?subject=SonicJobs%20%C3%97%20ChatGPT%20%E2%80%94%20Deployment%20Inquiry' +
  '&body=Hi%2C%0A%0AWe%27re%20interested%20in%20learning%20more%20about%20SonicJobs' +
  '%20inside%20ChatGPT%20and%20evaluating%20fit%20for%20our%20organization.%0A%0A' +
  'Please%20reach%20out%20to%20arrange%20a%20conversation.%0A%0AThank%20you%2C';

function requestAccess() {
  window.location.href = MAILTO;
}

// Attach to any button with data-cta="request"
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-cta="request"]').forEach(function (btn) {
    btn.addEventListener('click', requestAccess);
  });
});
