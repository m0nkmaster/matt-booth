(function () {
  var images = document.querySelectorAll('.post img');
  if (!images.length || !window.HTMLDialogElement) return;

  var dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('aria-label', 'Expanded article image');
  dialog.innerHTML = '<button type="button" class="image-lightbox-close" aria-label="Close expanded image">Close</button><img alt="">';
  document.body.appendChild(dialog);

  var fullImage = dialog.querySelector('img');
  var closeButton = dialog.querySelector('button');

  function close() { dialog.close(); }

  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) close();
  });

  images.forEach(function (image) {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', 'Open image full screen');

    function open() {
      fullImage.src = image.currentSrc || image.src;
      fullImage.alt = image.alt;
      dialog.showModal();
    }

    image.addEventListener('click', open);
    image.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
}());
