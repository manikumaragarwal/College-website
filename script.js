const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

const openModal = (targetId) => {
  const modal = document.getElementById(targetId);
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = (modal) => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    openModal(trigger.dataset.modalTarget);
  });
});

document.querySelectorAll('[data-modal-close]').forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) closeModal(modal);
  });
});

document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal.is-open').forEach((modal) => closeModal(modal));
  }
});

const heroCarousel = document.querySelector('[data-carousel="hero"]');
if (heroCarousel) {
  const slides = Array.from(heroCarousel.querySelectorAll('.hero-slide'));
  const dotsContainer = heroCarousel.querySelector('[data-carousel-dots]');
  let currentIndex = 0;
  let timerId;

  const renderDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = index === currentIndex ? 'active' : '';
      dot.addEventListener('click', () => {
        setSlide(index);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
  };

  const setSlide = (index) => {
    slides[currentIndex].classList.remove('is-active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('is-active');
    renderDots();
  };

  const resetTimer = () => {
    clearInterval(timerId);
    timerId = setInterval(() => setSlide(currentIndex + 1), 5000);
  };

  heroCarousel.querySelectorAll('[data-carousel-control]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const direction = btn.dataset.carouselControl === 'next' ? 1 : -1;
      setSlide(currentIndex + direction);
      resetTimer();
    });
  });

  heroCarousel.addEventListener('mouseenter', () => clearInterval(timerId));
  heroCarousel.addEventListener('mouseleave', resetTimer);

  renderDots();
  resetTimer();
}

const counters = document.querySelectorAll('[data-counter]');
if (counters.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = Number(entry.target.dataset.counter || 0);
        let current = 0;
        const increment = Math.ceil(target / 80);
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(interval);
          } else {
            entry.target.textContent = current;
          }
        }, 20);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

const newsItems = [
  {
    title: 'NAAC peer team commends research output',
    date: 'May 22, 2026',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'The NAAC review highlighted our interdisciplinary research clusters and student publications.',
    link: 'news.html'
  },
  {
    title: 'Commerce department launches fintech lab',
    date: 'May 10, 2026',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    excerpt: 'The new fintech lab offers Bloomberg terminals, analytics tools, and industry mentors.',
    link: 'news.html'
  },
  {
    title: 'Shivaji students win national debate',
    date: 'Apr 18, 2026',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Team Shivaji secured first place among 60 colleges at the Mumbai Debate League.',
    link: 'news.html'
  },
  {
    title: 'Sports complex upgraded with new arena',
    date: 'Apr 02, 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Students now enjoy indoor badminton courts, gymnasium, and physiotherapy support.',
    link: 'news.html'
  }
];

const newsPreview = document.getElementById('news-preview');
if (newsPreview) {
  newsPreview.innerHTML = newsItems
    .map(
      (item) => `
      <article>
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <p class="eyebrow">${item.date}</p>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <a class="link" href="${item.link}">Read more →</a>
      </article>
    `
    )
    .join('');
}

const galleryPreview = document.getElementById('gallery-preview-grid');
const previewImages = [
  {
    url: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80',
    caption: 'Main Administrative Block'
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    caption: 'Smart Classroom Experience'
  },
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    caption: 'Student Collaboration Spaces'
  },
  {
    url: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=800&q=80',
    caption: 'Library and Learning Commons'
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    caption: 'Innovation Lab'
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    caption: 'Convocation Ceremony'
  }
];

if (galleryPreview) {
  galleryPreview.innerHTML = previewImages
    .map(
      (item) => `
      <figure>
        <img src="${item.url}" alt="${item.caption}" loading="lazy" />
        <figcaption>${item.caption}</figcaption>
      </figure>
    `
    )
    .join('');
}

