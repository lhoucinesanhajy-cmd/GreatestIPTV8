/* ===== FreeGoTV – script.js ===== */

// ── Navbar scroll effect ──────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Back to top button
  const backTop = document.getElementById('back-to-top');
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

// ── Smooth back to top ────────────────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Mobile hamburger menu ─────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ── Active nav link based on current page ─────────────────────────────────────
const navItems = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() || 'index.html';

navItems.forEach(link => {
  link.classList.remove('active');
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPage) {
    link.classList.add('active');
  }
});

// ── Countdown Timer ───────────────────────────────────────────────────────────
function startCountdown() {
  // Set a target date 14 days from now (stored in localStorage so it persists)
  let endTime = localStorage.getItem('freego_countdown');
  if (!endTime) {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    endTime = d.getTime();
    localStorage.setItem('freego_countdown', endTime);
  }

  function update() {
    const now  = Date.now();
    const diff = parseInt(endTime) - now;

    if (diff <= 0) {
      // Reset for another round
      const d = new Date();
      d.setDate(d.getDate() + 14);
      endTime = d.getTime();
      localStorage.setItem('freego_countdown', endTime);
      return;
    }

    const cdDays = document.getElementById('cd-days');
    if (!cdDays) return; // Exit if countdown elements are not on this page

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent  = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');
  }

  update();
  // Only start the interval if elements exist
  if (document.getElementById('cd-days')) {
    setInterval(update, 1000);
  }
}

startCountdown();

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const arrow  = btn.querySelector('.faq-arrow');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-arrow').forEach(a => a.style.transform = '');

  if (!isOpen) {
    answer.classList.add('open');
    arrow.style.transform = 'rotate(180deg)';
  }
}

// ── Contact form ──────────────────────────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn     = document.getElementById('btn-form-submit');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent  = 'Message Sent ✓';
    btn.style.background = 'linear-gradient(135deg,#00c896,#009f76)';
    success.style.display = 'block';
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      btn.textContent  = 'Send Message';
      btn.style.background = '';
      btn.disabled     = false;
      success.style.display = 'none';
    }, 5000);
  }, 1500);
}

// ── Fade-up scroll animations ─────────────────────────────────────────────────
const fadeTargets = document.querySelectorAll(
  '.feature-item, .check-item, .price-card, .testimonial-card, ' +
  '.faq-item, .device-item, .r-stat, .step-card, .step-image, ' +
  '.sport-card, .sport-pill, .sports-text, .sports-visual'
);

fadeTargets.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

fadeTargets.forEach(el => fadeObserver.observe(el));

// ── Sport card hover glow ─────────────────────────────────────────────────────
document.querySelectorAll('.sport-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.filter = `brightness(1.25)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.filter = '';
  });
});


// ── Number counter animation ──────────────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }
  }, 25);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const text = el.textContent;
        if (text.includes('50K')) { el.textContent = '0'; animateCounter(el, 50, 'K+'); }
        else if (text.includes('134K')) { el.textContent = '0'; animateCounter(el, 134, 'K+'); }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Smooth scroll for all anchor links ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ── Pricing card hover glow ───────────────────────────────────────────────────
document.querySelectorAll('.price-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = ((e.clientX - rect.left) / rect.width)  * 100;
    const y      = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,85,0,0.08) 0%, rgba(20,20,30,0.9) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ── Page load animation ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
