/* Vidants Logistics — Landing Page Scripts */

// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Sticky nav shadow on scroll
const navHeader = document.querySelector('.nav-header');
window.addEventListener('scroll', () => {
  navHeader.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(15,23,42,.12)'
    : 'none';
}, { passive: true });

// Scroll-reveal animation
const revealEls = document.querySelectorAll(
  '.service-card, .step, .testimonial-card, .visual-card, .feature-list li'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
  observer.observe(el);
});

// Contact form — simple client-side handling
const form = document.getElementById('quoteForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Request Sent! We\'ll be in touch soon.';
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
    form.reset();
  }, 1200);
});
