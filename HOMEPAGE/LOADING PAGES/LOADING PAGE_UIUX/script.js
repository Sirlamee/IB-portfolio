// Auto-start the loading process when page loads
window.addEventListener('load', function() {
    const video = document.getElementById('loadingVideo');
    video.play();

    let counter = 1;
    const duration = 8000;
    const progressCounter = document.getElementById('counter');

    const delayBetweenNumbers = duration / 100; // 50ms between each number

    function updateCounter(number) {
        if (number < 10) {
            return '00' + number; // 001
        } else if (number < 100) {
            return '0' + number; // 010
        } else {
            return number.toString(); // 100
        }
    }

    progressCounter.textContent = updateCounter(counter); 

    const interval = setInterval(() => {
        counter++; 

        progressCounter.textContent = updateCounter(counter);

        if (counter >= 100) {
            clearInterval(interval);
            window.location.href = '../../../UIUX/index.html';
        }
    }, delayBetweenNumbers);
    
    // let progress = 0;
    // const duration = 5000; // 5 seconds
    // const progressBar = document.getElementById('progressBar');
    
    // const interval = setInterval(() => {
    //     progress += (100 / (duration / 100));
    //     progressBar.style.width = progress + '%';
        
    //     if (progress >= 100) {
    //         clearInterval(interval);
    //         window.location.href = 'next-page.html';
    //     }
    // }, 100);
});