/* Vidants Logistics LLC — Site Scripts */

// ── NAVBAR SCROLL ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE MENU ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close menu on external click
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const isMobile = window.innerWidth <= 768;
const revealThreshold = isMobile ? 0.08 : 0.12;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: revealThreshold });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Re-observe on window resize
window.addEventListener('resize', () => {
  const newIsMobile = window.innerWidth <= 768;
  if (newIsMobile !== isMobile) {
    location.reload();
  }
}, { passive: true });

// ── QUOTE FORM ───────────────────────────────────────────────
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate submission — replace with real endpoint as needed
    setTimeout(() => {
      btn.textContent = '✓ Request Sent — We\'ll be in touch soon!';
      btn.style.background = '#16a34a';
      btn.style.opacity = '1';
      form.reset();
      
      // Reset after 3 seconds
      setTimeout(() => {
        btn.textContent = 'Send My Request';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1400);
  });
  
  // Prevent zoom on focus
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      // Scroll into view smoothly
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
  });
}

// ── ACTIVE NAV LINK (scroll spy) ────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionThreshold = isMobile ? 0.3 : 0.35;
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--orange)';
    }
  });
}, { threshold: sectionThreshold });

sections.forEach(s => sectionObserver.observe(s));
