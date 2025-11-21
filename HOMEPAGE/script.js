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

// Directional Background Slide Animation Based on Cursor Position
document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.column');
    let currentCursorX = 0;
    
    // Track cursor position globally
    document.addEventListener('mousemove', function(e) {
        currentCursorX = e.clientX;
    });
    
    // Function to get cursor position as percentage of screen width
    function getCursorPercentage() {
        return (currentCursorX / window.innerWidth) * 100;
    }
    
    // Function to determine slide direction for each column
    function getSlideDirection(columnIndex, cursorPercentage) {
        switch(columnIndex) {
            case 0: // First column (0-25%)
                return 'slide-from-right';
                
            case 1: // Second column (25-50%)
                if (cursorPercentage < 25) {
                    return 'slide-from-left';
                } else if (cursorPercentage > 50) {
                    return 'slide-from-right';
                } else {
                    // Default direction when cursor is within the column
                    return 'slide-from-left';
                }
                
            case 2: // Third column (50-75%)
                if (cursorPercentage < 50) {
                    return 'slide-from-left';
                } else if (cursorPercentage > 75) {
                    return 'slide-from-right';
                } else {
                    // Default direction when cursor is within the column
                    return 'slide-from-left';
                }
                
            case 3: // Fourth column (75-100%)
                return 'slide-from-left';
                
            default:
                return 'slide-from-left';
        }
    }
    
    // Add hover event listeners to each column
    columns.forEach((column, index) => {
        column.addEventListener('mouseenter', function() {
            const cursorPercentage = getCursorPercentage();
            const slideDirection = getSlideDirection(index, cursorPercentage);
            
            // Remove any existing slide classes
            column.classList.remove('slide-from-left', 'slide-from-right');
            
            // Add the appropriate slide direction class
            column.classList.add(slideDirection);
            
            // Hide headers on other columns and show content
            columns.forEach((otherColumn, otherIndex) => {
                if (otherIndex !== index) {
                    otherColumn.classList.add('hide-content');
                }
            });
        });
        
        column.addEventListener('mouseleave', function() {
            // Remove slide classes when mouse leaves
            column.classList.remove('slide-from-left', 'slide-from-right');
            
            // Remove hide-content from all columns
            columns.forEach(col => {
                col.classList.remove('hide-content');
            });
        });
    });
});

// Smooth scrolling for navigation links (if needed in future)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Make columns clickable
document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.column[data-link]');
    
    columns.forEach(column => {
        // Add click functionality
        column.addEventListener('click', function(e) {
            const link = this.getAttribute('data-link');
            
            if (link) {
                // Add click animation effect
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
                
                setTimeout(() => {
                    this.style.transform = '';
                    // Navigate to the link
                    if (link.startsWith('#')) {
                        // Handle internal links (you can customize this)
                        console.log('Navigating to:', link);
                        // Example: window.location.hash = link;
                        // Or scroll to element: document.querySelector(link)?.scrollIntoView();
                    } else {
                        // Handle external links
                        window.location.href = link;
                    }
                }, 100);
            }
        });
        
        // Add visual feedback for clickable columns
        column.style.cursor = 'pointer';
        
        // Optional: Add focus states for accessibility
        column.setAttribute('tabindex', '0');
        column.setAttribute('role', 'button');
        
        // Keyboard support
        column.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Keyboard navigation removed since columns now work with hover effects only

// Slideshow functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const totalSlides = 4;
    let isSlideshow = false;
    
    const columnsContainer = document.querySelector('.columns-container');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Check if we're in mobile view
    function isMobileView() {
        return window.innerWidth <= 991;
    }
    
    // Update slideshow state based on screen size
    function updateSlideshowState() {
        const wasSlideshowActive = isSlideshow;
        isSlideshow = isMobileView();
        
        if (isSlideshow && !wasSlideshowActive) {
            // Just entered mobile view
            currentSlide = 0;
            updateSlidePosition();
            updateIndicators();
        } else if (!isSlideshow && wasSlideshowActive) {
            // Just exited mobile view
            columnsContainer.style.transform = 'translateX(0%)';
        }
    }
    
    // Update slide position
    function updateSlidePosition() {
        if (!isSlideshow) return;
        
        const translateX = -currentSlide * 25; // Each slide is 25% of the container
        columnsContainer.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update indicator states
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to next slide
    function nextSlide() {
        if (!isSlideshow) return;
        
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
        updateIndicators();
    }
    
    // Go to previous slide
    function prevSlide() {
        if (!isSlideshow) return;
        
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
        updateIndicators();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (!isSlideshow) return;
        
        currentSlide = slideIndex;
        updateSlidePosition();
        updateIndicators();
    }
    
    // Event listeners for navigation
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    columnsContainer.addEventListener('touchstart', function(e) {
        if (!isSlideshow) return;
        startX = e.touches[0].clientX;
    });
    
    columnsContainer.addEventListener('touchend', function(e) {
        if (!isSlideshow) return;
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - go to next slide
                nextSlide();
            } else {
                // Swiped right - go to previous slide
                prevSlide();
            }
        }
    }
    
    // Keyboard navigation for slideshow
    document.addEventListener('keydown', function(e) {
        if (!isSlideshow) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
        }
    });
    
    // Initialize slideshow state
    updateSlideshowState();
    
    // Update on window resize
    window.addEventListener('resize', function() {
        updateSlideshowState();
    });
    
});

// TRIGGER LINKS

document.getElementById('homeLink2').addEventListener('click', function(e) {
    e.preventDefault();
    if (window.matchMedia("(max-width: 950px)").matches) {
        window.location.href = '../2D MOTION DESIGN/index.html'; // Mobile - skip loading
      } else {
        window.location.href = 'LOADING PAGES/LOADING PAGE_2DMOTION/loadingPage.html'; // Desktop - show loading
      }
});

document.getElementById('homeLink3').addEventListener('click', function(e) {
    e.preventDefault();
    if (window.matchMedia("(max-width: 950px)").matches) {
        window.location.href = '../3D VISUALIZER/index.html'; // Mobile - skip loading
      } else {
        window.location.href = 'LOADING PAGES/LOADING PAGE_3DVISUALIZER/loadingPage.html'; // Desktop - show loading
      }
});

document.getElementById('homeLink4').addEventListener('click', function(e) {
    e.preventDefault();
    if (window.matchMedia("(max-width: 950px)").matches) {
        window.location.href = '../PLAYGROUND/index.html'; // Mobile - skip loading
      } else {
        window.location.href = 'LOADING PAGES/LOADING PAGE_PLAYGROUND/loadingPage.html'; // Desktop - show loading
      }
});
