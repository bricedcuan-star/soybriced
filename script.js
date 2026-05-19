/* ============================================
   BRICED — JavaScript
   ============================================ */

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 40);
  lastScroll = scrollY;
});

// --- BURGER MENU ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll(
  '.section-tag, .section-title, .section-subtitle, ' +
  '.about-lead, .about-body, .about-skills, .about-visual, ' +
  '.sol-card, .proj-card, .vision-quote, .vision-body, ' +
  '.vision-pillars, .channel-card, .contact-intro, .av-card, ' +
  '.hero-metrics, .pillar'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  const delay = (i % 4);
  if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// --- SMOOTH ACTIVE NAV LINKS ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--teal)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));

// --- SOLUTION CARDS TILT EFFECT ---
document.querySelectorAll('.sol-card, .proj-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// --- HERO PARALLAX ---
const heroContent = document.querySelector('.hero-content');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// --- PHOTO PLACEHOLDER CLICK HINT ---
const photoInner = document.querySelector('.photo-inner');
if (photoInner) {
  photoInner.addEventListener('click', () => {
    const ph = photoInner.querySelector('.photo-placeholder');
    if (ph) {
      ph.style.opacity = '0.8';
      setTimeout(() => ph.style.opacity = '0.5', 300);
    }
  });
}

// --- TYPING EFFECT for hero role ---
(function typeEffect() {
  const el = document.querySelector('.hero-role');
  if (!el) return;
  const texts = [
    'Estratega Administrativa y Digital',
    'Especialista en Automatización',
    'Consultora de IA Aplicada',
    'Arquitecta de Ecosistemas Digitales',
  ];
  let ti = 0, ci = 0, deleting = false;
  const speed = { type: 55, delete: 28, pause: 2200 };

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        return setTimeout(type, speed.pause);
      }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? speed.delete : speed.type);
  }

  // Start after a delay
  setTimeout(type, 1200);
})();

// --- COUNTER ANIMATION for metrics ---
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const metricsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.metric-num');
        nums.forEach(num => {
          const text = num.textContent.trim();
          if (text === '5+') animateCounter(num, 5, '+');
        });
        metricsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const metricsEl = document.querySelector('.hero-metrics');
if (metricsEl) metricsObserver.observe(metricsEl);
