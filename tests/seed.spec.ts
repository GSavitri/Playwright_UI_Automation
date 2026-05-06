import { test, expect } from '../fixtures/base';

test.describe('Seed for logged in user', () => {
  test('seed', async ({ loginPage }) => {
    // generate code here.
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');
  });
});
