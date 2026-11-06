(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const menuToggle = header.querySelector('.header-menu-toggle');
  const navigation = header.querySelector('nav');
  const mobile = window.matchMedia('(max-width: 760px)');
  const setMenuOpen = (open, restoreFocus = false) => {
    header.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) menuToggle.focus();
  };
  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      setMenuOpen(false, true);
    }
  });
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenuOpen(false);
  });
  mobile.addEventListener('change', () => setMenuOpen(false));
})();
