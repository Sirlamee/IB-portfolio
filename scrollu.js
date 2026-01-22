
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
        
    } 
});






