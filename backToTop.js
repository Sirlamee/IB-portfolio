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
