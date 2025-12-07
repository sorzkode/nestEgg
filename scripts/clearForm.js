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

// Function to clear the form inputs
function clearForm() {
  // Clear user input values
  document.getElementById('current-age').value = '';
  document.getElementById('retirement-age').value = '';
  document.getElementById('employee-cont').value = '';
  document.getElementById('employer-cont').value = '';
  document.getElementById('interest-rate').value = '';
  document.getElementById('inflation-rate').value = '';
  document.getElementById('current-savings').value = '';
  document.getElementById('salary-increase').value = '';
  document.getElementById('current-salary').value = '';

  // Clear results
  document.getElementById('results').textContent = '$';

  // Hide breakdown, show simple display
  const resultsContainer = document.getElementById('results-container');
  const simpleResults = document.getElementById('simple-results');
  if (resultsContainer) resultsContainer.style.display = 'none';
  if (simpleResults) simpleResults.style.display = 'block';

  // Clear any error states
  document.querySelectorAll('.is-invalid').forEach(el => {
    el.classList.remove('is-invalid');
  });
  document.querySelectorAll('.invalid-feedback').forEach(el => {
    el.style.display = 'none';
  });
}