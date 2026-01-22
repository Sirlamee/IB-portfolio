    // Create rotating text
    const text = "Click play icon to watch about me video ";
    const rotatingTextContainer = document.getElementById('rotatingText');
    const totalChars = text.length;
    
    for (let i = 0; i < totalChars; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      const rotation = (360 / totalChars) * i;
      span.style.transform = `rotate(${rotation}deg)`;
      rotatingTextContainer.appendChild(span);
    }

    // Video functionality
    const playContainer = document.getElementById('playContainer');
    const videoOverlay = document.getElementById('videoOverlay');
    const video = document.getElementById('video');

    // Open video overlay when play button is clicked
    playContainer.addEventListener('click', () => {
      videoOverlay.classList.add('active');
      playContainer.classList.add('hidden');
      video.play();
    });

    // Close video when clicking outside the video
    videoOverlay.addEventListener('click', (e) => {
      if (e.target === videoOverlay) {
        closeVideo();
      }
    });

    // Pause when clicking on the video itself
    // video.addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   if (video.paused) {
    //     video.play();
    //   } else {
    //     video.pause();
    //   }
    // });

    // Close video function
    function closeVideo() {
      videoOverlay.classList.remove('active');
      playContainer.classList.remove('hidden');
      video.pause();
      video.currentTime = 0;
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoOverlay.classList.contains('active')) {
        closeVideo();
      }
    });

    // Optional: Close when video ends
    video.addEventListener('ended', () => {
      closeVideo();
    });
