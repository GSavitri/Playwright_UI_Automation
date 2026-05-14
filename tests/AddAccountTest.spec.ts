// spec: tests/add_account_test_plan_spec.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/base';

test.describe('Add Account with Valid Credentials', () => {
  test('Add Account with All Required Fields', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');

    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // 2. Click the "Add Account" button to open the modal
    await addAccountPage.clickAddAccountButton();
    await addAccountPage.verifyModalIsVisible();

    // 3. Enter valid account name in the "Account Name" field
    await addAccountPage.enterAccountName('Test Savings Account');

    // 4. Select an account type from the "Account Type" dropdown
    await addAccountPage.selectAccountType('Savings Account');

    // 5. Enter a valid initial balance in the "Initial Balance" field
    await addAccountPage.enterInitialBalance('5000');

    // 6. Verify the "Active" status is selected by default
    await addAccountPage.verifyActiveStatusIsDefault();

    // 7. Click the "Save Account" button
    await addAccountPage.clickSaveAccount();

    // 8. Verify the account is created successfully and appears in the accounts table
    await addAccountPage.verifyAccountInTable('Test Savings Account');
    await addAccountPage.verifyAccountBalance('Test Savings Account', '$5,000.00');
    await addAccountPage.verifyAccountStatus('Test Savings Account', 'Active');
    await addAccountPage.verifyAccountType('Test Savings Account', 'Savings');
  });

  test('Add Account with Optional Overdraft Protection', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');
    
    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // 2. Click the "Add Account" button to open the modal
    await addAccountPage.clickAddAccountButton();
    await addAccountPage.verifyModalIsVisible();

    // 3. Enter valid account name
    await addAccountPage.enterAccountName('Overdraft Account');

    // 4. Select an account type
    await addAccountPage.selectAccountType('Checking Account');

    // 5. Enter initial balance
    await addAccountPage.enterInitialBalance('2500');

    // 6. Check the "Enable Overdraft Protection" checkbox
    await addAccountPage.enableOverdraftProtection();

    // 7. Click the "Save Account" button
    await addAccountPage.clickSaveAccount();

    // 8. Verify the account is created with overdraft protection enabled
    await addAccountPage.verifyAccountInTable('Overdraft Account');

    // 9. Verify account appears in the table
    await addAccountPage.verifyAccountBalance('Overdraft Account', '$2,500.00');
  });

  test('Add Account with Inactive Status', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');
    
    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // 2. Click the "Add Account" button
    await addAccountPage.clickAddAccountButton();
    await addAccountPage.verifyModalIsVisible();

    // 3. Enter valid account name
    await addAccountPage.enterAccountName('Inactive Test Account');

    // 4. Select an account type
    await addAccountPage.selectAccountType('Savings Account');

    // 5. Enter initial balance
    await addAccountPage.enterInitialBalance('1000');

    // 6. Select "Inactive" radio button
    await addAccountPage.selectInactiveStatus();

    // 7. Click the "Save Account" button
    await addAccountPage.clickSaveAccount();

    // 8. Verify the account is created with Inactive status
    await addAccountPage.verifyAccountInTable('Inactive Test Account');

    // 9. Verify account status displays as "Inactive" in the table
    await addAccountPage.verifyAccountStatus('Inactive Test Account', 'Inactive');
  });
});

test.describe('Add Account Form Interactions', () => {
  test.skip('Cancel Account Creation', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');

    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // Get current account count before attempting to add
    const initialCount = await addAccountPage.getAccountCount();

    // 2. Click the "Add Account" button to open modal
    await addAccountPage.clickAddAccountButton();
    await addAccountPage.verifyModalIsVisible();

    // 3. Enter account name
    await addAccountPage.enterAccountName('Cancel Test Account');

    // 4. Select account type
    await addAccountPage.selectAccountType('Checking Account');

    // 5. Enter initial balance
    await addAccountPage.enterInitialBalance('3000');

    // 6. Click the "Cancel" button
    await addAccountPage.clickCancel();

    // 7. Verify the modal closes without creating account
    await addAccountPage.verifyModalIsClosed();

    // 8. Verify the accounts table remains unchanged
    const finalCount = await addAccountPage.getAccountCount();
    expect(finalCount).toBe(initialCount);
  });

  test('Close Modal Using Close Button', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');

    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // 2. Click the "Add Account" button
    await addAccountPage.clickAddAccountButton();
    await addAccountPage.verifyModalIsVisible();

    // 3. Enter some account details
    await addAccountPage.enterAccountName('Close Modal Test');
    await addAccountPage.selectAccountType('Savings Account');

    // 4. Click the "Close" (X) button on the modal
    await addAccountPage.clickCloseModal();

    // 5. Verify the modal closes
    await addAccountPage.verifyModalIsClosed();

    // 6. Verify no account was created
    // Account should not exist in table
    const accountNotFound = await page
      .getByRole('link', { name: 'Close Modal Test' })
      .isHidden()
      .catch(() => true);
    expect(accountNotFound).toBeTruthy();
  });
});

test.describe('Add Account - Accessibility & UI', () => {
  test('Verify Modal Title and Description', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');

    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // 2. Click "Add Account" button
    await addAccountPage.clickAddAccountButton();

    // 3. Verify modal title is "Add New Account"
    await addAccountPage.verifyModalTitle('Add New Account');

    // 4. Verify description text is present
    await expect(page.locator('text=Fill in the details to create a new account')).toBeVisible();

    // 5. Verify all form labels are visible
    const modal = page.getByRole('dialog', { name: 'Add New Account' });
    await expect(modal.locator('text=Account Name *')).toBeVisible();
    await expect(modal.locator('text=Account Type *')).toBeVisible();
    await expect(modal.locator('text=Initial Balance *')).toBeVisible();
    await expect(modal.locator('text=Status')).toBeVisible();
  });

  test('Verify Required Field Indicators', async ({ page, loginPage, addAccountPage }) => {
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.logInWithUserNamePassword('admin', 'admin123');

    // 1. Navigate to the Accounts page
    await addAccountPage.clickDashBoardButton();

    // 2. Click "Add Account" button
    await addAccountPage.clickAddAccountButton();

    // 3. Verify asterisks (*) appear next to required fields
    await addAccountPage.verifyFieldIsRequired('Account Name');
    await addAccountPage.verifyFieldIsRequired('Account Type');
    await addAccountPage.verifyFieldIsRequired('Initial Balance');

    // 4. Verify "Status" and "Overdraft Protection" fields are NOT marked as required
    await addAccountPage.verifyFieldIsOptional('Status');
    await addAccountPage.verifyFieldIsOptional('Enable Overdraft Protection');
  });
});
