 Playwright Travel Tests

Automated **end-to-end tests** built with **Playwright** for validating a travel insurance web service.

---

 Overview

This repository contains UI tests written in **Playwright** using **JavaScript (ES Modules)**.  
The main goal is to verify key user flows such as selecting dates, navigating between pages, and validating UI components.

---

 Tech Stack

- **Playwright** – UI testing framework  
- **Node.js 20.x** – runtime environment  
- **GitHub Actions** – CI/CD pipeline for automated test runs  
- **GitHub Pages** – hosts the Playwright HTML test report

---

  Run Tests Locally

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Open the latest HTML report
npx playwright show-report

├── tests/
│   ├── example.spec.js        # Sample Playwright test
│   └── travel.spec.js         # Main travel date selection test
├── screenshots/               # Saved screenshots from test runs
├── playwright.config.mjs      # Playwright configuration file
├── package.json               # Dependencies and scripts
├── server.js                  # Express server (for Heroku)
└── .github/
    └── workflows/
        └── playwright.yml     # GitHub Actions workflow

