import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  usernameInput : Locator   ;
  passwordInput : Locator;
  loginButton : Locator;
  buttonDashBoard : Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.buttonDashBoard = page.getByTestId('nav-dashboard');
  }

  async goto() {
    await this.page.goto('https://www.qaplayground.com/bank'); // Update URL as needed
  }

  async logInWithUserNamePassword(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.buttonDashBoard).toBeVisible();
  }
}
