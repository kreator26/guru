// ============================================================
// LOADER.JS - Memuat semua komponen HTML secara dinamis
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // ===== DAFTAR KOMPONEN (Path ke folder components/) =====
  const components = [
    { id: 'navbar-placeholder', file: 'components/navbar.html' },
    { id: 'hero-placeholder', file: 'components/hero.html' },
    { id: 'about-placeholder', file: 'components/about.html' },
    { id: 'projects-placeholder', file: 'components/projects.html' },
    { id: 'sertifikat-placeholder', file: 'components/sertifikat.html' },
    { id: 'contact-placeholder', file: 'components/contact.html' },
    { id: 'modal-placeholder', file: 'components/modal.html' },
    { id: 'footer-placeholder', file: 'components/footer.html' }
  ];

  let loadedCount = 0;
  const totalComponents = components.length;

  // ===== LOAD SEMUA KOMPONEN =====
  components.forEach((item) => {
    fetch(item.file)
      .then(response => {
        if (!response.ok) throw new Error('File not found: ' + item.file);
        return response.text();
      })
      .then(data => {
        document.getElementById(item.id).innerHTML = data;
        loadedCount++;
        if (loadedCount === totalComponents) {
          initializeAll();
        }
      })
      .catch(error => {
        console.error('Error loading ' + item.file + ':', error);
        document.getElementById(item.id).innerHTML = 
          '<div class="container py-5 text-center text-danger">⚠️ Gagal memuat komponen</div>';
        loadedCount++;
        if (loadedCount === totalComponents) {
          initializeAll();
        }
      });
  });
});

// ============================================================
// INITIALIZE ALL FEATURES
// ============================================================
function initializeAll() {
  // ===== AOS =====
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-out-cubic',
  });

  // ===== GSAP Animations =====
  gsap.registerPlugin(TextPlugin);
  gsap.from('.hero-avatar', { duration: 1.5, scale: 0.5, opacity: 0, ease: 'back.out(1.7)' });
  gsap.from('.hero h1', { delay: 0.3, duration: 1, opacity: 0, y: 30, ease: 'power3.out' });
  gsap.from('.hero .lead', { delay: 0.6, duration: 1, opacity: 0, y: 20, ease: 'power3.out' });
  gsap.from('.hero .badge-group', { delay: 0.8, duration: 1, opacity: 0, y: 20, ease: 'power3.out' });
  gsap.from('.hero .social-links', { delay: 1.0, duration: 1, opacity: 0, y: 20, ease: 'power3.out' });
  gsap.from('.hero .cta-buttons', { delay: 1.2, duration: 1, opacity: 0, y: 20, ease: 'power3.out' });
  gsap.from('.navbar', { duration: 1, opacity: 0, y: -100, ease: 'bounce.out' });

  // ===== Image Modal Function =====
  let imageModalInstance = null;

  window.openImageModal = function(src, title, desc) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('modalImage');
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDesc');

    if (!modal || !img) {
      console.error('Modal elements not found!');
      return;
    }

    img.src = src;
    titleEl.textContent = title || 'Gambar';
    descEl.textContent = desc || '';

    if (!imageModalInstance) {
      imageModalInstance = new bootstrap.Modal(modal);
    }
    imageModalInstance.show();
  };

  // ===== Navbar Active State =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ===== Contact Form =====
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzjWwvjJihKz3-24SxEnHM5XFjNPgQd_dv3uD_fgjLSp_4AAXsC6IC4C_ECvWyLkGsuBg/exec';
  const form = document.forms['wpu-contact-form'];
  const btnKirim = document.querySelector('.btn-kirim');
  const btnLoading = document.querySelector('.btn-loading');
  const myAlert = document.querySelector('.my-alert');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      btnLoading.classList.toggle('d-none');
      btnKirim.classList.toggle('d-none');
      
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(function() {
          btnLoading.classList.toggle('d-none');
          btnKirim.classList.toggle('d-none');
          myAlert.classList.toggle('d-none');
          form.reset();
          
          setTimeout(function() {
            myAlert.classList.add('d-none');
          }, 5000);
        })
        .catch(function(error) {
          console.error('Error!', error.message);
          btnLoading.classList.toggle('d-none');
          btnKirim.classList.toggle('d-none');
          alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    });
  }

  console.log('✅ Portfolio Markus Paru siap!');
}