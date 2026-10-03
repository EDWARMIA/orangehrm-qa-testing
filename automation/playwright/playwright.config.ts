import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  // Reportes
  reporter: [
    ['list'],
    ['html', {
      open: 'never'
    }]
  ],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

});