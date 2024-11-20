document.addEventListener('DOMContentLoaded', function () {
   const form = document.querySelector('.form-container');
   const accountEmailInput = document.getElementById('accountEmail');
   const passwordInput = document.getElementById('accountPassword');
   const confirmPasswordInput = document.getElementById('confirmAccountPassword');
   const applyForAccountButton = document.getElementById('applyForAccountButton');
   const resetPasswordButton = document.getElementById('resetPasswordButton');
   const accountResultsTable = document.getElementById('accountResultsTable');
   const accountResultsContainer = document.getElementById('accountResultsContainer');

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
      accountEmailInput
    ];
    
    const fieldDisplayNames = {
      email: 'Email',
      password: 'Password',
      reEnterPassword: 'Re-Enter Password'
    };

   function storeFormData(formData) {
      // Map key-value pairs
      const userData = {
         Password: formData.Password,
         Confirm_Password: formData.Confirm_Password
      };

      // Store form data in local storage using email as key
      localStorage.setItem(formData.Email, JSON.stringify(userData));
      
      // Store username and password 
      localStorage.setItem('storedUserName', formData.Email);
      localStorage.setItem('storedPassword', formData.Password);

      // Define variables before logging to local storage
      const storedUserName = localStorage.getItem('storedUserName');
      const storedPassword = localStorage.getItem('storedPassword');
      
      /*
      // TRY THIS
      localStorage.setItem('userData', JSON.stringify({
  "admin": { "email": "username":password },
  "user1": { "email": "username":password },
  "user2": { "email": "username":password" }
}));
      */
   }

   function displayStoredData() {
      const email = accountEmailInput.value.trim();
      const storedData = localStorage.getItem(email);
      if (storedData) {
         const formData = JSON.parse(storedData);
         accountResultsTable.querySelector('tbody').innerHTML = '';

         const emailRow = accountResultsTable.insertRow();
         const emailFieldCell = emailRow.insertCell();
         const emailValueCell = emailRow.insertCell();
         emailFieldCell.textContent = 'Email';
         emailValueCell.textContent = email;

         for (const field in formData) {
            const row = accountResultsTable.insertRow();
            const fieldCell = row.insertCell();
            const valueCell = row.insertCell();

            fieldCell.textContent = field;
            valueCell.textContent = formData[field];
         }

         accountResultsTable.style.display = 'table';
         accountResultsContainer.style.display = 'block';
      } else {
         alert('No data found in local storage for this email.');
      }
   }

   function validateForm() {
      clearErrors();

      accountResultsTable.querySelector('tbody').innerHTML = '';

      const formData = {
         Email: accountEmailInput.value.trim(),
         Password: passwordInput.value.trim(),
         Confirm_Password: confirmPasswordInput.value.trim()
      };

      let isValid = true;

      if (formData.Email === '') {
         displayError(accountEmailInput, 'This field is required.');
         isValid = false;
      }
      if (formData.Password === '') {
         displayError(passwordInput, 'This field is required.');
         isValid = false;
      }
      if (formData.Confirm_Password === '') {
         displayError(confirmPasswordInput, 'This field is required.');
         isValid = false;
      } else if (formData.Password !== formData.Confirm_Password) {
         displayError(confirmPasswordInput, 'This entry must equal the first entry.');
         isValid = false;
      }

      if (!isValid) {
         const tableBody = accountResultsTable.querySelector('tbody');
         for (const field in formData) {
            const row = tableBody.insertRow();
            const fieldCell = row.insertCell();
            const valueCell = row.insertCell();

            fieldCell.textContent = field;

            if (formData[field] === '' || (field === 'reEnterPassword' && (formData.password !== formData.reEnterPassword || formData.password === ''))) {
               valueCell.textContent = 'Invalid Entry';
               valueCell.classList.add('error');
            } else {
               valueCell.textContent = formData[field];
            }
         }

         accountResultsTable.style.display = 'table';
         accountResultsContainer.style.display = 'block';
      } else {
         storeFormData(formData);                           // Function that stores data locally in browser
         accountResultsTable.style.display = 'none';
         accountResultsContainer.style.display = 'none';
         window.location.href = 'login.html';               // Redirect to login.html if valid
      }

      return isValid;
   }

   applyForAccountButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm();
   });

   form.addEventListener('submit', (event) => {
      event.preventDefault();
      validateForm();
   });
});