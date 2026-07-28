/* ============================================================
   FurVibe AI — Landing Page Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initFilmstripDrag();
  initFAQ();
  initPricingToggle();
  initCountUp();
  initParallaxOrbs();
});

/* ---- Navbar Scroll Effect ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Reveal (Intersection Observer) ---- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keeps one-time reveal
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---- Filmstrip Drag Scroll ---- */
function initFilmstripDrag() {
  const filmstrip = document.querySelector('.showcase-filmstrip');
  if (!filmstrip) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  filmstrip.addEventListener('mousedown', (e) => {
    isDown = true;
    filmstrip.style.cursor = 'grabbing';
    startX = e.pageX - filmstrip.offsetLeft;
    scrollLeft = filmstrip.scrollLeft;
  });

  filmstrip.addEventListener('mouseleave', () => {
    isDown = false;
    filmstrip.style.cursor = 'grab';
  });

  filmstrip.addEventListener('mouseup', () => {
    isDown = false;
    filmstrip.style.cursor = 'grab';
  });

  filmstrip.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - filmstrip.offsetLeft;
    const walk = (x - startX) * 1.5;
    filmstrip.scrollLeft = scrollLeft - walk;
  });
}

/* ---- FAQ Accordion ---- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    if (!question || !answer || !inner) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = inner.scrollHeight + 20 + 'px';
      }
    });
  });
}

/* ---- Pricing Toggle ---- */
function initPricingToggle() {
  const monthlyBtn = document.getElementById('toggle-monthly');
  const yearlyBtn = document.getElementById('toggle-yearly');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const yearlyPrices = document.querySelectorAll('.price-yearly');

  if (!monthlyBtn || !yearlyBtn) return;

  function showMonthly() {
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');
    monthlyPrices.forEach(el => el.style.display = '');
    yearlyPrices.forEach(el => el.style.display = 'none');
  }

  function showYearly() {
    yearlyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    yearlyPrices.forEach(el => el.style.display = '');
    monthlyPrices.forEach(el => el.style.display = 'none');
  }

  monthlyBtn.addEventListener('click', showMonthly);
  yearlyBtn.addEventListener('click', showYearly);

  // Initial state
  showMonthly();
}

/* ---- Count Up Animation ---- */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          el.textContent = prefix + current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ---- Parallax Orbs on Mouse Move ---- */
function initParallaxOrbs() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const orbs = hero.querySelectorAll('.hero-orb');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 15;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});
