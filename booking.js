(() => {
  const dialog = document.querySelector('#booking-dialog');
  const trigger = document.querySelector('[data-open-booking]');
  if (!dialog || !trigger) return;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('booking-open');
  });
  dialog.querySelector('.booking-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('booking-open');
    trigger.focus();
  });
})();
