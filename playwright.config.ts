import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'test-results',
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:4173',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'bun run preview',
    url: 'http://localhost:4173/health',
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
