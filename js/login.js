document.addEventListener('DOMContentLoaded', function () {
   const form = document.querySelector('.form-container');
   const accountUserNameInput = document.getElementById('loginUserName');
   const loginPasswordInput = document.getElementById('loginPassword');
   const loginButton = document.getElementById('loginButton');
   const resetPasswordButton = document.getElementById('resetPasswordButton');
   const menuPagePath = './menu.html'; // Define the path to menu.html
   const resetPasswordPath = './reset-password.html'; // Define the path to reset-password.html

   function displayError(inputField, message) {
      const errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      errorElement.textContent = message;

      inputField.parentElement.insertBefore(errorElement, inputField.nextSibling);
   }

   function clearErrors() {
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(errorElement => errorElement.remove());

      const inputFields = document.querySelectorAll('.input-error');
      inputFields.forEach(inputField => inputField.classList.remove('input-error'));
   }

   const requiredFields = [
      accountUserNameInput
    ];
    
    const fieldDisplayNames = {
      email: 'Email',
      password: 'Password'
    };

   function validateForm() {
      clearErrors();

      const formData = {
         Email: accountUserNameInput.value.trim(),
         Password: loginPasswordInput.value.trim()
      };

      let isValid = true;

      const storedEmail = localStorage.getItem('storedUserName');
      if (formData.Email === '') {
         displayError(accountUserNameInput, 'This field is required.');
         isValid = false;
      } else if (formData.Email.toLowerCase() !== storedEmail.toLowerCase()) {
         displayError(accountUserNameInput, 'Username not on file.');
         isValid = false;
      }

      if (formData.Password === '') {
         displayError(loginPasswordInput, 'This field is required.');
         isValid = false;
      }

      if (!isValid) {
      } else {
         window.location.href = 'menu.html'; // Redirect to menu.html if valid
      }

      return isValid;
   }

   loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm();
   });

   resetPasswordButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = resetPasswordPath; // Redirect to reset-password.html
   });
});