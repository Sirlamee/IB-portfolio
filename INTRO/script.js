        let ticking = false;
        let fadeMode = 'linear'; 

        function updateSections() {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const maxScroll = viewportHeight; // Scroll distance for full reveal
            
            // Calculate progress (0 to 1)
            const progress = Math.min(scrolled / maxScroll, 1);
            
            // Update second section position
            const secondSection = document.querySelector('.second-section');
            const translateY = 100 - (progress * 100); // From 100% to 0%
            secondSection.style.transform = `translateY(${translateY}%)`;
            
            // Calculate fade for first section based on selected mode
            let fadeProgress = progress;
            
            switch(fadeMode) {
                case 'ease-out':
                    // Ease-out: starts fast, ends slow
                    fadeProgress = 1 - Math.pow(1 - progress, 3);
                    break;
                case 'ease-in-out':
                    // Ease-in-out: slow start and end, fast middle
                    fadeProgress = progress < 0.5 
                        ? 2 * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    break;
                default:
                    // Linear fade
                    fadeProgress = progress;
            }
            
            // Apply fade to first section (from 1 to 0.2 opacity)
            const firstSection = document.querySelector('.first-section');
            const opacity = Math.max(1 - fadeProgress * 0.8, 0.2); // Fade from 100% to 20%
            firstSection.style.opacity = opacity;
            
            // // Update progress indicators
            // document.getElementById('progress').textContent = Math.round(progress * 100) + '%';
            // document.getElementById('opacity').textContent = Math.round(opacity * 100) + '%';
            
            // // Update progress bar
            // document.querySelector('.progress-bar').style.width = (progress * 100) + '%';
            
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateSections);
                ticking = true;
            }
        }

        // Optimized scroll listener
        window.addEventListener('scroll', requestTick);

        // Keyboard controls for different fade modes
        document.addEventListener('keydown', (e) => {
            let modeChanged = false;
            
            switch(e.key) {
                case '1':
                    fadeMode = 'linear';
                    modeChanged = true;
                    break;
                case '2':
                    fadeMode = 'ease-out';
                    modeChanged = true;
                    break;
                case '3':
                    fadeMode = 'ease-in-out';
                    modeChanged = true;
                    break;
            }
            
            if (modeChanged) {
                updateSections(); // Apply new fade mode immediately
                
                // Update UI to show current mode
                // const fadeInfo = document.querySelector('.fade-info');
                // fadeInfo.innerHTML = `Fade mode: ${fadeMode} (Keys: 1=linear, 2=ease-out, 3=ease-in-out) | Opacity: <span id="opacity">${Math.round(document.querySelector('.first-section').style.opacity * 100) || 100}%</span>`;
            }
        });

        // Add instructions
        // document.addEventListener('DOMContentLoaded', () => {
        //     const fadeInfo = document.querySelector('.fade-info');
        //     fadeInfo.innerHTML = `Fade mode: ${fadeMode} (Keys: 1=linear, 2=ease-out, 3=ease-in-out) | Opacity: <span id="opacity">100%</span>`;
        // });

        // Initialize
        updateSections();


        // LOADING OVERLAY

        // TRIGGER LINK

          document.getElementById('triggerLink').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Debug info
            const info = `innerWidth: ${window.innerWidth}\nscreen.width: ${screen.width}\nmatchMedia: ${window.matchMedia("(max-width: 950px)").matches}\nuser agent: ${navigator.userAgent.includes('Mobile')}`;
                        
            if (window.matchMedia("(max-width: 950px)").matches) {
              window.location.replace('../HOMEPAGE/index.html');
            } else {
              window.location.replace('LOADING PAGE/loadingPage.html');
            }
        });