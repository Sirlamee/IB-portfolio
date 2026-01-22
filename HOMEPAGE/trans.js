const overlay = document.querySelector('.transition-overlay');
const clickableDivs = document.querySelectorAll('[data-link]'); // Select all elements with data-link

clickableDivs.forEach(div => {
  div.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = div.getAttribute('data-link');
    transitionToPage(targetUrl);
  });
});

function transitionToPage(targetUrl) {
  // Start slide-in animation
  overlay.classList.add('slide-in');
  
  // After 3 seconds of overlay covering the screen, start slide-out and navigate
  setTimeout(() => {
    overlay.classList.remove('slide-in');
    overlay.classList.add('slide-out');
    
    // Navigate after slide-out animation completes
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 600); // 600ms for slide-out animation
  }, 3000); // 3 seconds of overlay
}

// Optional: Show transition when coming from another page
window.addEventListener('pageshow', (event) => {
  // If page is loaded from cache (back button), reset overlay
  if (event.persisted) {
    overlay.classList.remove('slide-in');
  }
});