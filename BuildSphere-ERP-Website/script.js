const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Theme preference is remembered on this device.
const themeButton = document.querySelector('.theme-toggle');
if (localStorage.getItem('buildsphere-theme') === 'dark') document.body.classList.add('dark-mode');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('buildsphere-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  themeButton.setAttribute('aria-label', document.body.classList.contains('dark-mode') ? 'Switch to light theme' : 'Switch to dark theme');
});

// Back-to-top control.
const backTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 500), { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Demo enquiry: prepares an email; it does not store form data.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('BuildSphere ERP enquiry — ' + (data.get('company') || data.get('name')));
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nInterest: ${data.get('interest')}\n\nPlease contact me about BuildSphere ERP.`);
  document.getElementById('formNote').textContent = 'Opening your email app to prepare the enquiry. This demo form does not store submissions.';
  window.location.href = `mailto:hello@mntech.ai?subject=${subject}&body=${body}`;
});
