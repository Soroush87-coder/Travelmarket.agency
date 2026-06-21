const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => obs.observe(item));
} else {
  items.forEach(item => item.classList.add('visible'));
}

document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (btn) {
      btn.dataset.originalText = btn.textContent || btn.value || '';
      if (btn.tagName === 'INPUT') btn.value = 'Sending...';
      else btn.textContent = document.documentElement.dir === 'rtl' ? 'در حال ارسال...' : 'Sending...';
      btn.disabled = true;
    }
  });
});

function sendRequest(e) {
  e.preventDefault();
  const d = new FormData(e.target);
  const body = encodeURIComponent([
    'New Travel Market Request', '',
    `Name: ${d.get('name') || ''}`,
    `WhatsApp: ${d.get('whatsapp') || ''}`,
    `Email: ${d.get('email') || ''}`,
    `Nationality: ${d.get('nationality') || ''}`,
    `Destination: ${d.get('destination') || ''}`,
    `Dates: ${d.get('dates') || ''}`,
    `Notes: ${d.get('notes') || ''}`
  ].join('\n'));
  location.href = `mailto:dynamic.range87@gmail.com?subject=Travel Market Request&body=${body}`;
}
