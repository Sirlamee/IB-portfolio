const overlay = document.querySelector('.transition-overlay');
const clickableDivs = document.querySelectorAll('[data-link]');

clickableDivs.forEach(div => {
  div.addEventListener('click', (e) => {
    const targetUrl = div.getAttribute('data-link');
    if (!targetUrl) return;
    
    e.preventDefault();
    e.stopPropagation(); // CRITICAL: Stop other handlers from firing
    
    transitionToPage(targetUrl);
  });
});

function transitionToPage(targetUrl) {
  overlay.classList.add('slide-in');
  
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 3600); // 600ms slide-in + 3000ms wait
}

window.addEventListener('pageshow', (event) => {
  overlay.classList.remove('slide-in', 'slide-out');
});