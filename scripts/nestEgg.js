/* 
███╗   ██╗███████╗███████╗████████╗███████╗ ██████╗  ██████╗ 
████╗  ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝██╔════╝ ██╔════╝ 
██╔██╗ ██║█████╗  ███████╗   ██║   █████╗  ██║  ███╗██║  ███╗
██║╚██╗██║██╔══╝  ╚════██║   ██║   ██╔══╝  ██║   ██║██║   ██║
██║ ╚████║███████╗███████║   ██║   ███████╗╚██████╔╝╚██████╔╝
╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ 
Nest Egg calculator to determine the future value of your retirement fund.
-
Author:
sorzkode
https://github.com/sorzkode

MIT License
Copyright (c) 2025 sorzkode
'''
*/

// Constants for validation
const PERCENT_TO_DECIMAL = 100;
const MIN_AGE = 15;
const MAX_AGE = 85;
const MIN_RETIREMENT_AGE = 15;
const MAX_RETIREMENT_AGE = 95;
const MIN_CONTRIBUTION_PERCENT = 0;
const MAX_CONTRIBUTION_PERCENT = 100;
const MIN_INTEREST_RATE = 0;
const MAX_INTEREST_RATE = 100;
const MIN_INFLATION_RATE = 1;
const MAX_INFLATION_RATE = 15;
const MAX_SALARY = 10000000; 
const MAX_SAVINGS = 100000000; 

// Element IDs
const ELEMENT_IDS = {
  currentAge: 'current-age',
  retirementAge: 'retirement-age',
  employeeCont: 'employee-cont',
  employerCont: 'employer-cont',
  interestRate: 'interest-rate',
  inflationRate: 'inflation-rate',
  currentSavings: 'current-savings',
  salaryIncrease: 'salary-increase',
  currentSalary: 'current-salary',
  results: 'results'
};

