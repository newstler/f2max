document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');

  function attemptPlay() {
    videos.forEach(video => {
      // Ensure the video is muted and has necessary attributes for Safari autoplay
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');

      // Attempt to play the video
      video.play().catch(e => {
        console.log("Autoplay attempt failed, will retry");
      });
    });
  }

  // Attempt to play immediately
  attemptPlay();

  // Retry playing every second for the first 10 seconds
  let attempts = 0;
  const maxAttempts = 10;
  const interval = setInterval(() => {
    if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.log("Max autoplay attempts reached");
    } else {
      attemptPlay();
      attempts++;
    }
  }, 1000);

  // Additionally, try to play on window focus, as some browsers allow autoplay after the tab gains focus
  window.addEventListener('focus', attemptPlay);

  // Add an event listener for user interaction to play videos
  document.addEventListener('click', () => {
    attemptPlay();
  });

  document.addEventListener('touchstart', () => {
    attemptPlay();
  });
});
