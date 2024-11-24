// LATER COME BACK AND MODUALRIZE CODE
document.addEventListener('DOMContentLoaded', function () {
   const localUserNameInput = document.getElementById('resetUserName');
   const newPassword = document.getElementById('resetPassword');
   const resetButton = document.getElementById('resetPasswordButton');
   const loginPagePath = './login.html'; // Define the path to login.html

   function displayError(inputField, message) {
      const errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      errorElement.textContent = message;
      inputField.classList.add('input-error');
      inputField.parentElement.insertBefore(errorElement, inputField.nextSibling);
   }

   function clearErrors() {
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(errorElement => errorElement.remove());

      const inputFields = document.querySelectorAll('.input-error');
      inputFields.forEach(inputField => inputField.classList.remove('input-error'));
   }

   function validateForm() {
      clearErrors(); // Clear previous errors before validation

      // COULD POSSIBLY BE REMOVED
      const formData = {
         UserName: localUserNameInput.value.trim(),
         Password: newPassword.value.trim()
      };

      let isValid = true;

      if (formData.UserName === '') {
         displayError(localUserNameInput, 'This field is required.');
         isValid = false;
      }

      if (formData.Password === '') {
         displayError(newPassword, 'Please enter new password.');
         isValid = false;
      }

      if (!isValid) {
         localUserNameInput.value = ''; // Reset username field
         return false;
      }

      const localStorageUserName = localStorage.getItem('storedUserName');

      if (localUserNameInput && newPassword) {
         if (formData.UserName.toLowerCase() !== localStorageUserName.toLowerCase()) {
            displayError(localUserNameInput, 'Username not found. Please try again.');
            localUserNameInput.value = ''; // Reset username field
            return false; // Stop further validation
         }

         if (formData.Password === '') {
            displayError(newPassword, 'Please enter new password.');
         }

         if (formData.UserName.toLowerCase() === localStorageUserName.toLowerCase() && formData.Password !== '') {
            localStorage.setItem('storedPassword', formData.Password);
            window.location.href = loginPagePath; // If valid redirect to login.html
         } else {
            return false;
         }
      } else {
         displayError(localUserNameInput, 'Username not found. Please try again.');
         displayError(newPassword, 'Please enter new password.');
         localUserNameInput.value = ''; // Reset username field
         newPassword.value = ''; // Reset password field
         clearErrors(); // Clear previous errors
         return false;
      }

      return true;
   }

   function clearErrorOnInput(event) {
      const inputField = event.target;
      const errorElement = inputField.parentElement.querySelector('.error-message');
      if (errorElement) {
         errorElement.remove();
      }
      inputField.classList.remove('input-error');
   }

   localUserNameInput.addEventListener('input', clearErrorOnInput);
   newPassword.addEventListener('input', clearErrorOnInput);

   resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm();
   });
});
