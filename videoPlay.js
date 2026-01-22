// Video Play on Click
const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach((videoContainer) => {
    const playButton = videoContainer.querySelector('.playButton');
    const bgVideo = videoContainer.querySelector('.bg-video');
    const thumbnail = videoContainer.querySelector('.thumbnail');

    if (!playButton || !bgVideo || !thumbnail) {
        console.warn('Missing video elements in container', videoContainer);
        return;
    }

    playButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click
        // Hide thumbnail and play button
        thumbnail.classList.add('hidden');
        playButton.classList.add('hidden');

        // Show and play video
        bgVideo.play();
    });

    // Reset to thumbnail (stops and resets)
    function resetToThumbnail() {
        thumbnail.classList.remove('hidden');
        playButton.classList.remove('hidden');
        bgVideo.pause();
        bgVideo.currentTime = 0;
    }

    bgVideo.addEventListener('ended', resetToThumbnail);

    // Click on VIDEO CONTAINER (not just video element) to pause/play
    videoContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click
        
        // Only handle if thumbnail is hidden (video is showing)
        if (thumbnail.classList.contains('hidden')) {
            if (bgVideo.paused) {
                bgVideo.play();
            } else {
                bgVideo.pause(); // Just pause, don't reset
            }
        }
    });

    // Click outside video area to stop and return to thumbnail
    document.addEventListener('click', (e) => {
        // Check if click is outside the video section
        if (!videoContainer.contains(e.target)) {
            // Only reset if video is currently playing
            if (!bgVideo.paused) {
                resetToThumbnail();
            }
        }
    });
});