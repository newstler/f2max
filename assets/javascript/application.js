document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');

  function attemptPlay() {
    videos.forEach(video => {
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');

      video.play().catch(e => {
        console.log("Autoplay attempt failed, will retry");
      });
    });
  }

  attemptPlay();

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

  window.addEventListener('focus', attemptPlay);

  document.addEventListener('click', () => {
    attemptPlay();
  });

  document.addEventListener('touchstart', () => {
    attemptPlay();
  });

// Countdown timer code
  function updateCountdown() {
    const countdownElement = document.getElementById('countdown');

    // Set the target date and time to Moscow time zone (GMT+3)
    const targetDate = new Date('2024-07-11T19:00:00+03:00');

    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Adding leading zeros if the values are less than 10
      const daysStr = days < 10 ? '0' + days : days;
      const hoursStr = hours < 10 ? '0' + hours : hours;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      const secondsStr = seconds < 10 ? '0' + seconds : seconds;

      countdownElement.innerHTML = `${daysStr ? daysStr + ":" : null}${hoursStr}:${minutesStr}:${secondsStr}`;
    } else {
      countdownElement.innerHTML = "The event has started!";
    }
  }

  setInterval(updateCountdown, 1000);
});