const galleryData = [
  {
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    alt: 'Campus main building exterior',
    category: 'campus',
    caption: 'Main Administrative Block',
    date: 'Aug 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern campus courtyard',
    category: 'campus',
    caption: 'Heritage Courtyard',
    date: 'Jul 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    alt: 'Library interior with students',
    category: 'library',
    caption: 'Central Library',
    date: 'Jun 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    alt: 'Students studying in library',
    category: 'library',
    caption: 'Reading Hall',
    date: 'Jun 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&q=80',
    alt: 'Group discussion in library',
    category: 'library',
    caption: 'Collaborative Zone',
    date: 'May 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=900&q=80',
    alt: 'Computer lab with students',
    category: 'labs',
    caption: 'Computer Science Lab',
    date: 'May 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    alt: 'Students in classroom',
    category: 'classrooms',
    caption: 'Smart Classroom',
    date: 'Apr 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    alt: 'Laboratory demonstration',
    category: 'labs',
    caption: 'Physics Lab',
    date: 'Apr 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    alt: 'Students in chemistry lab',
    category: 'labs',
    caption: 'Chemistry Lab',
    date: 'Apr 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
    alt: 'Sports ground activity',
    category: 'sports',
    caption: 'Cricket Ground',
    date: 'Mar 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    alt: 'Indoor badminton court',
    category: 'sports',
    caption: 'Indoor Sports Arena',
    date: 'Mar 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80',
    alt: 'Students celebrating cultural fest',
    category: 'events',
    caption: 'Cultural Fest',
    date: 'Feb 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=900&q=80',
    alt: 'Annual day performance',
    category: 'events',
    caption: 'Annual Day',
    date: 'Feb 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
    alt: 'Students at convocation',
    category: 'events',
    caption: 'Convocation Ceremony',
    date: 'Jan 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    alt: 'Student activities and clubs',
    category: 'student-life',
    caption: 'Entrepreneurship Club',
    date: 'Jan 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    alt: 'NSS volunteers',
    category: 'student-life',
    caption: 'NSS Community Drive',
    date: 'Dec 2024'
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
    alt: 'Graduation ceremony',
    category: 'events',
    caption: 'Graduation Day',
    date: 'Dec 2024'
  }
];

const gallerySources = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
  'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b',
  'https://images.unsplash.com/photo-1519452575417-564c1401ecc0',
  'https://images.unsplash.com/photo-1521335629791-ce4aec67dd47',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
];

const extraGalleryItems = Array.from({ length: 55 }).map((_, index) => {
  const source = gallerySources[index % gallerySources.length];
  const categoryOptions = ['campus', 'student-life', 'events', 'sports', 'library', 'classrooms'];
  const category = categoryOptions[index % categoryOptions.length];
  return {
    url: `${source}?auto=format&fit=crop&w=900&q=80`,
    alt: 'Campus life moment',
    category,
    caption: category.replace('-', ' ').replace(/\\b\\w/g, (char) => char.toUpperCase()),
    date: '2024'
  };
});

galleryData.push(...extraGalleryItems);

const galleryContainer = document.getElementById('gallery-grid');
const galleryFilters = document.getElementById('gallery-filters');
const lightbox = document.getElementById('gallery-lightbox');

if (galleryContainer) {
  const renderGallery = (filter = 'all') => {
    galleryContainer.innerHTML = galleryData
      .filter((item) => filter === 'all' || item.category === filter)
      .map(
        (item, idx) => `
        <figure data-index="${idx}" data-category="${item.category}">
          <img src="${item.url}" alt="${item.alt}" loading="lazy" />
          <figcaption>${item.caption} • ${item.date}</figcaption>
        </figure>
      `
      )
      .join('');
  };

  renderGallery();

  galleryFilters?.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    const filter = event.target.dataset.filter;
    if (!filter) return;
    galleryFilters.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderGallery(filter);
  });

  let currentImageIndex = 0;

  const openLightbox = (index) => {
    if (!lightbox) return;
    const image = galleryData[index];
    const lightboxImage = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    if (!image || !lightboxImage || !caption) return;
    lightboxImage.src = image.url;
    lightboxImage.alt = image.alt;
    caption.textContent = `${image.caption} • ${image.date}`;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    currentImageIndex = index;
  };

  galleryContainer.addEventListener('click', (event) => {
    const figure = event.target.closest('figure');
    if (!figure) return;
    openLightbox(Number(figure.dataset.index));
  });

  lightbox?.querySelector('[data-lightbox="prev"]')?.addEventListener('click', () => {
    openLightbox((currentImageIndex - 1 + galleryData.length) % galleryData.length);
  });

  lightbox?.querySelector('[data-lightbox="next"]')?.addEventListener('click', () => {
    openLightbox((currentImageIndex + 1) % galleryData.length);
  });

  lightbox?.querySelector('[data-lightbox="close"]')?.addEventListener('click', () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  });

  window.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'ArrowLeft') {
      openLightbox((currentImageIndex - 1 + galleryData.length) % galleryData.length);
    }
    if (event.key === 'ArrowRight') {
      openLightbox((currentImageIndex + 1) % galleryData.length);
    }
    if (event.key === 'Escape') {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
}

