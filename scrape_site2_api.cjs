const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  // Navigate to the site first
  await page.goto('https://www.hormuztracker.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Fetch API endpoints
  console.log('=== API: /api/ais ===');
  const aisData = await page.evaluate(async () => {
    const res = await fetch('https://www.hormuztracker.com/api/ais');
    return await res.json();
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(aisData, null, 2).substring(0, 8000));

  console.log('\n=== API: /api/oil ===');
  const oilData = await page.evaluate(async () => {
    const res = await fetch('https://www.hormuztracker.com/api/oil');
    return await res.json();
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(oilData, null, 2).substring(0, 5000));

  // Also try /api/report
  console.log('\n=== API: /api/report ===');
  const reportData = await page.evaluate(async () => {
    const res = await fetch('https://www.hormuztracker.com/api/report');
    return { status: res.status, type: res.headers.get('content-type'), url: res.url };
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(reportData, null, 2));

  await browser.close();
})();
