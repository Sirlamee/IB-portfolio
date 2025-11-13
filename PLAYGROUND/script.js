// Back to Top Functionality
const backToTopButton = document.getElementById('backToTop');

// Show button when user scrolls down 200px from the top
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show button when near bottom of the page
    if (scrollPosition + windowHeight > documentHeight - 200) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
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
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

