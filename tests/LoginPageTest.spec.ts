import { test, expect } from '../fixtures/base';

test.describe('Login Page Tests', () => { 
  
  test.beforeEach(async ( {loginPage} ) => {
    await loginPage.goto();
  });

  test('TestCase1: Successful Login with admin credentials', async ({loginPage}) => {
    await loginPage.logInWithUserNamePassword('admin', 'admin123');
    // Add assertions to verify successful login, e.g., check for a specific element on the dashboard
    await expect(loginPage.dashBoardButton).toBeVisible();
  });

  test('TestCase2: Unsuccessful Login with invalid credentials', async ({loginPage}) => {
    await loginPage.logInWithUserNamePassword('invalidUser', 'invalidPass');
    // Add assertions to verify the error message is displayed
    await loginPage.invalidLoginErrorMessage.isVisible();
  });

  test('TestCase3: Toggle Password Visibility', async ({loginPage}) => {
    let password = "somePassword";
    await loginPage.enterPassword(password);
    await loginPage.togglePasswordVisibility();
    // Add assertions to verify that the password input type has changed to text
     const passwordInputType = await loginPage.passwordInput.inputValue();
    expect(passwordInputType).toBe(password);
  });

  test('TestCase4: Clear Input Fields', async ({loginPage}) => {
    await loginPage.usernameInput.fill('someUser');
    await loginPage.passwordInput.fill('somePass');
    await loginPage.clearInputFields();
    // Add assertions to verify that the input fields are cleared
    const usernameValue = await loginPage.usernameInput.inputValue();
    const passwordValue = await loginPage.passwordInput.inputValue();
    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });

  test('TestCase5: Required Field Validation', async ({loginPage}) => {
    await loginPage.logInWithUserNamePassword('', '');
    // Add assertions to verify that the required field error messages are displayed
    await expect(loginPage.usernameReuiredErrorMessage).toBeVisible();
    await expect(loginPage.passwordReuiredErrorMessage).toBeVisible();
  }); 

});