const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  // Navigate to the site first
  await page.goto('https://hormuzstraitmonitor.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Fetch the API endpoint with full URL
  console.log('=== API: /api/dashboard ===');
  const apiData = await page.evaluate(async () => {
    const res = await fetch('https://hormuzstraitmonitor.com/api/dashboard');
    return await res.json();
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(apiData, null, 2).substring(0, 15000));

  // Fetch blog index
  console.log('\n=== BLOG INDEX ===');
  const blogData = await page.evaluate(async () => {
    const res = await fetch('https://hormuzstraitmonitor.com/blog-index.json');
    return await res.json();
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(blogData, null, 2).substring(0, 5000));

  await browser.close();
})();
