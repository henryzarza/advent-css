const ITEMS = [
  {
    id: 1,
    title: 'French Fries with Ketchup',
    price: 4.50,
    imgSrc: './images/plate__french-fries.png',
    bgColor: 'rgba(122, 179, 243, 0.2)'
  },
  {
    id: 2,
    title: 'Salmon and Vegetables',
    price: 10.99,
    imgSrc: './images/plate__salmon-vegetables.png',
    bgColor: 'rgba(233, 121, 178, 0.2)'
  },
  {
    id: 3,
    title: 'Spaghetti with Meat Sauce',
    price: 5.90,
    imgSrc: './images/plate__spaghetti-meat-sauce.png',
    bgColor: 'rgba(215, 215, 249, 0.2)'
  },
  {
    id: 4,
    title: 'Bacon with Eggs',
    price: 3.50,
    imgSrc: './images/plate__bacon-eggs.png',
    bgColor: 'rgba(120, 247, 187, 0.2)'
  },
  {
    id: 5,
    title: 'Chickend with Salad',
    price: 7.75,
    imgSrc: './images/plate__chicken-salad.png',
    bgColor: 'rgba(233, 121, 178, 0.6)'
  },
  {
    id: 6,
    title: 'Fish sticks with fries',
    price: 6.30,
    imgSrc: './images/plate__fish-sticks-fries.png',
    bgColor: '#D7D7F9'
  },
  {
    id: 7,
    title: 'Ravioli',
    price: 5.80,
    imgSrc: './images/plate__ravioli.png',
    bgColor: 'rgba(233, 121, 178, 0.2)'
  },
  {
    id: 8,
    title: 'Tortellini',
    price: 6.50,
    imgSrc: './images/plate__tortellini.png',
    bgColor: 'rgb(222 254 240 / 65%)'
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let cart = [];

  removeFromCart = (id) => {
    if (id) {
      const index = cart.findIndex(el => el.id === id);
      
      if (index !== -1) {
        cart[index].quantity -= 1;

        if (cart[index].quantity < 0) {
          cart.splice(index, 1);

          const $itemButton = document.querySelector(`#item__button--${id}`);
          $itemButton.classList.remove('added');
          $itemButton.classList.innerHTML = 'Add to Cart';
        }

        renderCartItemsIntoScreen();
      }
    }
  }

  renderCartItemsIntoScreen = () => {
    const $cartElement = document.querySelector('#cart-elements');

    if (cart.length === 0) {
      $cartElement.innerHTML = '<p class="subtitle" id="">Your cart is empty.</p>';
    } else {
      const subtotal = cart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0);
      const tax = 0.0975 * subtotal;
      const total = tax + subtotal;

      const cartElementsHTML = cart.map((item, index) => (
        `
          <div class="cart-item ${index === cart.length - 1 ? 'cart-item--last' : ''}">
            <div class="cart-item__img">
              <img src="${item.imgSrc}" alt="${item.name}" />
              <span>${item.quantity}</span>
            </div>
            <div class="cart-item__content">
              <h6 class="cart-item__description">${item.name}</h6>
              <h5 class="cart-item__price">$${item.price}</h5>
              <div class="cart-item__footer">
                <div class="cart-item__buttons">
                  <button class="cart-item__button" onClick="removeFromCart(${item.id})">
                    <img src="./images/chevron.svg" alt="Chevron icon">
                  </button>
                  <span>${item.quantity}</span>
                  <button class="cart-item__button" onClick="addToCart(${item.id})">
                    <img src="./images/chevron.svg" alt="Chevron icon">
                  </button>
                </div>
                <h5 class="cart-item__total">$${(item.quantity * item.price).toFixed(2)}</h5>
              </div>
            </div>
          </div>
        `
      ))
      .join('');

      $cartElement.innerHTML = cartElementsHTML + `
        <div class="cart-info">
          <h4 class="cart-info__title">Subtotal: <span>$${subtotal.toFixed(2)}</span></h4>
          <h4 class="cart-info__title">Tax: <span>$${tax.toFixed(2)}</span></h4>
          <h4 class="cart-info__title cart-info__title--total">Total: <span>$${total.toFixed(2)}</span></h4>
        </div>
      `;
    }
  }

  addToCart = (id) => {
    if (id) {
      const index = cart.findIndex(el => el.id === id);
      const item = ITEMS.find(el => el.id === id);
      
      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ id, price: item.price, imgSrc: item.imgSrc, name: item.title, quantity: 1 });

        const $itemButton = document.querySelector(`#item__button--${id}`);
        $itemButton.classList.add('added');
        $itemButton.innerHTML = '✔ In Cart';
      }

      renderCartItemsIntoScreen()
    }
  }

  renderItemsIntoScreen = () => {
    document.querySelector('#items-container').innerHTML =
      ITEMS.map(item => `
        <div class="item" style="--bg-color: ${item.bgColor}">
          <img class="item__img" src="${item.imgSrc}" alt="${item.title}" />
          <div class="item__content">
            <h6 class="item__description">${item.title}</h6>
            <h5 class="item__price">$${item.price}</h5>
            <button id="item__button--${item.id}" class="item__button" onClick="addToCart(${item.id})">
              Add to Cart
            </button>
          </div>
        </div>
      `)
      .join('');
  }

  renderItemsIntoScreen();

});
