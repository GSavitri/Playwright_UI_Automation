import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


// Declare the types of your fixtures.
type PageFixtures = {
  loginPage: LoginPage;
};

// Declare the types of your fixtures.
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);

    // Use the fixture value in the test.
    await use(loginPage);
  },
});
export { expect } from '@playwright/test';