const facultyList = [
  {
    name: 'Dr. Rajesh Kumar',
    title: 'Principal',
    department: 'Leadership',
    qualification: 'PhD, Education (JNU)',
    interests: 'Higher education policy, leadership',
    email: 'principal@shivajicollege.edu.in',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Prof. Anjali Sharma',
    title: 'HOD, Commerce',
    department: 'Commerce',
    qualification: 'PhD, Commerce (Pune University)',
    interests: 'Finance, fintech',
    email: 'anjali.sharma@shivajicollege.edu.in',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Vikram Singh',
    title: 'Associate Professor',
    department: 'Computer Science',
    qualification: 'PhD, Computer Science (IIT Bombay)',
    interests: 'AI, data analytics',
    email: 'vikram.singh@shivajicollege.edu.in',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Prof. Priya Desai',
    title: 'Associate Professor',
    department: 'Economics',
    qualification: 'PhD, Economics (ISI Kolkata)',
    interests: 'Development economics',
    email: 'priya.desai@shivajicollege.edu.in',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80'
  }
];

const facultyContainer = document.getElementById('faculty-grid');
if (facultyContainer) {
  const extendedFaculty = Array.from({ length: 16 }).map((_, index) => ({
    name: `Dr. Faculty Member ${index + 5}`,
    title: 'Assistant Professor',
    department: index % 2 === 0 ? 'Science' : 'Arts',
    qualification: 'PhD, Specialist Discipline',
    interests: 'Research and mentoring',
    email: `faculty${index + 5}@shivajicollege.edu.in`,
    image: `https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=${600 + index}&q=80`
  }));

  const allFaculty = facultyList.concat(extendedFaculty);
  const renderFaculty = (filter = 'all', query = '') => {
    facultyContainer.innerHTML = allFaculty
      .filter(
        (faculty) =>
          (filter === 'all' || faculty.department === filter) &&
          `${faculty.name} ${faculty.interests} ${faculty.department}`
            .toLowerCase()
            .includes(query.toLowerCase())
      )
      .map(
        (faculty) => `
        <article class="profile-card" data-department="${faculty.department}">
          <img src="${faculty.image}" alt="${faculty.name}" loading="lazy" />
          <div>
            <h3>${faculty.name}</h3>
            <p>${faculty.title}</p>
            <p>${faculty.department}</p>
            <p>${faculty.qualification}</p>
            <p>Research: ${faculty.interests}</p>
            <p>Email: ${faculty.email}</p>
          </div>
        </article>
      `
      )
      .join('');
  };

  renderFaculty();

  const facultySearch = document.getElementById('faculty-search');
  const facultyDept = document.getElementById('faculty-dept');
  const updateFaculty = () =>
    renderFaculty(facultyDept?.value || 'all', facultySearch?.value || '');

  facultySearch?.addEventListener('input', updateFaculty);
  facultyDept?.addEventListener('change', updateFaculty);
}

const newsArchive = [
  {
    title: 'NAAC peer team commends research output',
    date: 'May 22, 2026',
    category: 'research',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'NAAC review highlighted interdisciplinary research clusters and student publications.'
  },
  {
    title: 'Commerce department launches fintech lab',
    date: 'May 10, 2026',
    category: 'research',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    excerpt: 'New fintech lab features analytics tools, Bloomberg terminals, and industry mentors.'
  },
  {
    title: 'Shivaji students win national debate',
    date: 'Apr 18, 2026',
    category: 'student',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Team Shivaji secured first place among 60 colleges at the Mumbai Debate League.'
  },
  {
    title: 'Sports complex upgraded with new arena',
    date: 'Apr 02, 2026',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Students now enjoy indoor courts, gymnasium, and physiotherapy support.'
  },
  {
    title: 'Admissions portal upgraded with AI chat support',
    date: 'Mar 22, 2026',
    category: 'admissions',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Applicants can now get instant answers and track their admission status online.'
  },
  {
    title: 'Alumni conclave draws 300+ graduates',
    date: 'Mar 10, 2026',
    category: 'student',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Alumni shared mentorship stories and internship opportunities for current students.'
  },
  {
    title: 'National seminar on sustainable finance',
    date: 'Feb 24, 2026',
    category: 'research',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Experts from RBI and academia joined the commerce faculty for a day-long seminar.'
  },
  {
    title: 'Basketball team wins state championship',
    date: 'Feb 18, 2026',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Shivaji College emerged champions in the inter-university basketball league.'
  },
  {
    title: 'New student mentorship program launched',
    date: 'Jan 28, 2026',
    category: 'student',
    image: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Senior students guide freshmen on academics, clubs, and career planning.'
  },
  {
    title: 'Placement drive records highest offer yet',
    date: 'Jan 15, 2026',
    category: 'admissions',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Top package reached ₹18 LPA with participation from 35 recruiters.'
  },
  {
    title: 'Biotech lab receives industry funding',
    date: 'Dec 18, 2025',
    category: 'research',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Grant supports student-led research in sustainable bio-materials.'
  },
  {
    title: 'Annual cultural fest celebrates diversity',
    date: 'Dec 02, 2025',
    category: 'student',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Over 2,000 participants joined the music, dance, and theatre events.'
  },
  {
    title: 'Admissions counseling sessions open',
    date: 'Nov 22, 2025',
    category: 'admissions',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Counselors will guide applicants through programs, scholarships, and eligibility.'
  },
  {
    title: 'Eco club plants 2,000 saplings',
    date: 'Nov 10, 2025',
    category: 'student',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    excerpt: 'NSS volunteers led a green campus initiative across Pune city.'
  },
  {
    title: 'Cricket team qualifies for nationals',
    date: 'Oct 25, 2025',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Shivaji College will represent Maharashtra in the inter-college nationals.'
  }
];

