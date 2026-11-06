(() => {
  const header = document.querySelector('.site-header');
  const mainBookingButton = document.querySelector('.hero-copy .booking-cta');
  if (!header || !mainBookingButton) return;
  let queued = false;
  const update = () => {
    header.classList.toggle('past-main-booking',
      mainBookingButton.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom);
    queued = false;
  };
  const scheduleUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  update();
})();
