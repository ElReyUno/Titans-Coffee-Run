document.addEventListener('DOMContentLoaded', function () {
   const form = document.querySelector('.form-container');
   const emailInput = document.getElementById('creditEmailInput');
   const confirmEmailInput = document.getElementById('confirmCreditEmailInput');
   const firstNameInput = document.getElementById('creditFirstNameInput');
   const lastNameInput = document.getElementById('creditLastName');
   const cityInput = document.getElementById('creditCity');
   const stateInput = document.getElementById('creditState');
   const zipInput = document.getElementById('creditZip');
   const grossIncomeInput = document.getElementById('creditGross');
   const ssnInput = document.getElementById('creditSsn');
   const applyButton = document.getElementById('creditApply');
   const resetButton = document.getElementById('creditResetButton');
   const resultsTable = document.getElementById('creditResultsTable');
   const applyForCreditCheckbox = document.getElementById('applyForCredit');
   const resultsContainer = document.getElementById('creditResultsContainer');

   function displayError(inputField, message) {
      const errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      errorElement.textContent = message;

      inputField.parentElement.insertBefore(errorElement, inputField.nextSibling);
   }

   function clearErrors() {
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(errorElement => errorElement.remove());
   }

   function clearForm() {
      emailInput.value = '';
      confirmEmailInput.value = '';
      firstNameInput.value = '';
      lastNameInput.value = '';
      cityInput.value = '';
      stateInput.value = '';
      zipInput.value = '';
      grossIncomeInput.value = '';
      ssnInput.value = '';
      applyForCreditCheckbox.checked = false;

      clearErrors();

      resultsTable.innerHTML = '';

      resultsTable.style.display = 'none';
      resultsContainer.style.display = 'none';

      location.reload();
   }

   const requiredFields = [
      firstNameInput,
      lastNameInput,
      cityInput,
      stateInput,
      zipInput,
      grossIncomeInput,
      ssnInput,
      applyForCreditCheckbox
   ];

   function validateForm() {
      clearErrors();

      resultsTable.querySelector('tbody').innerHTML = '';

      const formData = {
         email: emailInput.value.trim(),
         reEnterEmail: confirmEmailInput.value.trim(),
         firstName: firstNameInput.value.trim(),
         lastName: lastNameInput.value.trim(),
         city: cityInput.value.trim(),
         state: stateInput.value.trim(),
         zip: zipInput.value.trim(),
         grossIncome: parseFloat(grossIncomeInput.value.trim()),
         ssn: ssnInput.value.trim(),
         applyForCredit: applyForCreditCheckbox.checked
      };

      let isValid = true;

      if (formData.email === '') {
         displayError(emailInput, 'This field is required.');
         isValid = false;
      }
      if (formData.reEnterEmail === '') {
         displayError(confirmEmailInput, 'This field is required.');
         isValid = false;
      } else if (formData.email !== formData.reEnterEmail) {
         displayError(confirmEmailInput, 'This entry must equal the first entry.');
         isValid = false;
      }

      for (let i = 0; i < requiredFields.length; i++) {
         const inputField = requiredFields[i];
         if (inputField.value === "" || (inputField === applyForCreditCheckbox && !inputField.checked)) {
            displayError(inputField, "This field is required.");
            isValid = false;
         }
      }

      const tableBody = resultsTable.querySelector('tbody');
      for (const field in formData) {
         const row = tableBody.insertRow();
         const fieldCell = row.insertCell();
         const valueCell = row.insertCell();

         fieldCell.textContent = field;

         if (formData[field] === '' || (field === 'reEnterEmail' && (formData.email !== formData.reEnterEmail || formData.email === ''))
            || (field === 'grossIncome' && isNaN(formData[field]) || (field === 'applyForCredit' && !formData[field]))) {
            valueCell.textContent = 'Invalid Entry';
            valueCell.classList.add('error');
            isValid = false;
         } else {
            valueCell.textContent = formData[field];
         }
      }

      resultsTable.style.display = 'table';
      resultsContainer.style.display = 'block';

      if (isValid) {
         setTimeout(() => {
            if (formData.grossIncome >= 20000) {
               alert("Congratulations, You are qualified for credit line. A credit card will be sent to you in the mail");
            } else {
               alert("We're sorry, you do not qualify for a credit line at this time");
            }
         }, 500);
      }

      return isValid;
   }

   applyButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm();
   });

   resetButton.addEventListener('click', () => {
      emailInput.value = '';
      reEnterEmailInput.value = '';
      firstNameInput.value = '';
      lastNameInput.value = '';
      cityInput.value = '';
      stateInput.value = '';
      zipInput.value = '';
      grossIncomeInput.value = '';
      ssnInput.value = '';
      applyForCreditCheckbox.checked = false;

      clearErrors();

      resultsTable.innerHTML = '';

      resultsTable.style.display = 'none';
      resultsContainer.style.display = 'none';

      location.reload();
   });
});