// ------------------- Smooth scroll for hero buttons -------------------
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', e => {
    const sel = btn.getAttribute('data-scroll-to');
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ------------------- Intersection Observer for fade-slide reveals -------------------
const faders = document.querySelectorAll('.fade-slide');
const appearOptions = { threshold: 0.12 };
const appearOnScroll = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    obs.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(f => appearOnScroll.observe(f));

// ------------------- Contact form handler (Formspree) -------------------
// Replace the action attribute in index.html form with your Formspree endpoint like:
// action="https://formspree.io/f/mxyzabcd"
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Sending...';

    const action = contactForm.getAttribute('action');
    const data = new FormData(contactForm);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        formStatus.style.color = 'green';
        formStatus.textContent = 'Message sent — thank you! I will reply soon.';
        contactForm.reset();
      } else {
        const result = await res.json();
        formStatus.style.color = 'crimson';
        formStatus.textContent = result?.error || 'Something went wrong — please try again later.';
      }
    } catch (err) {
      formStatus.style.color = 'crimson';
      formStatus.textContent = 'Network error. Please try again later.';
      console.error(err);
    }
  });
}
