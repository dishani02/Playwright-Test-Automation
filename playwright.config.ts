// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
//   timeout: 60000, // 60s per test
//   use: {
//     browserName: 'chromium',  // <--- force Chromium
//     headless: false,          // set true if you don't want to see UI
//     viewport: { width: 1280, height: 720 },
//     ignoreHTTPSErrors: true,
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//   },
// });


import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000, // 60s per test
  // Add retries for stability
  retries: 1,
  // Add reporter configuration
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' 
    }],
    ['json', { 
      outputFile: 'test-results.json' 
    }],
    ['list'] // Shows progress in console
  ],
  
  // Global configuration for all projects
  use: {
    browserName: 'chromium',  // <--- force Chromium
    headless: false,          // set true if you don't want to see UI
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Add trace for better debugging
    trace: 'on-first-retry',
    // Base URL for navigation
    baseURL: 'https://www.swifttranslator.com',
  },
  
  // Optional: Configure multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to test on other browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  
  // Output directory for test artifacts
  outputDir: 'test-results/',
  
  // Timeout for each expect assertion
  expect: {
    timeout: 10000, // 10 seconds for each expect
  },
  
  // Run tests in parallel (adjust based on your system)
  fullyParallel: false,
  workers: 1, // Set to 1 for sequential execution, increase for parallel
  
  // Web server configuration if you're running local dev server
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});