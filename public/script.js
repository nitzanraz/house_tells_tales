// הבית מספר — page behaviour (menu, scroll effects, contact form)
document.documentElement.classList.add('js');

// Header background once the visitor scrolls
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 50);

  // Mobile "book a call" bar: show after the hero, hide near the contact form
  const contact = document.getElementById('contact');
  const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;
  document.getElementById('mobile-cta')
    .classList.toggle('show', window.scrollY > window.innerHeight && contactTop > window.innerHeight);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('menu-toggle');
const setMenu = (open) => {
  header.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
};
toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
document.querySelectorAll('#nav-mobile a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Fade sections in as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Only one FAQ answer open at a time
document.querySelectorAll('.faq details').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.faq details').forEach((o) => { if (o !== d) o.open = false; });
  });
});

// Contact form — submitted to Netlify Forms (leads appear in the Netlify dashboard + email)
const form = document.getElementById('contact-form');
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const btn = document.getElementById('form-submit');
  const err = document.getElementById('form-error');
  err.hidden = true;
  btn.disabled = true;
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    form.hidden = true;
    document.getElementById('form-success').hidden = false;
  } catch (e) {
    err.hidden = false;
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
