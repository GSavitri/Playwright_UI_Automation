import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  usernameInput : Locator   ;
  passwordInput : Locator;
  loginButton : Locator;
  dashBoardButton : Locator;
  showPasswordButton : Locator;
  clearButton : Locator;
  invalidLoginErrorMessage : Locator;
  usernameReuiredErrorMessage : Locator;
  passwordReuiredErrorMessage : Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.dashBoardButton = page.getByTestId('nav-dashboard');
    this.showPasswordButton = page.getByTestId('toggle-password-btn');
    this.clearButton = page.getByTestId('clear-button');
    this.invalidLoginErrorMessage = page.getByText('Invalid username or password. Please try again');
    this.usernameReuiredErrorMessage = page.getByText('Username is required');
    this.passwordReuiredErrorMessage = page.getByText('Password is required');
  }

  async goto() {
    await this.page.goto('https://www.qaplayground.com/bank'); // Update URL as needed
  }

  async enterUserName(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async logInWithUserNamePassword(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.dashBoardButton).toBeVisible();
  }

  async verifyInvalidLoginErrorMessage() {
    await expect(this.invalidLoginErrorMessage).toBeVisible();
  }

  async togglePasswordVisibility() {
    await this.showPasswordButton.click();
  }

  async verifytogglePasswordVisibility(password: string) {
    const passwordInputType = await this.passwordInput.inputValue();
    expect(passwordInputType).toBe(password);
  }

  async clearInputFields() {
    await this.clearButton.click();
  }

    async verifyUsernameRequiredErrorMessage() {
        await expect(this.usernameReuiredErrorMessage).toBeVisible();
    }

    async verifyPasswordRequiredErrorMessage() {
        await expect(this.passwordReuiredErrorMessage).toBeVisible();
    }
}
