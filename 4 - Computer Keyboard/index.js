const KEYS_CODES = [ 220, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 222, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 187, 39, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 219, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 189, 16 ];

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.querySelector('audio');

  function addHightlightToKey() {
    const index = Math.floor(Math.random() * KEYS_CODES.length);
    document.querySelector(`.keyboard__key[data-key="${KEYS_CODES[index]}"]`).classList.add('keyboard__key--highlight');
  }
  
  function removeTransition(event) {
    if (!this.classList || event.propertyName !== 'transform') return;
  
    this.classList.remove('keyboard__key--active');
  }

  function typingKey(event) {
    const key = document.querySelector(`.keyboard__key[data-key="${event.keyCode}"]`);

    if (audio && key) {
      audio.currentTime = 0;
      audio.play();
      key.classList.add('keyboard__key--active');

      if (key.classList.contains('keyboard__key--highlight')) {
        key.classList.remove('keyboard__key--highlight');
        addHightlightToKey();
      }
    }
  }

  window.addEventListener('keydown', typingKey);

  document.querySelectorAll('.keyboard__key')
    .forEach(element => element.addEventListener('transitionend', removeTransition));

  addHightlightToKey();
});
