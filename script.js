/* ============================================================
   NAVBAR — Scroll effect
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================================
   NAVBAR — Dropdown (desktop)
============================================================ */
const navDropdown     = document.getElementById('navDropdown');
const dropdownTrigger = document.getElementById('dropdownTrigger');
const dropdownMenu    = document.getElementById('dropdownMenu');

dropdownTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  navDropdown.classList.toggle('open');
});

// Tutup jika klik di luar
document.addEventListener('click', (e) => {
  if (!navDropdown.contains(e.target)) {
    navDropdown.classList.remove('open');
  }
});

// Tutup dengan tombol Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') navDropdown.classList.remove('open');
});

// Tutup saat salah satu item dropdown diklik
dropdownMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navDropdown.classList.remove('open'));
});

/* ============================================================
   NAVBAR — Mobile menu (hamburger)
============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  // Tutup dropdown jika mobile menu dibuka
  navDropdown.classList.remove('open');
});

// Tutup mobile menu saat link diklik
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Tutup mobile menu saat resize ke desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

/* ============================================================
   HERO — Parallax layers
============================================================ */
const parallaxLayers = [
  { el: document.querySelector('.layer-1'), speed: 0.04 },
  { el: document.querySelector('.layer-2'), speed: 0.07 },
  { el: document.querySelector('.layer-3'), speed: 0.02 },
];

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxLayers.forEach(({ el, speed }) => {
    if (el) el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

/* ============================================================
   HERO — Typed text effect
============================================================ */
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const roles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Open Source Enthusiast',
    'Problem Solver'
  ];
  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let pausing  = false;

  function typeEffect() {
    if (pausing) return;
    const currentRole = roles[roleIdx];

    if (!deleting) {
      heroSub.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentRole.length) {
        pausing = true;
        setTimeout(() => { deleting = true; pausing = false; typeEffect(); }, 2200);
        return;
      }
    } else {
      heroSub.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, deleting ? 40 : 70);
  }

  setTimeout(typeEffect, 800);
}

/* ============================================================
   SCROLL ANIMATIONS — fade-up elements
============================================================ */
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || '0', 10);
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));

/* ============================================================
   SKILLS — Animate bars on scroll
============================================================ */
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(el => skillObserver.observe(el));

/* ============================================================
   WORDMARK — Reveal on scroll
============================================================ */
const wordmark = document.getElementById('discordWordmark');

if (wordmark) {
  const wordmarkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wordmark.classList.add('visible');
        wordmarkObserver.unobserve(wordmark);
      }
    });
  }, { threshold: 0.4 });

  wordmarkObserver.observe(wordmark);
}

/* ============================================================
   NAVBAR — Active link highlight on scroll
============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--clr-white)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));