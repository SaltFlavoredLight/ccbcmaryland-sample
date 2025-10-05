/* Copyright (C) 2025 Ray Zuo, S.D.G. , MIT licence. see /README.md */

// Use a 3-digit string to control the slider.
// First digit: '1' to enable dots, '0' to hide them.
// Second digit: '1' to enable arrows, '0' to hide them.
// Third digit: '0' for no autoplay, '1-9' for autoplay duration in seconds.

const sliderMode = "115";

let currentSlide = 0;
const slides = document.querySelector('.image-slider-slides');
const dotsContainer = document.querySelector('.image-slider-dots');
const totalSlides = slides.children.length;

// Function to update the slide and the active dot
function updateSlide() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    const dots = document.querySelectorAll('.image-slider-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Set up the slider based on the first two digits of sliderMode
const showDots = sliderMode[0] === '1';
const showArrows = sliderMode[1] === '1';

// Set up dots if enabled
if (showDots) {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('image-slider-dot');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlide();
        });
        dotsContainer.appendChild(dot);
    }
} else {
    dotsContainer.classList.add('hidden');
}

// Set up arrow buttons if enabled
const nextButton = document.querySelector('.image-slider-next');
const prevButton = document.querySelector('.image-slider-prev');
if (showArrows) {
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    });
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    });
    // Also add keyboard navigation if arrows are enabled
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide();
        } else if (event.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide();
        }
    });
} else {
    nextButton.classList.add('hidden');
    prevButton.classList.add('hidden');
}

// Autoplay logic based on the third digit of sliderMode
const autoplayDuration = parseInt(sliderMode[2], 10);
if (autoplayDuration > 0) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }, autoplayDuration * 1000);
}

// Initialize the slider to show the first dot as active on page load
updateSlide();