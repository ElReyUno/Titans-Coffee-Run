const emailInput = document.getElementById('myEmail');
const reEnterEmailInput = document.getElementById('myReEmail');
const firstNameInput = document.getElementById('myFirstName');
const lastNameInput = document.getElementById('myLastName');
const cityInput = document.getElementById('myCity');
const stateInput = document.getElementById('myState');
const zipInput = document.getElementById('myZip');
const grossIncomeInput = document.getElementById('myGross');
const ssnInput = document.getElementById('mySsn');
const applyButton = document.getElementById('myApply');
const resetButton = document.getElementById('resetButton');
const resultsTable = document.getElementById('resultsTable');
const applyForCreditCheckbox = document.getElementById('applyForCredit');
const resultsContainer = document.getElementById('resultsContainer'); // Get the container element

function displayError(inputField, message) {
  const errorElement = document.createElement('span');
  errorElement.classList.add('error-message');
  errorElement.textContent = message;

  const container = inputField.parentElement;

  container.insertBefore(errorElement, inputField.nextSibling);
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(errorElement => errorElement.remove());
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

  // Clear table content without removing <tbody>
  resultsTable.querySelector('tbody').innerHTML = ''; 

  const formData = {
    email: emailInput.value.trim(),
    reEnterEmail: reEnterEmailInput.value.trim(),
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    city: cityInput.value.trim(),
    state: stateInput.value.trim(),
    zip: zipInput.value.trim(),
    grossIncome: parseFloat(grossIncomeInput.value.trim()),
    ssn: ssnInput.value.trim(),
    applyForCredit: applyForCreditCheckbox.checked
  };

  if (formData.email === '') {
    displayError(emailInput, 'This field is required.');
  }
  if (formData.reEnterEmail === '') {
    displayError(reEnterEmailInput, 'This field is required.');
  } else if (formData.email !== formData.reEnterEmail) {
    displayError(reEnterEmailInput, 'This entry must equal the first entry.');
  }

  let isValid = true;

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
    } else {
      valueCell.textContent = formData[field];
    }
  }

  if (isValid) {
    if (formData.grossIncome >= 20000) {
      alert("Congratulations, You are qualified for credit line. A credit card will be sent to you in the mail");
    } else {
      alert("We're sorry, you do not qualify for a credit line at this time");
    }
  } else {
    // Show the table if validation fails
    resultsTable.style.display = 'table';
    resultsContainer.style.display = 'block'; 
  }

  return isValid;
}

applyButton.addEventListener('click', (event) => { 
  event.preventDefault();
  const isValid = validateForm();
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
});