// script.js — cleaned and FormSubmit compatible
document.addEventListener('DOMContentLoaded', () => {

  // smooth nav links
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // typing effect
  const typingEl = document.getElementById('typing');
  const phrases = [
    "Data Analyst",
    "Excel Specialist",
    "SQL Developer",
    "Power BI Analyst",
    "Python Programmer"
  ];

  let p = 0, c = 0, deleting = false;

  function tick() {
    if (!typingEl) return;
    const full = phrases[p];

    if (!deleting) {
      c++;
      typingEl.textContent = full.slice(0, c);
      if (c === full.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      c--;
      typingEl.textContent = full.slice(0, c);
      if (c === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 90);
  }
  tick();

  // reveal on scroll + nav highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('reveal-active');
        const id = en.target.getAttribute('id');
        navLinks.forEach(link =>
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
        );
      }
    });
  }, { threshold: 0.22 });

  sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });

  // footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

});
