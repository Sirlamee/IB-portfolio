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

