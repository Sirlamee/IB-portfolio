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


// toggle button functionality

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.FAQ-item');
    
    cards.forEach(card => {
        const toggleBtn = card.querySelector('.toggle-btn');
        const cardContent = card.querySelector('.FAQ-item-content');
        
        toggleBtn.addEventListener('click', function() {
            const isExpanded = cardContent.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse the card
                cardContent.classList.remove('expanded');
                toggleBtn.classList.remove('active');
                toggleBtn.textContent = '+';
            } else {
                // Expand the card
                cardContent.classList.add('expanded');
                toggleBtn.classList.add('active');
                toggleBtn.textContent = '−';
            }
        });
    });
});