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
  if (isNaN(currentAge) || currentAge == '') { 
    alert('Please enter a valid age.');
    currentAgeInput.focus();
    return;
  }

  const retirementAge = parseInt(retirementAgeInput.value.trim());
  if (isNaN(retirementAge) || retirementAge == '' || retirementAge < currentAge) { 
    alert('Please enter a valid retirement age.');
    retirementAgeInput.focus();
    return;
  }

  const yearsToRetirement = retirementAge - currentAge;

  const employeeContribution = parseInt(employeeContInput.value.trim()) / 100;
  if (isNaN(employeeContribution) || employeeContribution == '') { 
    alert('Please enter a valid contribution.');
    employeeContribution.focus();
    return;
  }

  const employerContribution = parseInt(employerContInput.value.trim()) / 100;
  if (isNaN(employerContribution) || employerContribution == '' || employerContribution > employeeContribution) { 
    alert('Please enter a valid employer contribution.');
    employerContInput.focus();
    return;
  }

  const interestRate = parseInt(interestRateInput.value.trim()) / 100;
  if (isNaN(interestRate) || interestRate < 0) {
    alert('Please enter a valid interest rate.');
    interestRateInput.focus();
    return;
  }

  const expectedInflationRate = parseInt(inflationRateInput.value.trim()) / 100;
  if (isNaN(expectedInflationRate) || expectedInflationRate < 0) {
    alert('Please enter a valid inflation rate.');
    inflationRateInput.focus();
    return;
  }

  const currentSavingsAmount = parseInt(currentSavingsInput.value.trim());
  if (isNaN(currentSavingsAmount) || currentSavingsAmount < 0) {
    alert('Please enter a valid current savings amount.');
    currentSavingsInput.focus();
    return;
  }

  const annualSalaryIncrease = parseInt(salaryIncreaseInput.value.trim());
  if (isNaN(annualSalaryIncrease) || annualSalaryIncrease < 0) {
    alert('Please enter a valid annual salary increase.');
    salaryIncreaseInput.focus();
    return;
  }

  const currentSalary = parseInt(currentSalaryInput.value.trim());
  if (isNaN(currentSalary) || currentSalary < 0) {
    alert('Please enter a valid current salary.');
    currentSalaryInput.focus();
    return;
  }

  // Set initial values for the variables
  let currentSavings = currentSavingsAmount;
  let totalContributions = 0;
  let totalInterest = 0;

  // Loop through each year until retirement
  for (let i = 1; i <= yearsToRetirement; i++) {
    // Calculate salary, contributions, and interest for the current year
    const yearEndSalary = currentSalary * ((1 + annualSalaryIncrease / 100) ** i);
    const employeeContributionAmount = (employeeContribution / 100) * yearEndSalary;
    const employerContributionAmount = (employerContribution / 100) * yearEndSalary;
    const totalContribution = employeeContributionAmount + employerContributionAmount;
    totalContributions += totalContribution;

    const yearEndInflation = (1 + expectedInflationRate) ** i;
    const yearEndInterest = (currentSavings + totalContributions) * interestRate * yearEndInflation;
    totalInterest += yearEndInterest;
    // Update the current savings with the contributions and interest for the year
    currentSavings += totalContribution + yearEndInterest;
  }
  // Display the results
  document.getElementById('results').textContent = '$' + currentSavings.toLocaleString(undefined, {maximumFractionDigits: 2});
}
