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
Mister Riley
sorzkode@proton.me
https://github.com/sorzkode

MIT License
Copyright (c) 2023 Mister Riley
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
'''
*/                                                             

// Function to calculate the future value of retirement fund
function nestEgg() {
  // User input values
  const currentAgeInput = document.getElementById('current-age'); // Input field for current age
  const retirementAgeInput = document.getElementById('retirement-age'); // Input field for retirement age
  const employeeContInput = document.getElementById('employee-cont'); // Input field for employee contribution
  const employerContInput = document.getElementById('employer-cont'); // Input field for employer contribution
  const interestRateInput = document.getElementById('interest-rate'); // Input field for interest rate
  const inflationRateInput = document.getElementById('inflation-rate'); // Input field for inflation rate
  const currentSavingsInput = document.getElementById('current-savings'); // Input field for current savings
  const salaryIncreaseInput = document.getElementById('salary-increase'); // Input field for annual salary increase
  const currentSalaryInput = document.getElementById('current-salary'); // Input field for current salary

  // Input validations
  const currentAge = parseInt(currentAgeInput.value.trim()); // Parse and validate current age
  if (Number.isNaN(currentAge) || currentAge === '') { 
    showError('Please enter a valid age.', currentAgeInput);
    return;
  }

  const retirementAge = parseInt(retirementAgeInput.value.trim()); // Parse and validate retirement age
  if (Number.isNaN(retirementAge) || retirementAge === '' || retirementAge < currentAge) { 
    showError('Please enter a valid retirement age.', retirementAgeInput);
    return;
  }

  const yearsToRetirement = retirementAge - currentAge; // Calculate years to retirement

  const employeeContribution = parseFloat(employeeContInput.value.trim()) / 100; // Parse and validate employee contribution
  if (Number.isNaN(employeeContribution) || employeeContribution === '') { 
    showError('Please enter a valid contribution.', employeeContInput);
    return;
  }

  const employerContribution = parseFloat(employerContInput.value.trim()) / 100; // Parse and validate employer contribution
  if (Number.isNaN(employerContribution) || employerContribution === '' || employerContribution > employeeContribution) { 
    showError('Please enter a valid employer contribution.', employerContInput);
    return;
  }

  const interestRate = parseFloat(interestRateInput.value.trim()) / 100; // Parse and validate interest rate
  if (Number.isNaN(interestRate) || interestRate < 0) {
    showError('Please enter a valid interest rate.', interestRateInput);
    return;
  }

  const expectedInflationRate = parseFloat(inflationRateInput.value.trim()) / 100; // Parse and validate inflation rate
  if (Number.isNaN(expectedInflationRate) || expectedInflationRate < 0) {
    showError('Please enter a valid inflation rate.', inflationRateInput);
    return;
  }

  const currentSavingsAmount = parseInt(currentSavingsInput.value.trim()); // Parse and validate current savings amount
  if (Number.isNaN(currentSavingsAmount) || currentSavingsAmount < 0) {
    showError('Please enter a valid current savings amount.', currentSavingsInput);
    return;
  }

  const annualSalaryIncrease = parseFloat(salaryIncreaseInput.value.trim()); // Parse and validate annual salary increase
  if (Number.isNaN(annualSalaryIncrease) || annualSalaryIncrease < 0) {
    showError('Please enter a valid annual salary increase.', salaryIncreaseInput);
    return;
  }

  const currentSalary = parseInt(currentSalaryInput.value.trim()); // Parse and validate current salary
  if (Number.isNaN(currentSalary) || currentSalary < 0) {
    showError('Please enter a valid current salary.', currentSalaryInput);
    return;
  }

  // Set initial values for the variables
  let currentSavings = currentSavingsAmount; // Initialize current savings with the provided amount
  let totalContributions = 0; // Initialize total contributions to 0
  let totalInterest = 0; // Initialize total interest to 0

  // Loop through each year until retirement
  for (let i = 1; i <= yearsToRetirement; i++) {
    // Calculate salary, contributions, and interest for the current year
    const yearEndSalary = currentSalary * Math.pow((1 + annualSalaryIncrease / 100), i); // Calculate salary at the end of the year
    const employeeContributionAmount = (employeeContribution / 100) * yearEndSalary; // Calculate employee contribution amount
    const employerContributionAmount = (employerContribution / 100) * yearEndSalary; // Calculate employer contribution amount
    const totalContribution = employeeContributionAmount + employerContributionAmount; // Calculate total contribution for the year
    totalContributions += totalContribution; // Accumulate total contributions

    const yearEndInflation = Math.pow((1 + expectedInflationRate), i); // Calculate inflation rate at the end of the year
    const yearEndInterest = (currentSavings + totalContributions) * interestRate * yearEndInflation; // Calculate interest for the year
    totalInterest += yearEndInterest; // Accumulate total interest
    // Update the current savings with the contributions and interest for the year
    currentSavings += totalContribution + yearEndInterest;
  }
  // Display the results
  document.getElementById('results').textContent = '$' + currentSavings.toLocaleString(undefined, {maximumFractionDigits: 2});
}

function showError(message, inputElement) {
  alert(message);
  inputElement.focus();
}
