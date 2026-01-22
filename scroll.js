// horizontal scroll functionality

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container-of-sections');
    const dragIndicator = document.querySelector('.drag-indicator');
    
    if (container) {
        // Enable horizontal scrolling with mouse wheel (desktop only)
        container.addEventListener('wheel', function(e) {
            // Only work on desktop (> 950px)
            if (window.innerWidth <= 950) return;
            
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

        // Handle drag indicator visibility (desktop only)
        container.addEventListener('scroll', function() {
            if (window.innerWidth <= 950) return;
            
            if (container.scrollLeft > 50) {
                dragIndicator.classList.add('hidden');
            } else {
                dragIndicator.classList.remove('hidden');
            }
        });
        
    } 
});