const newsGrid = document.getElementById('news-grid');
if (newsGrid) {
  const renderNews = (filter = 'all', query = '') => {
    newsGrid.innerHTML = newsArchive
      .filter(
        (item) =>
          (filter === 'all' || item.category === filter) &&
          `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase())
      )
      .map(
        (item) => `
        <article>
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <p class="eyebrow">${item.date}</p>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <a class="link" href="contact.html">Read more →</a>
        </article>
      `
      )
      .join('');
  };

  renderNews();
  const newsSearch = document.getElementById('news-search');
  const newsFilter = document.getElementById('news-filter');
  const updateNews = () => renderNews(newsFilter?.value || 'all', newsSearch?.value || '');
  newsSearch?.addEventListener('input', updateNews);
  newsFilter?.addEventListener('change', updateNews);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const formFields = {
    name: contactForm.querySelector('#name'),
    email: contactForm.querySelector('#email'),
    phone: contactForm.querySelector('#phone'),
    subject: contactForm.querySelector('#subject'),
    message: contactForm.querySelector('#message')
  };

  const setError = (field, message) => {
    const errorEl = contactForm.querySelector(`#${field.id}-error`);
    if (errorEl) errorEl.textContent = message;
  };

  const validateForm = () => {
    let valid = true;
    if (!formFields.name.value.trim()) {
      setError(formFields.name, 'Name is required.');
      valid = false;
    } else {
      setError(formFields.name, '');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formFields.email.value)) {
      setError(formFields.email, 'Enter a valid email.');
      valid = false;
    } else {
      setError(formFields.email, '');
    }

    if (!/^[0-9]{10}$/.test(formFields.phone.value)) {
      setError(formFields.phone, 'Phone must be 10 digits.');
      valid = false;
    } else {
      setError(formFields.phone, '');
    }

    if (!formFields.subject.value) {
      setError(formFields.subject, 'Please select a subject.');
      valid = false;
    } else {
      setError(formFields.subject, '');
    }

    if (!formFields.message.value.trim()) {
      setError(formFields.message, 'Message is required.');
      valid = false;
    } else {
      setError(formFields.message, '');
    }

    return valid;
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const successBox = contactForm.querySelector('.success-box');
    const errorBox = contactForm.querySelector('.error-box');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const loader = contactForm.querySelector('.btn-loader');
    const btnText = contactForm.querySelector('.btn-text');

    if (successBox) successBox.style.display = 'none';
    if (errorBox) errorBox.style.display = 'none';

    if (!validateForm()) return;

    if (submitBtn) submitBtn.disabled = true;
    if (loader) loader.style.display = 'inline';
    if (btnText) btnText.style.display = 'none';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://formsubmit.co/ajax/info@shivajicollege.edu.in', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (response.ok) {
        if (successBox) successBox.style.display = 'block';
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      if (errorBox) errorBox.style.display = 'block';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (loader) loader.style.display = 'none';
      if (btnText) btnText.style.display = 'inline';
    }
  });
}
