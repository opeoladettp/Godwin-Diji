// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Slide Navigation
const slides = document.querySelectorAll('.slide');
const slideNav = document.getElementById('slideNav');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

// Create navigation dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    slideNav.appendChild(dot);
});

const navDots = document.querySelectorAll('.nav-dot');

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index < currentSlide) {
            slide.classList.add('prev');
        }
    });

    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update button states
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
    nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
    nextBtn.style.cursor = currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer';
}

function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentSlide = index;
        updateSlides();
    }
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
    }
}

// Event Listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    }
});

// Touch/Swipe Support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
    }
}

// Initialize
updateSlides();

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});
