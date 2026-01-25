// Desktop-only hover functionality
if (window.innerWidth > 950) {
    const columns = document.querySelectorAll('.column');
    let currentCursorX = 0;
    let lastHoveredColumn = 0;
    
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
            case 0:
                return 'slide-from-right';
            case 1:
                if (cursorPercentage < 25) {
                    return 'slide-from-left';
                } else if (cursorPercentage > 50) {
                    return 'slide-from-right';
                } else {
                    return 'slide-from-left';
                }
            case 2:
                if (cursorPercentage < 50) {
                    return 'slide-from-left';
                } else if (cursorPercentage > 75) {
                    return 'slide-from-right';
                } else {
                    return 'slide-from-left';
                }
            case 3:
                return 'slide-from-left';
            default:
                return 'slide-from-left';
        }
    }
    
    columns.forEach((column, index) => {
        const video = column.querySelector('.bg-video');
        
        column.addEventListener('mouseenter', () => {
            // Remove active class from all columns
            columns.forEach(col => col.classList.remove('active'));
            
            // Add active class to hovered column
            column.classList.add('active');
            
            // Update last hovered column
            lastHoveredColumn = index;
            
            const cursorPercentage = getCursorPercentage();
            const slideDirection = getSlideDirection(index, cursorPercentage);
            
            // Remove any existing slide classes
            column.classList.remove('slide-from-left', 'slide-from-right');
            
            // Add the appropriate slide direction class
            column.classList.add(slideDirection);
            
            // Play video
            if (video && video.paused) {
                video.play();
            }
        });
        
        column.addEventListener('mouseleave', () => {
            // Remove slide classes
            column.classList.remove('slide-from-left', 'slide-from-right');
        });
    });
    
    // When mouse leaves all columns, keep last hovered column active
    const container = document.querySelector('.container');
    container.addEventListener('mouseleave', () => {
        // Remove active from all
        columns.forEach(col => col.classList.remove('active'));
        
        // Add active to last hovered column
        columns[lastHoveredColumn].classList.add('active');
        
        // Pause all videos except the active one
        columns.forEach((col, idx) => {
            const video = col.querySelector('.bg-video');
            if (idx !== lastHoveredColumn && video && !video.paused) {
                video.pause();
            } else if (idx === lastHoveredColumn && video && video.paused) {
                video.play();
            }
        });
    });
}