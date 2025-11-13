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

// horizontal scroll functionality

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container-of-sections');
    const dragIndicator = document.querySelector('.drag-indicator');
    
    if (container) {
        // Enable horizontal scrolling with mouse wheel
        container.addEventListener('wheel', function(e) {
            // Prevent vertical scroll
            e.preventDefault();
            
            // Calculate the width of one section (including gap)
            const sectionWidth = container.querySelector('.section').offsetWidth + 16; // 16px is the gap
            
            // Determine scroll direction
            const direction = e.deltaY > 0 ? 1 : -1;
            
            // Smooth scroll to the next/previous section
            container.scrollBy({
                left: sectionWidth * direction,
                behavior: 'smooth'
            });
        });

        // Handle drag indicator visibility
        container.addEventListener('scroll', function() {
            if (container.scrollLeft > 50) {
                dragIndicator.classList.add('hidden');
            } else {
                dragIndicator.classList.remove('hidden');
            }
        });
        
 /*       // Add touch support for mobile devices
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', function(e) {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor style
        container.style.cursor = 'grab'; */
    } 
});






