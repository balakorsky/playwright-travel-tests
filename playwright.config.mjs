import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer'
      ],
    },
  },
  reporter: [['list']],
});
