// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
     // Hamburger menu functionality
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    
    hamburgerIcon.addEventListener('click', function() {
        hamburgerIcon.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburgerIcon.contains(event.target) && !navLinks.contains(event.target)) {
            hamburgerIcon.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);

    // Set initial switch state
    themeToggle.checked = currentTheme === 'light';

    // Theme toggle event listener
    themeToggle.addEventListener('change', function () {
        const newTheme = this.checked ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Second section functionality
const videoSection = document.getElementById('videoSection');
const video = document.getElementById('myVideo');
const videoContainer = document.getElementById('videoContainer');
const whiteOverlay = document.getElementById('whiteOverlay');

let hasReachedHalf = false;

// unmute/mute toggle function

function toggleMute() {
    video.muted = !video.muted;
}

video.addEventListener('play', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
});


// Intersection Observer to detect when section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // Section is out of view - pause video and reset
            video.pause();
            hasReachedHalf = false;
            videoContainer.classList.remove('visible');
            whiteOverlay.classList.remove('hidden');
        }
    });
}, {
    threshold: 0
});

observer.observe(videoSection);

// Scroll event to detect when scrolled to half of video section
window.addEventListener('scroll', () => {
    const rect = videoSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // Check if we've scrolled to at least half of the video section height
    const scrolledIntoSection = viewportHeight - sectionTop;
    const halfSectionHeight = sectionHeight / 2;

    if (scrolledIntoSection >= halfSectionHeight && !hasReachedHalf) {
        // Reached halfway point
        hasReachedHalf = true;
        whiteOverlay.classList.add('hidden');
        videoContainer.classList.add('visible');
        video.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
    } else if (scrolledIntoSection < halfSectionHeight && hasReachedHalf) {
        // Scrolled back up before halfway
        hasReachedHalf = false;
        video.pause();
        videoContainer.classList.remove('visible');
        whiteOverlay.classList.remove('hidden');
    }
});




// Fourth section functionality
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.link-item');
    const images = document.querySelectorAll('.image-display');
    const placeholderImage = document.querySelector('.placeholder-image');

    links.forEach(link => {
        link.addEventListener('mouseenter', function () {
            const target = this.getAttribute('data-image');
            // const image = document.querySelector(`.image-display.${target}`);

            // to hide the placeholder image
            placeholderImage.classList.add('hidden');

            // to hide all other images
            images.forEach(image => {
                if (image.classList.contains('active')) {
                    image.classList.remove('active');
                }
            });

            // to show the image
            const targetImage = document.querySelector(`.image-display.${target}-image`);
            if (targetImage) {
                targetImage.classList.add('active');
            }

        });
    });
});

// Fifth section functionality - letter animation

function animateLetters() {
    const letters = document.querySelectorAll('.text-line');

    letters.forEach(letter => {
        const text = letter.getAttribute('data-text');
        letter.innerHTML = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char;

            span.addEventListener('mouseenter', function () {
                this.classList.add('painted');
            });

            letter.appendChild(span);
        }
    });
}


animateLetters();