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

    const sections = document.querySelectorAll('.slideSection');
    
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
        const rightTransform = scrollProgress * 300;
        
        // Apply opacity fade (starts fading at 50% scroll progress)
        const fadeStart = 0.2;
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


