// script.js — robust and safe
document.addEventListener('DOMContentLoaded', () => {
  // smooth nav links (works with nav ul li a)
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  // typing effect (rotating phrases)
  const typingEl = document.getElementById('typing');
  const phrases = ["Data Analyst", "Excel Specialist", "SQL Developer", "Power BI Analyst", "Python Programmer"];
  let p = 0, c = 0, deleting = false;
  function tick() {
    if (!typingEl) return;
    const full = phrases[p];
    if (!deleting) {
      c++;
      typingEl.textContent = full.slice(0, c);
      if (c === full.length) { deleting = true; setTimeout(tick, 1200); return; }
    } else {
      c--;
      typingEl.textContent = full.slice(0, c);
      if (c === 0) { deleting = false; p = (p + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 60 : 90);
  }
  tick();

  // reveal on scroll and active nav highlight
  const sections = Array.from(document.querySelectorAll('section'));
  const navLinks = Array.from(document.querySelectorAll('nav a'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('reveal-active');
        // highlight nav
        const id = en.target.getAttribute('id');
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.22 });

  sections.forEach(s => {
    s.classList.add('reveal');
    observer.observe(s);
  });

  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // contact form demo: open mail client (fallback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || 'No name';
      const email = fd.get('email') || 'no-email';
      const message = fd.get('message') || '';
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:hello@yourdomain.com?subject=${subject}&body=${body}`;
    });
  }
});
