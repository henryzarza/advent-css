document.addEventListener("DOMContentLoaded", () => {  
  const items = document.querySelectorAll('.carousel__showcase-item');
  const mainImage = document.querySelector('#main-image');
  const authorLink = document.querySelector('#author-link');

  function showSelectedImage() {
    mainImage.setAttribute('src', this.querySelector('img').getAttribute('src'));
    authorLink.setAttribute('href', this.dataset.link || '#');
    authorLink.innerHTML = this.dataset.author || 'Anonymous';
    document.querySelector('.carousel__showcase-item--selected').classList.remove('carousel__showcase-item--selected');
    this.classList.add('carousel__showcase-item--selected');
  }

  function selectElement(isNext) {
    const currentIndex = [...items].findIndex(item => item.classList.contains('carousel__showcase-item--selected'));
    items[currentIndex].classList.remove('carousel__showcase-item--selected');

    let newIndex;
    if (isNext) {
      newIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
    }

    const selected = items[newIndex];
    mainImage.setAttribute('src', selected.querySelector('img').getAttribute('src'));
    authorLink.setAttribute('href', selected.dataset.link || '#');
    authorLink.innerHTML = selected.dataset.author || 'Anonymous';
    selected.classList.add('carousel__showcase-item--selected');
    selected.scrollIntoView({ behavior: "smooth" });
  }

  document.querySelector('#prev-button').addEventListener('click', () => selectElement(false));

  document.querySelector('#next-button').addEventListener('click', () => selectElement(true));

  items.forEach(item => item.addEventListener('click', showSelectedImage));
});
