const MONTHS = [ '01', '02', '03', '05' , '06' ,' 07', '08' , '09' , '10', '11' , '12' ];
const CARDS = {
  'visa': {
    front: './images/cc__visa--front.png',
    back: './images/cc__visa--back.png',
    alt: 'visa'
  },
  'mastercard': {
    front: './images/cc__mastercard--front.png',
    back: './images/cc__mastercard--back.png',
    alt: 'mastercard'
  },
  'american': {
    front: './images/cc__american--front.png',
    back: './images/cc__american--back.png',
    alt: 'american'
  },
  'discover': {
    front: './images/cc__discover--front.png',
    back: './images/cc__discover--back.png',
    alt: 'discover'
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const expirationYearRef = document.getElementById('expirationYear');
  const expirationDateRef = document.getElementById('expirationDate');

  function populateSelects() {
    const currentYear = new Date().getFullYear();

    expirationDateRef.innerHTML = MONTHS.map(el => (
        `<option value="${el}">${el}</option>`
      )).join('');

    expirationYearRef.innerHTML = [...Array(10).keys()].map(el => (
      `<option value="${el + currentYear}">${el + currentYear}</option>`
    )).join('');
  }

  function setCardImg(startNumber) {
    let cardInfo;
    switch (startNumber) {
      case 3:
        cardInfo = CARDS.american;
        break;
      case 4:
        cardInfo = CARDS.visa;
        break;
      case 5:
        cardInfo = CARDS.mastercard;
        break;
      default:
        cardInfo = CARDS.discover;
        break;
    }

    document.getElementById('cover-front').setAttribute('src', cardInfo.front);
    document.getElementById('cover-front').setAttribute('alt', `${cardInfo.alt} front cover`);
    document.getElementById('cover-back').setAttribute('src', cardInfo.back);
    document.getElementById('cover-back').setAttribute('alt', `${cardInfo.alt} back cover`);
  }

  document.getElementById('cardNumber').addEventListener('input', function() {
    if (this.value.length <= 16) {
      document.querySelector('.card-number').textContent = this.value.replace(/.{4}/g, '$& ');

      if (this.value.length === 1) {
        setCardImg(Number(this.value.charAt()) || 0);
      }
    }
  });

  document.getElementById('cardName').addEventListener('input', function() {
    document.querySelector('.card-name').textContent = this.value;
    document.querySelector('.card-signature').textContent = this.value;
  });

  document.getElementById('cvv').addEventListener('input', function() {
    if (this.value.length <= 3) {
      document.querySelector('.card-cvv').textContent = this.value;
    }
  });

  document.getElementById('cvv').addEventListener('focus', function() {
    document.querySelector('.section__img-container').classList.add('section__img-container--flipped');
  });

  document.getElementById('cvv').addEventListener('blur', function() {
    document.querySelector('.section__img-container').classList.remove('section__img-container--flipped');
  });

  expirationDateRef.addEventListener('change', function() {
    console.log(this.value);
    document.querySelector('.card-expiration').textContent = `${this.value}/${expirationYearRef.value}`;
  });

  expirationYearRef.addEventListener('change', function() {
    console.log(this.value);
    document.querySelector('.card-expiration').textContent = `${expirationDateRef.value}/${this.value}`;
  });

  populateSelects();
});
