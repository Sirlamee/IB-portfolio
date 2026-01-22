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
