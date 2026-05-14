# Add Account Test Plan - SecureBank Demo

## Overview
This test plan covers the functionality for creating new bank accounts in the SecureBank Demo application. The "Add New Account" feature is accessed via a modal dialog from the Accounts page.

---

## 1. Add Account with Valid Credentials

### Seed
`tests/seed.spec.ts`

### 1.1 Add Account with All Required Fields
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button to open the modal
3. Enter valid account name in the "Account Name" field
4. Select an account type from the "Account Type" dropdown
5. Enter a valid initial balance in the "Initial Balance" field
6. Verify the "Active" status is selected by default
7. Click the "Save Account" button
8. Verify the account is created successfully and appears in the accounts table
9. Verify success notification appears

### 1.2 Add Account with Optional Overdraft Protection
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button to open the modal
3. Enter valid account name
4. Select an account type
5. Enter initial balance
6. Check the "Enable Overdraft Protection" checkbox
7. Click the "Save Account" button
8. Verify the account is created with overdraft protection enabled
9. Verify account appears in the table

### 1.3 Add Account with Inactive Status
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Enter valid account name
4. Select an account type
5. Enter initial balance
6. Select "Inactive" radio button
7. Click the "Save Account" button
8. Verify the account is created with Inactive status
9. Verify account status displays as "Inactive" in the table

---

## 2. Add Account with Invalid Input

### 2.1 Add Account with Empty Account Name
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Leave the "Account Name" field empty
4. Select an account type
5. Enter initial balance
6. Click the "Save Account" button
7. Verify validation error appears for account name field
8. Verify account is not created

### 2.2 Add Account with Empty Account Type
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Enter valid account name
4. Leave the "Account Type" dropdown as default (not selected)
5. Enter initial balance
6. Click the "Save Account" button
7. Verify validation error appears for account type field
8. Verify account is not created

### 2.3 Add Account with Empty Initial Balance
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Enter valid account name
4. Select an account type
5. Leave the "Initial Balance" field empty
6. Click the "Save Account" button
7. Verify validation error appears for balance field
8. Verify account is not created

### 2.4 Add Account with Negative Balance
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Enter valid account name
4. Select an account type
5. Enter a negative value in the "Initial Balance" field
6. Click the "Save Account" button
7. Verify validation error for negative balance
8. Verify account is not created

---

## 3. Add Account Form Interactions

### 3.1 Cancel Account Creation
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button to open modal
3. Enter account name
4. Select account type
5. Enter initial balance
6. Click the "Cancel" button
7. Verify the modal closes without creating account
8. Verify the accounts table remains unchanged

### 3.2 Close Modal Using Close Button
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Enter some account details
4. Click the "Close" (X) button on the modal
5. Verify the modal closes
6. Verify no account was created

### 3.3 Account Type Dropdown Selection
**Steps:**
1. Navigate to the Accounts page
2. Click the "Add Account" button
3. Click on the "Account Type" dropdown
4. Verify dropdown options are displayed
5. Select different account types (Checking, Savings, etc.)
6. Verify selection is updated in the dropdown

---

## 4. Add Account - Business Logic

### 4.1 Add Multiple Accounts Successfully
**Steps:**
1. Navigate to the Accounts page
2. Create first account with name "Test Account 1" and type "Checking"
3. Verify first account appears in table
4. Click "Add Account" again
5. Create second account with name "Test Account 2" and type "Savings"
6. Verify both accounts appear in the accounts table
7. Verify account count increased

### 4.2 Verify New Account Appears in Accounts List
**Steps:**
1. Navigate to the Accounts page and note the current account count
2. Click "Add Account" button
3. Create a new account with unique name "NewTestAccount_[timestamp]"
4. Verify success message appears
5. Verify account count increased by 1
6. Verify the new account is visible in the accounts table
7. Search for the new account by name to confirm it exists

### 4.3 Verify Account Details Are Saved Correctly
**Steps:**
1. Navigate to the Accounts page
2. Create account with specific details: Name="DetailTest", Type="Savings", Balance=$5,000
3. Verify account appears in table
4. Click on the account name to view details
5. Verify all entered details match the saved account data

---

## 5. Add Account - Accessibility & UI

### 5.1 Verify Modal Title and Description
**Steps:**
1. Navigate to the Accounts page
2. Click "Add Account" button
3. Verify modal title is "Add New Account"
4. Verify description text is present
5. Verify all form labels are visible

### 5.2 Verify Required Field Indicators
**Steps:**
1. Navigate to the Accounts page
2. Click "Add Account" button
3. Verify asterisks (*) appear next to required fields:
   - Account Name *
   - Account Type *
   - Initial Balance *
4. Verify "Status" and "Overdraft Protection" fields are NOT marked as required

### 5.3 Form Field Focus and Tab Order
**Steps:**
1. Navigate to the Accounts page
2. Click "Add Account" button
3. Verify Account Name field has focus initially
4. Press Tab key and verify focus moves to Account Type
5. Press Tab again and verify focus moves to Initial Balance
6. Press Tab and verify focus moves through remaining fields
7. Verify tab order is logical and usable
