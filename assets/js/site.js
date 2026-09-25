document.documentElement.classList.add('js');

const reveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('seen');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveal.forEach((item) => observer.observe(item));
} else {
  reveal.forEach((item) => item.classList.add('seen'));
}

document.querySelectorAll('iframe[data-fallback]').forEach((frame) => {
  const timer = window.setTimeout(() => {
    const note = document.createElement('p');
    note.className = 'lede';
    note.textContent = 'The interactive preview is taking longer than expected. Open it directly using the link above.';
    frame.insertAdjacentElement('beforebegin', note);
  }, 9000);
  frame.addEventListener('load', () => window.clearTimeout(timer), { once: true });
});
