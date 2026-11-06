(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.weddings > .section-index, .wedding-intro > div, .wedding-films-heading, ' +
    '.wedding-story, .couples-heading, .couples-track, ' +
    '.release-heading, .release-artwork, .release-copy, ' +
    '.about > .section-index, .about-content > *, .photos-heading, ' +
    '.photo-grid > figure, .connect'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0, rootMargin: '0px 0px -45px 0px'});

  targets.forEach((element) => {
    // Keep anything already on screen visible when loading or restoring a scroll position.
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });

  const showAll = () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    targets.forEach((element) => element.classList.add('is-visible'));
  };
  reducedMotion.addEventListener('change', showAll);
})();
