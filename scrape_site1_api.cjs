const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  // Fetch the API endpoint
  console.log('=== API: /api/dashboard ===');
  const apiData = await page.evaluate(async () => {
    const res = await fetch('/api/dashboard');
    return await res.json();
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(apiData, null, 2).substring(0, 10000));

  // Fetch blog index
  console.log('\n=== BLOG INDEX ===');
  const blogData = await page.evaluate(async () => {
    const res = await fetch('/blog-index.json');
    return await res.json();
  }).catch(e => 'Error: ' + e.message);
  console.log(JSON.stringify(blogData, null, 2).substring(0, 5000));

  await browser.close();
})();
