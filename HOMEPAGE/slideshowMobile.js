// Slideshow functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const totalSlides = 4;
    let isSlideshow = false;
    
    const columnsContainer = document.querySelector('.container');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Check if we're in mobile view
    function isMobileView() {
        return window.innerWidth <= 950;
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
        
        // Ensure videos are playing on mobile
        playVideosForCurrentSlide();
    }
    
    // Play videos for the current visible slide
    function playVideosForCurrentSlide() {
        const columns = document.querySelectorAll('.column');
        columns.forEach((column, index) => {
            const video = column.querySelector('.bg-video');
            if (video) {
                if (index === currentSlide) {
                    // Play the current slide's video
                    if (video.paused) {
                        video.play().catch(err => console.log('Video play failed:', err));
                    }
                } else {
                    // Pause other videos
                    if (!video.paused) {
                        video.pause();
                    }
                }
            }
        });
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
    
    // Ensure videos play on initial load
    playVideosForCurrentSlide();
    
    // Update on window resize
    window.addEventListener('resize', function() {
        updateSlideshowState();
        playVideosForCurrentSlide();
    });
    
});

// TRIGGER LINKS
