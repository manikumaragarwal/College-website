const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
let carouselIndex = 0;

const setCarouselItem = (nextIndex) => {
  carouselItems[carouselIndex]?.classList.remove('is-active');
  carouselIndex = (nextIndex + carouselItems.length) % carouselItems.length;
  carouselItems[carouselIndex]?.classList.add('is-active');
};

document.querySelectorAll('[data-carousel]').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.carousel === 'next' ? 1 : -1;
    setCarouselItem(carouselIndex + direction);
  });
});

setInterval(() => {
  if (carouselItems.length > 1) {
    setCarouselItem(carouselIndex + 1);
  }
}, 6000);

const facultySearch = document.getElementById('faculty-search');
const departmentFilter = document.getElementById('department-filter');
const facultyCards = Array.from(document.querySelectorAll('.faculty-card'));

const filterFaculty = () => {
  const query = facultySearch?.value.toLowerCase() ?? '';
  const department = departmentFilter?.value ?? 'all';

  facultyCards.forEach((card) => {
    const matchesDepartment = department === 'all' || card.dataset.department === department;
    const keywords = `${card.innerText} ${card.dataset.keywords ?? ''}`.toLowerCase();
    const matchesQuery = keywords.includes(query);
    card.style.display = matchesDepartment && matchesQuery ? 'block' : 'none';
  });
};

facultySearch?.addEventListener('input', filterFaculty);
departmentFilter?.addEventListener('change', filterFaculty);

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

const closeLightbox = () => {
  lightbox?.classList.remove('is-open');
  lightbox?.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.gallery-grid img').forEach((img) => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = img.dataset.caption ?? '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
