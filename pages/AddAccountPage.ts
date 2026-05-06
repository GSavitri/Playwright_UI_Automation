import { Page, expect } from '@playwright/test';

export class AddAccountPage {
  constructor(private page: Page) {}

  // Dialog and form selectors
  private readonly addAccountDialog = 'dialog:has-text("Add New Account")';
  private readonly accountNameInput = '[data-testid="account-name-input"]';
  private readonly accountTypeSelect = '[data-testid="account-type-select"]';
  private readonly initialBalanceInput = '[data-testid="initial-balance-input"]';
  private readonly saveAccountButton = '[data-testid="save-account-button"]';
  private readonly cancelButton = '[data-testid="cancel-button"]';
  private readonly accountsTable = 'table';

  /**
   * Navigate to the Accounts page
   */
  async navigateToAccountsPage(): Promise<void> {
    await this.page.goto('/bank/accounts');
  }

  /**
   * Navigate directly to Add Account page
   */
  async navigateToAddAccountPage(): Promise<void> {
    await this.page.goto('/bank/accounts?action=add');
  }

  /**
   * Click the Add Dashboard button
   */
  async clickDashBoardButton(): Promise<void> {
    await this.page.getByTestId('nav-dashboard').click();
  }

  /**
   * Click the Add Account button
   */
  async clickAddAccountButton(): Promise<void> {
    await this.page.getByTestId('quick-add-account').click();
  }

  /**
   * Enter account name
   */
  async enterAccountName(name: string): Promise<void> {
    await this.page.fill(this.accountNameInput, name);
  }

  /**
   * Select account type from dropdown
   */
  async selectAccountType(accountType: string): Promise<void> {
    await this.page.click(this.accountTypeSelect);
    await this.page.getByRole('option', { name: accountType }).click();
  }

  /**
   * Enter initial balance
   */
  async enterInitialBalance(balance: string): Promise<void> {
    await this.page.fill(this.initialBalanceInput, balance);
  }

  /**
   * Select Active status
   */
  async selectActiveStatus(): Promise<void> {
    await this.page.getByTestId('status-active-radio').click();
  }

  /**
   * Select Inactive status
   */
  async selectInactiveStatus(): Promise<void> {
    await this.page.getByTestId('status-inactive-radio').click();
  }

  /**
   * Enable overdraft protection
   */
  async enableOverdraftProtection(): Promise<void> {
    await this.page.getByLabel('Enable Overdraft Protection').check();
  }

  /**
   * Click Save Account button
   */
  async clickSaveAccount(): Promise<void> {
    await this.page.getByTestId('save-account-button').click();
  }

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await this.page.getByTestId('cancel-button').click();
  }

  /**
   * Click Close (X) button
   */
  async clickCloseModal(): Promise<void> {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }

  /**
   * Verify modal is visible
   */
  async verifyModalIsVisible(): Promise<void> {
    await expect(this.page.getByRole('dialog', { name: 'Add New Account' })).toBeVisible();
  }

  /**
   * Verify modal is closed
   */
  async verifyModalIsClosed(): Promise<void> {
    await expect(this.page.getByRole('dialog', { name: 'Add New Account' })).not.toBeVisible();
  }

  /**
   * Verify modal title
   */
  async verifyModalTitle(title: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
  }

  /**
   * Verify Active status is checked by default
   */
  async verifyActiveStatusIsDefault(): Promise<void> {
    const activeRadio = this.page.getByTestId('status-active-radio');
    await expect(activeRadio).toBeChecked();
  }

  /**
   * Verify account appears in table
   */
  async verifyAccountInTable(accountName: string): Promise<void> {
    await expect(
      this.page.getByRole('link', { name: accountName })
    ).toBeVisible();
  }

  /**
   * Verify account balance in table
   */
  async verifyAccountBalance(accountName: string, balance: string): Promise<void> {
    const row = this.page.getByRole('row').filter({ has: this.page.getByText(accountName) });
    await expect(row.getByText(balance)).toBeVisible();
  }

  /**
   * Verify account status in table
   */
  async verifyAccountStatus(accountName: string, status: string): Promise<void> {
    const row = this.page.getByRole('row').filter({ has: this.page.getByText(accountName) });
    await expect(row.getByText(status, { exact: true })).toBeVisible();
  }

  /**
   * Verify account type in table
   */
  async verifyAccountType(accountName: string, type: string): Promise<void> {
    const row = this.page.getByRole('row').filter({ has: this.page.getByText(accountName) });
    await expect(row.getByText(type, { exact: true })).toBeVisible();
  }

  /**
   * Verify field is required
   */
  async verifyFieldIsRequired(fieldLabel: string): Promise<void> {
    const label = this.page.locator(`text="${fieldLabel} *"`);
    await expect(label).toBeVisible();
  }

  /**
   * Verify field is optional
   */
  async verifyFieldIsOptional(fieldLabel: string): Promise<void> {
    const requiredLabel = this.page.locator(`text="${fieldLabel} *"`);
    await expect(requiredLabel).not.toBeVisible();
  }

  /**
   * Get account count from table
   */
  async getAccountCount(): Promise<number> {
    const accountRows = this.page.locator('table tbody tr');
    return await accountRows.count();
  }
}