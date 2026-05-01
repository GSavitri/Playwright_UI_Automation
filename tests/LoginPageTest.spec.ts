import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login Page Tests', () => { 
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TestCase1: Successful Login with admin credentials', async () => {
    await loginPage.logInWithUserNamePassword('admin', 'admin123');
    // Add assertions to verify successful login, e.g., check for a specific element on the dashboard
    await loginPage.verifySuccessfulLogin();
  });

  test('TestCase2: Unsuccessful Login with invalid credentials', async () => {
    await loginPage.logInWithUserNamePassword('invalidUser', 'invalidPass');
    // Add assertions to verify the error message is displayed
    await loginPage.verifyInvalidLoginErrorMessage();
  });

  test('TestCase3: Toggle Password Visibility', async () => {
    let password = "somePassword";
    await loginPage.enterPassword(password);
    await loginPage.togglePasswordVisibility();
    // Add assertions to verify that the password input type has changed to text
    await loginPage.verifytogglePasswordVisibility(password);
  });

  test('TestCase4: Clear Input Fields', async () => {
    await loginPage.usernameInput.fill('someUser');
    await loginPage.passwordInput.fill('somePass');
    await loginPage.clearInputFields();
    // Add assertions to verify that the input fields are cleared
    const usernameValue = await loginPage.usernameInput.inputValue();
    const passwordValue = await loginPage.passwordInput.inputValue();
    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });

  test('TestCase5: Required Field Validation', async () => {
    await loginPage.logInWithUserNamePassword('', '');
    // Add assertions to verify that the required field error messages are displayed
    await loginPage.verifyUsernameRequiredErrorMessage();
    await loginPage.verifyPasswordRequiredErrorMessage();
  }); 

});