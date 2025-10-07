// JavaScript: Interactivity and scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Load header and footer partials
  loadPartial('partials/header.html', '#site-header');
  loadPartial('partials/footer.html', '#site-footer');

  // Initialize simple scroll/load animations using IntersectionObserver
  const animatedElements = document.querySelectorAll('.js-animate');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.05
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  animatedElements.forEach(el => {
    // ensure starting state
    el.classList.add('js-animate');
    if (!el.classList.contains('is-visible')) {
      // mark for observation
      observer.observe(el);
    }
  });

  // Lightbox for Gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (lightbox) {
    document.querySelectorAll('[data-src], .gallery-item').forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src') || item.querySelector('img')?.src;
        if (src) {
          lightboxImg.src = src;
          lightbox.classList.remove('hidden');
        }
      });
    });
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
    }
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.add('hidden');
    });
  }
});

// Helper to load partials (header/footer) into placeholders
async function loadPartial(path, placeholderSelector) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    const placeholder = document.querySelector(placeholderSelector);
    if (placeholder) {
      placeholder.innerHTML = html;
      // If header was loaded, ensure any interactive toggles (e.g., mobile menu) are wired up here
      const menuBtn = placeholder.querySelector('button[aria-label="Open menu"]');
      if (menuBtn) {
        const nav = placeholder.querySelector('nav');
        const toggle = () => {
          if (nav) nav.classList.toggle('hidden');
        };
        menuBtn.addEventListener('click', toggle);
      }
    }
  } catch (e) {
    console.error('Failed to load partial', path, e);
  }
}
