# Playwright UI Automation

A Playwright-based UI automation testing framework for web applications.

## Description

This project provides automated UI tests using Playwright, focusing on login functionality and account management features. It includes page object models, test fixtures, and comprehensive test suites.

## Features

- Automated UI testing with Playwright
- Page Object Model implementation
- Test fixtures for common setup
- Comprehensive test coverage for login and account management
- Cross-browser testing support

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GSavitri/Playwright_UI_Automation.git
   cd Playwright_UI_Automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Usage

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/LoginPageTest.spec.ts
```

### Generating Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Project Structure

```
├── fixtures/           # Test fixtures and base configurations
├── pages/             # Page Object Model classes
│   ├── AddAccountPage.ts
│   └── LoginPage.ts
├── specs/             # Test plans and specifications
├── tests/             # Test files
│   ├── AddAccountTest.spec.ts
│   ├── LoginPageTest.spec.ts
│   └── seed.spec.ts
├── playwright-report/ # Generated test reports
└── test-results/      # Test execution results
```

## Configuration

The project uses `playwright.config.ts` for configuration. You can modify browser settings, timeouts, and other options there.
