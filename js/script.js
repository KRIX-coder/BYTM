/* ===========================================
   BYTM - Interactions
   =========================================== */

/* ============== CONFIG ============== */
// TODO: Replace with your real WhatsApp number (country code + number, no +, no spaces)
const WHATSAPP_NUMBER = "919847868919";

/* ============== NAV SCROLL ============== */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ============== ACTIVE NAV LINK ============== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

/* ============== MOBILE FULL-SCREEN NAV ============== */
(() => {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;

  const navItems = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Services', href: 'services.html' },
    { label: 'Process', href: 'process.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi BYTM, I would like to know more about your trademark services.')}`;

  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav';
  overlay.innerHTML = `
    <div class="mobile-nav-top">
      <a href="index.html" class="logo">
        <img src="assets/logo.svg" alt="BYTM"/>
        <span>BYTM</span>
      </a>
      <button class="mobile-close" aria-label="Close menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <nav class="mobile-links">
      ${navItems.map(i => `<a href="${i.href}"${i.href === currentPage ? ' class="active"' : ''}>${i.label}</a>`).join('')}
    </nav>
    <div class="mobile-cta">
      <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-wa">
        <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
      </a>
      <a href="contact.html" class="btn btn-primary">
        <i class="fa-solid fa-arrow-right"></i> Get Started
      </a>
    </div>
    <div class="mobile-foot">
      <div class="m-contact">
        <a href="mailto:hello@bytm.in"><i class="fa-solid fa-envelope"></i> hello@bytm.in</a>
        <a href="tel:+919847868919"><i class="fa-solid fa-phone"></i> +91 98478 68919</a>
      </div>
      <div class="mobile-social">
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="${waLink}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
      <span style="font-size:.78rem;color:var(--ink-400);">© ${new Date().getFullYear()} BYTM. All rights reserved.</span>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.mobile-close');
  const openMenu = () => {
    overlay.classList.add('open');
    hamburger.classList.add('active');
    document.body.classList.add('menu-open');
  };
  const closeMenu = () => {
    overlay.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  hamburger.addEventListener('click', () => {
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener('click', closeMenu);

  overlay.querySelectorAll('.mobile-links a, .mobile-cta a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });
})();

/* ============== SCROLL REVEAL ============== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ============== FAQ ACCORDION ============== */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(x => x.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ============== STAT COUNTER ============== */
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

/* ============== CONTACT FORM → WHATSAPP ============== */
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const service = (data.get('service') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const lines = [
      `*New Inquiry - BYTM*`,
      ``,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      phone ? `*Phone:* ${phone}` : '',
      service ? `*Service:* ${service}` : '',
      ``,
      `*Message:*`,
      message
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Redirecting to WhatsApp...';
      btn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
      setTimeout(() => {
        window.open(url, '_blank');
        btn.innerHTML = orig;
        btn.style.background = '';
        contactForm.reset();
      }, 900);
    } else {
      window.open(url, '_blank');
    }
  });
}

/* ============== FLOATING WA BUTTON HREF ============== */
document.querySelectorAll('[data-wa-link]').forEach(a => {
  const msg = a.getAttribute('data-wa-msg') || 'Hi BYTM, I would like to know more about your trademark services.';
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
});

/* ============== SUBTLE PARALLAX ON HERO CARDS ============== */
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    heroVisual.querySelectorAll('.hero-card, .hero-logo-badge').forEach((el, i) => {
      const depth = (i + 1) * 8;
      el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
  heroVisual.addEventListener('mouseleave', () => {
    heroVisual.querySelectorAll('.hero-card, .hero-logo-badge').forEach(el => {
      el.style.transform = '';
    });
  });
}

/* ============== FOOTER YEAR ============== */
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
