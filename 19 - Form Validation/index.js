function trimInputValue(value) {
  return value.trim();
}

// Function to validate the name input
function validateNameInput(name) {
  name = trimInputValue(name);
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  return name.length >= 2 && alphanumericRegex.test(name);
}

// Function to validate the email input
function validateEmailInput(email) {
  email = trimInputValue(email);
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  return emailRegex.test(email);
}

// Function to validate the password input
function validatePasswordInput(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  return passwordRegex.test(password);
}

// Function to validate the repeatPassword input
function validateRepeatPasswordInput(password, repeatPassword) {
  return password === repeatPassword;
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get form inputs values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate inputs
  const isNameValid = validateNameInput(name);
  const isEmailValid = validateEmailInput(email);
  const isPasswordValid = validatePasswordInput(password);
  const isRepeatPasswordValid = validateRepeatPasswordInput(password, confirmPassword);

  // Display validation errors or submit the form
  if (!isNameValid || !isEmailValid || !isPasswordValid || !isRepeatPasswordValid) {
    console.error('Missing required fields');
  } else {
    console.log('✅ Form is valid');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('form').addEventListener('submit', handleSubmit);

  document.querySelectorAll('.form__element input').forEach(input => 
    input.addEventListener('blur', function() {
      let isValid;

      switch (this.name) {
        case 'name':
          isValid = validateNameInput(this.value);
          break;
        case 'email':
          isValid = validateEmailInput(this.value);
          break;
        case 'password':
          isValid = validatePasswordInput(this.value);
          break;
        case 'confirmPassword':
          isValid = validateRepeatPasswordInput(document.querySelector('#password').value, this.value);
          break;
      }

      const validation = this.parentElement.querySelector('.form__validation-message');
      const imgValidation = validation.querySelector('img');

      if (isValid) {
        this.parentElement.classList.add('form__element--valid');
        this.parentElement.classList.remove('form__element--error');
        imgValidation.setAttribute('src', './images/success.svg');
        imgValidation.setAttribute('alt', 'success');
      } else {
        this.parentElement.classList.remove('form__element--valid');
        this.parentElement.classList.add('form__element--error');
        imgValidation.setAttribute('src', './images/error.svg');
        imgValidation.setAttribute('alt', 'error');
      }
    })
  );

  document.querySelectorAll('.form__icon').forEach(button => 
    button.addEventListener('click', function () {
      const img = this.querySelector('img');
      const input = this.nextElementSibling;
      
      if (input.type === 'password') {
        img.setAttribute('src', './images/hide.svg');
        img.setAttribute('alt', 'hide');
        input.setAttribute('type', 'text');
      } else {
        img.setAttribute('src', './images/show.svg');
        img.setAttribute('alt', 'show');
        input.setAttribute('type', 'password');
      }
    })
  );
});
