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

  // Clear error messages
  document.getElementById('error-message').textContent = '';

  // Clear results
  document.getElementById('results').textContent = '';
}
