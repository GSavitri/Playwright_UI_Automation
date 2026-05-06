import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import  { AddAccountPage } from '../pages/AddAccountPage';


// Declare the types of your fixtures.
type PageFixtures = {
  loginPage: LoginPage;
  addAccountPage: AddAccountPage;
};

// Declare the types of your fixtures.
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);

    // Use the fixture value in the test.
    await use(loginPage);
  },
  addAccountPage: async ({ page }, use) => {
    // Set up the fixture.
    const addAccountPage = new AddAccountPage(page);

    // Use the fixture value in the test.
    await use(addAccountPage);
  }
});
export { expect } from '@playwright/test';