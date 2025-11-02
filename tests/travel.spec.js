import { test, expect } from "@playwright/test";

test("interview task – dynamic date selection", async ({ page }) => {
  page.setDefaultTimeout(25000);

  // 1️⃣ Открыть сайт
  await page.goto("https://digital.harel-group.co.il/travel-policy", { waitUntil: "domcontentloaded" });

  // 2️⃣ Нажать на “לרכישה בפעם הראשונה”
  const cta = page.locator('[data-hrl-bo="purchase-for-new-customer"]').first();
  await expect(cta).toBeVisible();
  await cta.click();

  // 3️⃣ Выбрать материк (пример — Канада)
  await page.click('div[data-hrl-bo="canada"]');
  await page.click('button[data-hrl-bo="wizard-next-button"]');

  // 4️⃣ Динамически выбрать даты (сегодня + 29 → итого 30 дней)
  const today = new Date();
  const start = today.toISOString().slice(0, 10);
  const end = new Date(today);
  end.setDate(end.getDate() + 29);
  const endDate = end.toISOString().slice(0, 10);

  console.log(`📅 Дата начала: ${start}, Дата окончания: ${endDate}`);

  // Клик по дате начала
  await page.click(`//button[@type="button" and @data-hrl-bo="${start}" and @aria-pressed="false"]`);

  // Клик по дате окончания
  await page.click(`//button[@type="button" and @data-hrl-bo="${endDate}" and @aria-pressed="false"]`);

  // 5️⃣ Проверка “סה"כ: 30 ימים”
  const totalDays = page.locator('[data-hrl-bo="total-days"]');
  await expect(totalDays).toBeVisible();
  await expect(totalDays).toContainText("30");

  // 6️⃣ Проверить, что выбраны 2 даты (подсвечены)
  const selected = await page.locator('button[aria-pressed="true"]').count();
  console.log(`📆 Подсвечено дат: ${selected}`);
  expect(selected).toBeGreaterThanOrEqual(2);

  // 7️⃣ Скриншот после выбора дат
  await page.screenshot({ path: "screenshots/dates-selected.png", fullPage: true });

  // 8️⃣ Нажать “далее” к экрану пассажиров
  await page.click('button[data-hrl-bo="wizard-next-button"]');

  // 9️⃣ Проверить, что открылось поле “Имя”
  const firstName = page.locator('//input[@data-hrl-bo="firstNameHebrew_0_input"]');
  await expect(firstName).toBeVisible();
  await expect(firstName).toBeEditable();

  console.log("✅ Тест успешно завершён – переход к экрану пассажиров");
});
