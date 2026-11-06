(() => {
  const gallery = document.querySelector('.couples-gallery');
  if (!gallery) return;
  const track = gallery.querySelector('.couples-track');
  const slides = [...track.children];
  const controls = gallery.querySelector('.couples-controls');
  const previous = gallery.querySelector('.carousel-prev');
  const next = gallery.querySelector('.carousel-next');
  const status = gallery.querySelector('.carousel-status');
  let index = 0;
  const update = () => {
    const position = track.scrollLeft;
    index = slides.reduce((nearest, slide, i) =>
      Math.abs(slide.offsetLeft - track.offsetLeft - position) <
      Math.abs(slides[nearest].offsetLeft - track.offsetLeft - position) ? i : nearest, 0);
    previous.disabled = position <= 2;
    next.disabled = position >= track.scrollWidth - track.clientWidth - 2;
    status.textContent = `Photo ${index + 1} of ${slides.length}`;
  };
  const move = (direction) => {
    const target = Math.max(0, Math.min(slides.length - 1, index + direction));
    track.scrollTo({left: slides[target].offsetLeft - track.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  track.addEventListener('scroll', update, {passive: true});
  window.addEventListener('resize', update);
  controls.hidden = false;
  update();
})();
