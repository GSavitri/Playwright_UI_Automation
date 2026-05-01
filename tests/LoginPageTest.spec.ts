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

});