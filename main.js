/**
 * Fausto Sana Career Coach - Interactive Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initActiveNavOnScroll();
  initResourceTabs();
  initVideoModal();
  initContactForm();
});

/* -------------------------------------------------------------------------
   1. MOBILE NAVIGATION
   ------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  });
}

/* -------------------------------------------------------------------------
   2. HEADER ON SCROLL
   ------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* -------------------------------------------------------------------------
   3. ACTIVE NAV LINK ON SCROLL
   ------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const onScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* -------------------------------------------------------------------------
   4. RESOURCE FILTER TABS
   ------------------------------------------------------------------------- */
function initResourceTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length === 0 || tabPanels.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(target);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   5. VIDEO MODAL PLAYER
   ------------------------------------------------------------------------- */
function initVideoModal() {
  const modalBackdrop = document.querySelector('.video-modal-backdrop');
  const modalIframe = document.querySelector('.video-modal-iframe');
  const closeBtn = document.querySelector('.video-modal-close');
  const videoCards = document.querySelectorAll('[data-youtube-id]');

  if (!modalBackdrop || !modalIframe) return;

  const openModal = (youtubeId) => {
    modalIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    modalIframe.src = '';
    document.body.style.overflow = '';
  };

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const ytId = card.getAttribute('data-youtube-id');
      if (ytId) openModal(ytId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------
   6. CONTACT FORM INTERACTION
   ------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      alert('Per favore compila tutti i campi obbligatori.');
      return;
    }

    const originalText = btn.innerHTML;
    btn.innerHTML = 'Invio in corso...';
    btn.disabled = true;

    // Simulate sending email or open mailto client
    setTimeout(() => {
      btn.innerHTML = 'Messaggio Inviato! ✓';
      btn.style.backgroundColor = '#2e7d32';

      // Open mailto fallback as convenient backup
      const mailtoUrl = `mailto:info@faustosana.it?subject=Richiesta orientamento da ${encodeURIComponent(name)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`)}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.backgroundColor = '';
      }, 4000);
    }, 800);
  });
}

/* -------------------------------------------------------------------------
   7. AUTOMATIC ASSET PATH FALLBACK
   ------------------------------------------------------------------------- */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    if (!this.dataset.retried) {
      this.dataset.retried = '1';
      const filename = this.src.split('/').pop().split('?')[0];
      if (this.src.includes('assets/images/')) {
        this.src = filename;
      } else {
        this.src = 'assets/images/' + filename;
      }
    }
  });
});

