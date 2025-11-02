import { test, expect } from "@playwright/test";

test("interview task – dynamic date selection", async ({ page }) => {
  page.setDefaultTimeout(25000);

  
  await page.goto("https://digital.harel-group.co.il/travel-policy", { waitUntil: "domcontentloaded" });

 
  const cta = page.locator('[data-hrl-bo="purchase-for-new-customer"]').first();
  await expect(cta).toBeVisible();
  await cta.click();

  
  await page.click('div[data-hrl-bo="canada"]');
  await page.click('button[data-hrl-bo="wizard-next-button"]');

 
  const today = new Date();
  const start = today.toISOString().slice(0, 10);
  const end = new Date(today);
  end.setDate(end.getDate() + 29);
  const endDate = end.toISOString().slice(0, 10);

  console.log(` Start date: ${start}, End date: ${endDate}`);

  await page.click(`//button[@type="button" and @data-hrl-bo="${start}" and @aria-pressed="false"]`);

 
  await page.click(`//button[@type="button" and @data-hrl-bo="${endDate}" and @aria-pressed="false"]`);

 
  const totalDays = page.locator('[data-hrl-bo="total-days"]');
  await expect(totalDays).toBeVisible();
  await expect(totalDays).toContainText("30");

 
  const selected = await page.locator('button[aria-pressed="true"]').count();
  console.log(`dates: ${selected}`);
  expect(selected).toBeGreaterThanOrEqual(2);

  
  await page.screenshot({ path: "screenshots/dates-selected.png", fullPage: true });


  await page.click('button[data-hrl-bo="wizard-next-button"]');

 
  const firstName = page.locator('//input[@data-hrl-bo="firstNameHebrew_0_input"]');
  await expect(firstName).toBeVisible();
  await expect(firstName).toBeEditable();

  console.log("Test completeds successfully");
});
