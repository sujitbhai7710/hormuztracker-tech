const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  // Visit the press page
  console.log('=== Press Page ===');
  await page.goto('https://www.hormuztracker.com/press', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  const pressText = await page.evaluate(() => document.body.innerText);
  console.log(pressText.substring(0, 3000));

  // Also check the Korean embed page
  console.log('\n=== Korean Embed ===');
  await page.goto('https://www.hormuztracker.com/ko/embed', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  const koEmbedText = await page.evaluate(() => document.body.innerText);
  console.log(koEmbedText.substring(0, 1500));

  await browser.close();
})();
