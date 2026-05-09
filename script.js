const form = document.getElementById('age-form');
const errorMessage = document.getElementById('error');
const resultContainer = document.getElementById('result');
const yearsOutput = document.getElementById('years');
const monthsOutput = document.getElementById('months');
const daysOutput = document.getElementById('days');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  calculateAge();
});

function calculateAge() {
  const day = parseInt(document.getElementById('day').value, 10);
  const month = parseInt(document.getElementById('month').value, 10);
  const year = parseInt(document.getElementById('year').value, 10);

  errorMessage.textContent = '';
  resultContainer.style.display = 'none';

  if (!day || !month || !year) {
    showError('Please complete all fields.');
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    showError('Please enter a valid date.');
    return;
  }

  if (birthDate > today) {
    showError('Date of birth cannot be in the future.');
    return;
  }

  let years = today.getFullYear() - year;
  let months = today.getMonth() - (month - 1);
  let days = today.getDate() - day;

  if (days < 0) {
    months -= 1;
    const previousMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += previousMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  yearsOutput.textContent = years;
  monthsOutput.textContent = months;
  daysOutput.textContent = days;
  resultContainer.style.display = 'block';
}

function showError(message) {
  errorMessage.textContent = message;
  resultContainer.style.display = 'none';
}
