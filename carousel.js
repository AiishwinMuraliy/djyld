(() => {
  const gallery = document.querySelector('.couples-gallery');
  if (!gallery) return;
  const track = gallery.querySelector('.couples-track');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slides = [...track.children];
  let hovering = false;
  let interacting = false;
  let previousTime = null;
  let position = track.scrollLeft;
  let frame;
  let touching = false;
  let resumeTimer;
  let touchPaused = false;

  // Surround the starting set with copies so swipes work in either direction.
  for (let copy = 0; copy < 2; copy++) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      track.append(clone);
    });
  }
  const loopWidth = () => track.children[slides.length].offsetLeft - slides[0].offsetLeft;
  const animate = (time) => {
    if (previousTime !== null && !motion.matches && !hovering && !interacting && !touchPaused) {
      // Move 24 pixels per second, independent of display refresh rate.
      position += Math.min(time - previousTime, 50) * 0.024;
      const width = loopWidth();
      if (width > 0) position = width + ((position - width) % width + width) % width;
      track.scrollLeft = position;
    } else {
      position = track.scrollLeft;
    }
    previousTime = time;
    frame = requestAnimationFrame(animate);
  };
  track.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') hovering = true;
  });
  track.addEventListener('pointerleave', () => { hovering = false; });
  track.addEventListener('focus', () => { interacting = track.matches(':focus-visible'); });
  track.addEventListener('blur', () => { interacting = false; });
  track.addEventListener('keydown', () => { interacting = true; });
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') interacting = true;
  });
  const release = () => { interacting = track.matches(':focus-visible'); };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  const resumeAfterSwipe = () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      touchPaused = false;
      position = track.scrollLeft;
    }, 1200);
  };
  track.addEventListener('touchstart', () => {
    touching = true;
    touchPaused = true;
    clearTimeout(resumeTimer);
  }, { passive: true });
  const finishSwipe = () => {
    touching = false;
    resumeAfterSwipe();
  };
  track.addEventListener('touchend', finishSwipe, { passive: true });
  track.addEventListener('touchcancel', finishSwipe, { passive: true });
  track.addEventListener('scroll', () => {
    // Wait for native momentum scrolling to settle before resuming autoplay.
    if (touchPaused && !touching) resumeAfterSwipe();
  }, { passive: true });
  const sizeStrip = () => {
    track.style.setProperty('--strip-width', `${document.documentElement.clientWidth}px`);
  };
  sizeStrip();
  position = loopWidth();
  track.scrollLeft = position;
  window.addEventListener('resize', () => {
    sizeStrip();
    const width = loopWidth();
    if (width > 0) track.scrollLeft = position = width + ((position - width) % width + width) % width;
  });
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(frame);
    previousTime = null;
    if (!document.hidden) frame = requestAnimationFrame(animate);
  });
  frame = requestAnimationFrame(animate);
})();
