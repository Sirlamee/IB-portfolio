document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.transition-overlay');
    const clickableDivs = document.querySelectorAll('[data-link]');

    clickableDivs.forEach(div => {
        div.style.cursor = 'pointer';
        div.setAttribute('tabindex', '0');
        div.setAttribute('role', 'button');
        
        div.addEventListener('click', (e) => {
            const targetUrl = div.getAttribute('data-link');
            if (!targetUrl) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            // Click animation
            div.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                div.style.transform = '';
                
                // Slide in
                overlay.classList.add('slide-in');
                
                // Wait, then navigate
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 1600); // 600ms slide-in + 1000ms wait
            }, 100);
        });
        
        // Keyboard support
        div.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                div.click();
            }
        });
    });
});

//  New page loads, then slide out
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    
    // Check if we just navigated (overlay should be covering screen)
    if (overlay.classList.contains('slide-in')) {
        // Small delay to ensure new page is rendered
        setTimeout(() => {
            overlay.classList.remove('slide-in');
            overlay.classList.add('slide-out');
            
            // Clean up after slide-out completes
            setTimeout(() => {
                overlay.classList.remove('slide-out');
            }, 600); // Match slide-out animation duration
        }, 100); // Small delay for page to render
    }
});

// Reset overlay on back button
window.addEventListener('pageshow', (event) => {
    const overlay = document.querySelector('.transition-overlay');
    if (event.persisted) {
        overlay.classList.remove('slide-in', 'slide-out');
    }
});