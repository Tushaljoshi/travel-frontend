// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');

    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
      const mobileMenu = document.createElement('div');
      mobileMenu.classList.add('mobile-menu');

      // Clone nav items and buttons
      const navItems = navMenu.cloneNode(true);
      const buttons = navButtons.cloneNode(true);

      mobileMenu.appendChild(navItems);
      mobileMenu.appendChild(buttons);

      document.body.appendChild(mobileMenu);

      // Add styles for mobile menu
      const style = document.createElement('style');
      style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background: white;
                    padding: 20px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    z-index: 999;
                    display: none;
                }
                
                .mobile-menu.active {
                    display: block;
                }
                
                .mobile-menu ul {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                
                .mobile-menu .nav-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                }
                
                .hamburger.active span:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .hamburger.active span:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
            `;

      document.head.appendChild(style);
    }

    // Toggle mobile menu visibility
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('sticky');

    // Add styles for sticky header if not already added
    if (!document.querySelector('.sticky-styles')) {
      const stickyStyles = document.createElement('style');
      stickyStyles.classList.add('sticky-styles');
      stickyStyles.textContent = `
                header.sticky {
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    background-color: rgba(255, 255, 255, 0.95);
                    animation: slideDown 0.3s ease;
                }
                
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
            `;
      document.head.appendChild(stickyStyles);
    }
  } else {
    header.classList.remove('sticky');
  }
});

// Testimonial Slider
const testimonialSlider = {
  currentSlide: 0,
  testimonials: [
    {
      image: 'images/Testimonials.jpg',
      text: '"My trip with Travelo was absolutely amazing. Everything was well organized and their customer service was exceptional."',
      name: 'Sarah Johnson',
      location: 'New York, USA'
    },
    {
      image: 'images/Testimonials1.jpg',
      text: '"I had the best vacation ever! The destinations were breathtaking and the guides were knowledgeable and friendly."',
      name: 'John Miller',
      location: 'London, UK'
    },
    {
      image: 'images/Testimonials2.jpg',
      text: '"Travelo made our honeymoon unforgettable. The attention to detail and personalized service was outstanding."',
      name: 'Maria Rodriguez',
      location: 'Barcelona, Spain'
    }
  ],

  init: function () {
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.testimonialItem = document.querySelector('.testimonial-item');

    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
  },

  updateSlide: function () {
    if (!this.testimonialItem) return;

    const current = this.testimonials[this.currentSlide];

    // Create updated testimonial HTML
    const testimonialHTML = `
            <div class="client-image">
                <img src="${current.image}" alt="Client">
            </div>
            <p class="testimonial-text">${current.text}</p>
            <div class="client-info">
                <h4>${current.name}</h4>
                <span>${current.location}</span>
            </div>
        `;

    // Add fade out and fade in animation
    this.testimonialItem.style.opacity = '0';

    setTimeout(() => {
      this.testimonialItem.innerHTML = testimonialHTML;
      this.testimonialItem.style.opacity = '1';
    }, 300);
  },

  nextSlide: function () {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    this.updateSlide();
  },

  prevSlide: function () {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
    this.updateSlide();
  }
};

// Initialize testimonial slider
document.addEventListener('DOMContentLoaded', () => {
  testimonialSlider.init();

  // Add fade transition styles for testimonials
  const style = document.createElement('style');
  style.textContent = `
        .testimonial-item {
            transition: opacity 0.3s ease;
        }
    `;
  document.head.appendChild(style);

  // Auto rotate testimonials
  setInterval(() => {
    testimonialSlider.nextSlide();
  }, 5000);
});

// Animate on scroll effect
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.feature-item, .destination-card, .section-title');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      // Add animation class if not already added
      if (!element.classList.contains('animate')) {
        element.classList.add('animate');

        // Add animation styles if not already added
        if (!document.querySelector('.animation-styles')) {
          const animationStyles = document.createElement('style');
          animationStyles.classList.add('animation-styles');
          animationStyles.textContent = `
                        .feature-item.animate, .destination-card.animate {
                            animation: fadeInUp 0.6s ease forwards;
                        }
                        
                        .section-title.animate {
                            animation: fadeIn 0.6s ease forwards;
                        }
                        
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(30px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                        }
                        
                        .feature-item, .destination-card, .section-title {
                            opacity: 0;
                        }
                    `;
          document.head.appendChild(animationStyles);
        }
      }
    }
  });
};

// Call animateOnScroll on page load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      // Show error
      if (!document.querySelector('.email-error')) {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('email-error');
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.style.color = '#ff3333';
        errorMsg.style.marginTop = '10px';
        errorMsg.style.fontSize = '14px';

        emailInput.style.borderColor = '#ff3333';

        newsletterForm.appendChild(errorMsg);
      }
    } else {
      // Remove error if exists
      const errorMsg = document.querySelector('.email-error');
      if (errorMsg) {
        errorMsg.remove();
        emailInput.style.borderColor = '';
      }

      // Show success message
      emailInput.value = '';

      const successMsg = document.createElement('div');
      successMsg.textContent = 'Thank you for subscribing!';
      successMsg.style.color = '#4caf50';
      successMsg.style.marginTop = '10px';
      successMsg.style.fontSize = '14px';

      newsletterForm.appendChild(successMsg);

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
  });
}

// Date picker initialization for the search form
const dateInput = document.querySelector('.form-item input[placeholder="When will you travel?"]');
if (dateInput) {
  dateInput.setAttribute('type', 'date');

  // Set minimum date to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  dateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
}

// Add counter for guests input
const guestsInput = document.querySelector('.form-item input[placeholder="Number of people"]');
if (guestsInput) {
  // Replace text input with number input with controls
  guestsInput.setAttribute('type', 'number');
  guestsInput.setAttribute('min', '1');
  guestsInput.setAttribute('max', '10');
  guestsInput.setAttribute('value', '2');
}

// Add page loader
document.addEventListener('DOMContentLoaded', () => {
  // Create loader element
  const loader = document.createElement('div');
  loader.classList.add('page-loader');
  loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;
  document.body.appendChild(loader);

  // Add loader styles
  const loaderStyle = document.createElement('style');
  loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 87, 34, 0.2);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
  document.head.appendChild(loaderStyle);

  // Hide loader after page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';

      // Remove loader after transition
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });
});

/*// JavaScript for Your Travel Site - Destination Page with API Integration

const API_URL = 'https://mocki.io/v1/1e3fabc1-c62e-4d8b-8fcb-9b41da18e2dc'; // Replace with your real API endpoint

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filters button");
  const destinationGrid = document.querySelector(".destinations-grid");
  const loadMoreButton = document.querySelector(".load-more button");

  let allDestinations = [];
  let currentIndex = 0;
  const cardsPerLoad = 6;
  let currentFilter = "All";

  function createCard(dest) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-category", dest.category);
    card.innerHTML = `
      <div class="card-image" style="background-image: url('${dest.image}');">
        <span class="badge">${dest.tours} Tours</span>
        <div class="card-content">
          <h3>${dest.name}</h3>
          <div class="circle-arrow" onclick="location.href='${dest.name.toLowerCase().replace(/\s+/g, '-')}.html'">→</div>
        </div>
      </div>
    `;
    return card;
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();
    let count = 0;

    while (currentIndex < allDestinations.length && count < cardsPerLoad) {
      const dest = allDestinations[currentIndex];
      if (currentFilter === "All" || dest.category === currentFilter) {
        fragment.appendChild(createCard(dest));
        count++;
      }
      currentIndex++;
    }

    destinationGrid.appendChild(fragment);
    if (currentIndex >= allDestinations.length) {
      loadMoreButton.style.display = "none";
    }
  }

  function filterDestinations(filter) {
    currentFilter = filter;
    destinationGrid.innerHTML = "";
    currentIndex = 0;
    renderCards();
    loadMoreButton.style.display = "block";
  }

  function setupFilters() {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterDestinations(this.textContent);
      });
    });
  }

  function setupLoadMore() {
    loadMoreButton.addEventListener("click", function () {
      renderCards();
    });
  }

  function fetchDestinations() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        allDestinations = data;
        renderCards();
      })
      .catch((error) => console.error("API fetch error:", error));
  }

  // Video Play Button
const playBtn = document.querySelector(".play-button");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    // Create overlay
    const videoOverlay = document.createElement("div");
    videoOverlay.classList.add("video-overlay");
    videoOverlay.setAttribute("role", "dialog");
    videoOverlay.setAttribute("aria-modal", "true");

    // Embed video in overlay
    videoOverlay.innerHTML = `
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/hOx_XnVLJU0?autoplay=1" 
          frameborder="0" 
          allow="autoplay; encrypted-media" 
          allowfullscreen 
          title="Promotional Video"
        ></iframe>
        <span class="close-video" role="button" tabindex="0" aria-label="Close video">&times;</span>
      </div>
    `;

    // Append overlay
    document.body.appendChild(videoOverlay);

    // Close button click
    const closeBtn = document.querySelector(".close-video");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        videoOverlay.remove();
      });

      // Allow closing with "Enter" or "Escape" key
      closeBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          videoOverlay.remove();
        }
      });
    }

    // Esc key to close video
    document.addEventListener("keydown", function escClose(e) {
      if (e.key === "Escape") {
        videoOverlay.remove();
        document.removeEventListener("keydown", escClose);
      }
    });
  });
}


  setupFilters();
  setupLoadMore();
  fetchDestinations();
});

 */
// JavaScript for Your Travel Site - Destination Page WITHOUT API

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filters button");
  const destinationGrid = document.querySelector(".destinations-grid");
  const loadMoreButton = document.querySelector(".load-more button");

  const allDestinations = [
    { name: "Rajasthan", category: "Asia", tours: 3, image: "rajasthan.jpeg" },
    { name: "Indonesia", category: "Asia", tours: 3, image: "indonesia.jpeg" },
    { name: "Bekasi", category: "Asia", tours: 3, image: "bekasi.jpeg" },
    { name: "Bali", category: "Asia", tours: 3, image: "Bali.jpg" },
    { name: "Helsingfors", category: "Europe", tours: 3, image: "helsinki.jpeg" },
    { name: "Paris", category: "Europe", tours: 3, image: "Greece.jpg" },
    { name: "Greece", category: "Europe", tours: 3, image: "Greece.jpg" },
    { name: "Sydney", category: "Australia", tours: 3, image: "Rome.jpg" },
    { name: "Cape Town", category: "Africa", tours: 3, image: "bekasi.jpeg" },
    { name: "Rio de Janeiro", category: "South America", tours: 3, image: "indonesia.jpeg" },
    { name: "New York", category: "North America", tours: 3, image: "helsinki.jpeg" },
  ];

  let currentIndex = 0;
  const cardsPerLoad = 3;
  let currentFilter = "All";

  function createCard(dest) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-category", dest.category);
    card.innerHTML = `
      <div class="card-image" style="background-image: url('./images/${dest.image}');">
        <span class="badge">${dest.tours} Tours</span>
        <div class="card-content">
          <h3>${dest.name}</h3>
          <div class="circle-arrow" onclick="location.href='${dest.name.toLowerCase().replace(/\s+/g, '-')}.html'">→</div>
        </div>
      </div>
    `;
    return card;
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();
    let count = 0;
    let added = false;

    for (let i = currentIndex; i < allDestinations.length && count < cardsPerLoad; i++) {
      const dest = allDestinations[i];
      if (currentFilter === "All" || dest.category === currentFilter) {
        fragment.appendChild(createCard(dest));
        count++;
        added = true;
      }
      currentIndex++;
    }

    destinationGrid.appendChild(fragment);
    if (!added || currentIndex >= allDestinations.length) {
      if (loadMoreButton) loadMoreButton.style.display = "none";
    }
  }

  function filterDestinations(filter) {
    currentFilter = filter;
    destinationGrid.innerHTML = "";
    currentIndex = 0;
    renderCards();
    if (loadMoreButton) loadMoreButton.style.display = "block";
  }

  function setupFilters() {
    if (filterButtons.length) {
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          filterButtons.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          filterDestinations(this.textContent);
        });
      });
    }
  }

  function setupLoadMore() {
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", function () {
        renderCards();
      });
    }
  }

  // Initialize
  setupFilters();
  setupLoadMore();
  renderCards();
});

// Video Play Button
// Video Play Button
const playBtn = document.querySelector(".play-button");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    // Create overlay
    const videoOverlay = document.createElement("div");
    videoOverlay.classList.add("video-overlay");
    videoOverlay.setAttribute("role", "dialog");
    videoOverlay.setAttribute("aria-modal", "true");

    // Embed video in overlay
    videoOverlay.innerHTML = `
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/hOx_XnVLJU0?autoplay=1" 
          frameborder="0" 
          allow="autoplay; encrypted-media" 
          allowfullscreen 
          title="Promotional Video"
        ></iframe>
        <span class="close-video" role="button" tabindex="0" aria-label="Close video">&times;</span>
      </div>
    `;

    // Append overlay
    document.body.appendChild(videoOverlay);

    // Close button click
    const closeBtn = document.querySelector(".close-video");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        videoOverlay.remove();
      });

      // Allow closing with "Enter" or "Escape" key
      closeBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          videoOverlay.remove();
        }
      });
    }

    // Esc key to close video
    document.addEventListener("keydown", function escClose(e) {
      if (e.key === "Escape") {
        videoOverlay.remove();
        document.removeEventListener("keydown", escClose);
      }
    });
  });
}
const cardsPerPage = 6;
const cards = document.querySelectorAll('.blog-card');
const paginationButtons = document.querySelectorAll('.pagination button:not(.next)');
const searchInput = document.querySelector('input[type="text"]');

let currentPage = 1;
function showPage(page) {
  currentPage = page;
  const start = (page - 1) * cardsPerPage;
  const end = page * cardsPerPage;

  cards.forEach((card, index) => {
    card.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  paginationButtons.forEach(btn => btn.classList.remove('active'));

  if (paginationButtons[page - 1]) {
    paginationButtons[page - 1].classList.add('active');
  }
}

paginationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showPage(index + 1);
  });
});

// Handle search
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");
  const cardsPerPage = 6;

  function showPage(pageNum) {
    // Implement your pagination logic
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      const query = e.target.value.toLowerCase();
      let matchIndex = -1;

      cards.forEach((card, index) => {
        const title = card.dataset.title.toLowerCase();
        if (title.includes(query)) {
          matchIndex = index;
        }
      });

      if (matchIndex >= 0) {
        const pageNum = Math.floor(matchIndex / cardsPerPage) + 1;
        showPage(pageNum);
      }
    });
  } else {
    console.warn("Search input not found in the DOM.");
  }
});


// Initial load
showPage(1);
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('signupEmail');
const passwordInput = document.getElementById('signupPassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

if (form) {
  form.addEventListener('submit', function (e) {
    let isValid = true;

    // Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = 'Invalid email format.';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    // Password strength check (min 6 chars, one letter, one number)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(passwordInput.value)) {
      passwordError.textContent = 'Password must be at least 6 characters with a number and a letter.';
      isValid = false;
    } else {
      passwordError.textContent = '';
    }

    if (!isValid) e.preventDefault(); // Stop form submission if invalid
  });
}
