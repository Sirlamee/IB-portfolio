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


// Scroll Animation Slide Out

function handleScroll() {
    // Check if viewport width is mobile size
    if (window.innerWidth <= 950) {
        // Reset any existing transforms and styles for mobile
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const leftContent = section.querySelector('.left-content');
            const rightContent = section.querySelector('.right-content');
            
            if (!leftContent || !rightContent) return;
            
            // Reset all transforms and styles
            leftContent.style.transform = '';
            leftContent.style.opacity = '';
            rightContent.style.transform = '';
            rightContent.style.opacity = '';
        });
        return;
    }

    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const leftContent = section.querySelector('.left-content');
        const rightContent = section.querySelector('.right-content');
        
        if (!leftContent || !rightContent) return;
        
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Calculate progress: 0 when section is at top, 1 when section is completely scrolled out
        const scrollProgress = Math.min(Math.max((scrollPosition - sectionTop) / windowHeight, 0), 1);
        
        // Apply transforms based on scroll progress
        // Left content slides out to the left (-100% at full progress)
        const leftTransform = -scrollProgress * 100;
        // Right content slides out to the right (100% at full progress)
        const rightTransform = scrollProgress * 100;
        
        // Apply opacity fade (starts fading at 50% scroll progress)
        const fadeStart = 0.5;
        const opacity = scrollProgress <= fadeStart ? 1 : 1 - ((scrollProgress - fadeStart) / (1 - fadeStart));
        
        leftContent.style.transform = `translateX(${leftTransform}%)`;
        leftContent.style.opacity = opacity;
        
        rightContent.style.transform = `translateX(${rightTransform}%)`;
        rightContent.style.opacity = opacity;
    });
}

// Add resize event listener to handle viewport changes
window.addEventListener('resize', handleScroll);
// Smooth scrolling for better animation visibility
window.addEventListener('scroll', handleScroll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    handleScroll(); // Set initial state
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', function() {
        document.getElementById('section2').scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Split Scroll Page

function splitScroll() {
    // Check if viewport width is mobile size
    if (window.innerWidth <= 950) {
        // Reset any existing transforms and styles for mobile
        const sections = document.querySelectorAll('.other-section');
        sections.forEach(section => {
            const columnA = section.querySelector('.column-a');
            const columnB = section.querySelector('.column-b');
            const columnC = section.querySelector('.column-c');
            const columnBContent = columnB?.querySelector('.column-content');
            
            if (!columnA || !columnB || !columnC || !columnBContent) return;
            
            // Reset all transforms and styles
            columnA.style.transform = '';
            columnA.style.opacity = '';
            columnC.style.transform = '';
            columnC.style.opacity = '';
            columnB.style.flex = '';
            columnBContent.style.transform = '';
        });
        return;
    }

    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Simple approach: animate based on total scroll progress
    // Start animating after scrolling 50% of viewport height
    const animationStart = windowHeight * 0.5;
    const animationEnd = windowHeight * 0.9; // Complete at 90% instead of 150%
    
    // Get all sections with class .other-section
    const sections = document.querySelectorAll('.other-section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Calculate progress for this specific section
        let progress = 0;
        
        if (scrollPosition >= sectionTop - animationStart) {
            const scrollRange = animationEnd - animationStart;
            const currentScroll = scrollPosition - (sectionTop - animationStart);
            progress = Math.min(currentScroll / scrollRange, 1);
        }
        
        // Get elements for this section
        const columnA = section.querySelector('.column-a');
        const columnB = section.querySelector('.column-b');
        const columnC = section.querySelector('.column-c');
        const columnBContent = columnB?.querySelector('.column-content');
        
        if (!columnA || !columnB || !columnC || !columnBContent) return;
        
        // Apply animations based on progress
        // Column A: moves right and fades
        columnA.style.transform = `translateX(${progress * 50}%)`;
        columnA.style.opacity = 1 - progress;
        
        // Column C: moves left and fades
        columnC.style.transform = `translateX(${-progress * 50}%)`;
        columnC.style.opacity = 1 - progress;
        
        // Column B: expands
        const flexValue = 1 + (progress * 2);
        columnB.style.flex = flexValue;
        
        // Scale column B content
        const scale = 1 + (progress * 0.2);
        columnBContent.style.transform = `scale(${scale})`;
    });
}

// Add resize event listener to handle viewport changes
window.addEventListener('resize', splitScroll);
window.addEventListener('scroll', splitScroll);

document.addEventListener('DOMContentLoaded', function() {
    handleScroll();
    splitScroll(); // Initialize split scroll state
});