// Function to calculate the future value of retirement fund
function nestEgg() {
  // User input values
  const currentAgeInput = document.getElementById('current-age'); 
  const retirementAgeInput = document.getElementById('retirement-age'); 
  const employeeContInput = document.getElementById('employee-cont'); 
  const employerContInput = document.getElementById('employer-cont'); 
  const interestRateInput = document.getElementById('interest-rate'); 
  const inflationRateInput = document.getElementById('inflation-rate'); 
  const currentSavingsInput = document.getElementById('current-savings'); 
  const salaryIncreaseInput = document.getElementById('salary-increase'); 
  const currentSalaryInput = document.getElementById('current-salary'); 

  // Input validations
  const currentAge = parseInt(currentAgeInput.value.trim()); 
  if (Number.isNaN(currentAge) || currentAge < MIN_AGE || currentAge > MAX_AGE) {
    showError(`Please enter a valid age (${MIN_AGE}-${MAX_AGE}).`, currentAgeInput);
    return;
  }

  const retirementAge = parseInt(retirementAgeInput.value.trim()); 
  if (Number.isNaN(retirementAge) || retirementAge < currentAge || retirementAge > MAX_RETIREMENT_AGE) {
    showError(`Please enter a valid retirement age (must be greater than current age and max ${MAX_RETIREMENT_AGE}).`, retirementAgeInput);
    return;
  }

  const yearsToRetirement = retirementAge - currentAge; 
  const employeeContribution = parseFloat(employeeContInput.value.trim()) / PERCENT_TO_DECIMAL; 
  if (Number.isNaN(employeeContribution) || employeeContribution < MIN_CONTRIBUTION_PERCENT / PERCENT_TO_DECIMAL || employeeContribution > MAX_CONTRIBUTION_PERCENT / PERCENT_TO_DECIMAL) {
    showError(`Please enter a valid contribution (${MIN_CONTRIBUTION_PERCENT}-${MAX_CONTRIBUTION_PERCENT}%).`, employeeContInput);
    return;
  }

  const employerContribution = parseFloat(employerContInput.value.trim()) / PERCENT_TO_DECIMAL; 
  if (Number.isNaN(employerContribution) || employerContribution < MIN_CONTRIBUTION_PERCENT / PERCENT_TO_DECIMAL || employerContribution > MAX_CONTRIBUTION_PERCENT / PERCENT_TO_DECIMAL) {
    showError(`Please enter a valid employer contribution (${MIN_CONTRIBUTION_PERCENT}-${MAX_CONTRIBUTION_PERCENT}%).`, employerContInput);
    return;
  }

  const interestRate = parseFloat(interestRateInput.value.trim()) / PERCENT_TO_DECIMAL; 
  if (Number.isNaN(interestRate) || interestRate < MIN_INTEREST_RATE / PERCENT_TO_DECIMAL || interestRate > MAX_INTEREST_RATE / PERCENT_TO_DECIMAL) {
    showError(`Please enter a valid interest rate (${MIN_INTEREST_RATE}-${MAX_INTEREST_RATE}%).`, interestRateInput);
    return;
  }

  const expectedInflationRate = parseFloat(inflationRateInput.value.trim()) / PERCENT_TO_DECIMAL; 
  if (Number.isNaN(expectedInflationRate) || expectedInflationRate < MIN_INFLATION_RATE / PERCENT_TO_DECIMAL || expectedInflationRate > MAX_INFLATION_RATE / PERCENT_TO_DECIMAL) {
    showError(`Please enter a valid inflation rate (${MIN_INFLATION_RATE}-${MAX_INFLATION_RATE}%).`, inflationRateInput);
    return;
  }

  const currentSavingsAmount = parseInt(currentSavingsInput.value.trim()); 
  if (Number.isNaN(currentSavingsAmount) || currentSavingsAmount < 0 || currentSavingsAmount > MAX_SAVINGS) {
    showError(`Please enter a valid current savings amount (max $${MAX_SAVINGS.toLocaleString()}).`, currentSavingsInput);
    return;
  }

  const annualSalaryIncrease = parseFloat(salaryIncreaseInput.value.trim()); 
  if (Number.isNaN(annualSalaryIncrease) || annualSalaryIncrease < 0 || annualSalaryIncrease > 100) {
    showError('Please enter a valid annual salary increase (0-100%).', salaryIncreaseInput);
    return;
  }

  const currentSalary = parseInt(currentSalaryInput.value.trim()); 
  if (Number.isNaN(currentSalary) || currentSalary < 0 || currentSalary > MAX_SALARY) {
    showError(`Please enter a valid current salary (max $${MAX_SALARY.toLocaleString()}).`, currentSalaryInput);
    return;
  }

  // Set initial values for the variables
  let currentSavings = currentSavingsAmount; 
  let totalContributions = 0; 
  let totalInterest = 0; 
  let totalEmployeeContributions = 0; 
  let totalEmployerContributions = 0; 

  // Loop through each year until retirement
  for (let i = 1; i <= yearsToRetirement; i++) {
    // Project salary with annual increases compounded over i years
    const yearEndSalary = currentSalary * Math.pow((1 + annualSalaryIncrease / PERCENT_TO_DECIMAL), i);

    // Calculate annual contributions based on projected salary
    const employeeContributionAmount = employeeContribution * yearEndSalary;
    const employerContributionAmount = employerContribution * yearEndSalary;
    const totalContribution = employeeContributionAmount + employerContributionAmount;

    // Track cumulative contributions for breakdown display
    totalContributions += totalContribution;
    totalEmployeeContributions += employeeContributionAmount;
    totalEmployerContributions += employerContributionAmount;

    // Calculate investment growth on current balance plus this year's contribution
    const yearEndInterest = (currentSavings + totalContribution) * interestRate;
    totalInterest += yearEndInterest;

    // Update running balance for next year
    currentSavings += totalContribution + yearEndInterest;
  }

  // Calculate inflation-adjusted value (purchasing power in today's dollars)
  const inflationFactor = Math.pow((1 + expectedInflationRate), yearsToRetirement);
  const inflationAdjustedValue = currentSavings / inflationFactor;

  // Update breakdown display
  document.getElementById('results-total').textContent = '$' + currentSavings.toLocaleString(undefined, {maximumFractionDigits: 2});
  document.getElementById('results-initial').textContent = '$' + currentSavingsAmount.toLocaleString(undefined, {maximumFractionDigits: 2});
  document.getElementById('results-employee').textContent = '$' + totalEmployeeContributions.toLocaleString(undefined, {maximumFractionDigits: 2});
  document.getElementById('results-employer').textContent = '$' + totalEmployerContributions.toLocaleString(undefined, {maximumFractionDigits: 2});
  document.getElementById('results-interest').textContent = '$' + totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2});
  document.getElementById('results-inflation-adjusted').textContent = '$' + inflationAdjustedValue.toLocaleString(undefined, {maximumFractionDigits: 2});

  // Show breakdown, hide simple display
  document.getElementById('results-container').style.display = 'block';
  document.getElementById('simple-results').style.display = 'none';

  // Also update simple display for backwards compatibility
  document.getElementById('results').textContent = '$' + currentSavings.toLocaleString(undefined, {maximumFractionDigits: 2});
}

function showError(message, inputElement) {
  // Add error class to input
  inputElement.classList.add('is-invalid');

  // Create or update error message element
  let errorDiv = inputElement.parentElement.querySelector('.invalid-feedback');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    inputElement.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  // Announce error to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'alert');
  announcement.setAttribute('aria-live', 'assertive');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);

  // Remove error on input change
  inputElement.addEventListener('input', function clearError() {
    inputElement.classList.remove('is-invalid');
    if (errorDiv) errorDiv.style.display = 'none';
    inputElement.removeEventListener('input', clearError);
  }, { once: true });

  inputElement.focus();
}

// Allow Enter key to trigger calculate
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('myForm');
  if (form) {
    form.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        nestEgg();
      }
    });
  }
});