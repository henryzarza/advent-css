const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '[`!@#$%^&*()_+\°´¨-={};:"|,.<>/?~]';

document.addEventListener("DOMContentLoaded", () => {
  const inputRange = document.querySelector('.input-range');
  const inputPassword = document.querySelector('.input-container input');
  const checkboxes = document.querySelectorAll('.checkboxes-container input');
  let maxLength = 12;
  let requirements = {
    symbols: false,
    numbers: false,
    lowercase: false,
    uppercase: false,
    similar: false,
  };

  function createPassword() {
    let result = '';
    let characters = '';
    let counter = 0;
    
    if (requirements.symbols) {
      characters += SYMBOLS;
    }
    if (requirements.lowercase) {
      characters += CHARACTERS.toLowerCase();
    }
    if (requirements.numbers) {
      characters += NUMBERS;
    }
    if (requirements.uppercase) {
      characters += CHARACTERS.toUpperCase();
    }

    while (counter < maxLength) {
      const newCharacter = characters.charAt(Math.floor(Math.random() * characters.length));

      if (requirements.similar) {
        if (!result.includes(newCharacter)) {
          result += newCharacter;
          counter += 1;
        }
      } else {
        result += newCharacter;
        counter += 1;
      }
    }
    inputPassword.value = result;
  }

  checkboxes.forEach(checkbox => checkbox.addEventListener('change', function() {
    requirements[this.value] = this.checked;
    createPassword();
  }));
  
  inputRange.addEventListener('input', (event) => {
    maxLength = Number(event.target.value) || 12;
    inputRange.nextSibling.nextSibling.textContent = `${maxLength} characters`;
    createPassword();
  });

  document.getElementById('copyText').addEventListener('click', () => {
    navigator.clipboard.writeText(inputPassword.value);
    const inputContainer = document.querySelector('.input-container');
    inputContainer.classList.add('copied');

    setTimeout(() => {
      inputContainer.classList.remove('copied');
    }, 1000);
  });
});
