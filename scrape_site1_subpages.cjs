const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  const subPages = [
    { name: 'Blog', url: 'https://hormuzstraitmonitor.com/blog/' },
    { name: 'About', url: 'https://hormuzstraitmonitor.com/about/' },
    { name: 'News', url: 'https://hormuzstraitmonitor.com/news/' },
    { name: 'FAQ', url: 'https://hormuzstraitmonitor.com/faq/' },
    { name: 'Oil Explained', url: 'https://hormuzstraitmonitor.com/oil-explained/' },
    { name: 'LNG Explained', url: 'https://hormuzstraitmonitor.com/lng-explained/' },
    { name: 'Alternative Routes', url: 'https://hormuzstraitmonitor.com/alternative-routes/' },
    { name: 'Japan Region', url: 'https://hormuzstraitmonitor.com/regions/japan/' },
    { name: 'South Korea Region', url: 'https://hormuzstraitmonitor.com/regions/south-korea/' },
    { name: 'China Region', url: 'https://hormuzstraitmonitor.com/regions/china/' },
    { name: 'India Region', url: 'https://hormuzstraitmonitor.com/regions/india/' },
    { name: 'EU Region', url: 'https://hormuzstraitmonitor.com/regions/european-union/' },
    { name: 'Advertise', url: 'https://hormuzstraitmonitor.com/advertise/' },
  ];
  
  for (const p of subPages) {
    try {
      console.log(`\n=== ${p.name}: ${p.url} ===`);
      await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);
      
      const title = await page.title();
      console.log('Title:', title);
      
      // Screenshot
      const slug = p.name.toLowerCase().replace(/\s+/g, '_');
      await page.screenshot({ path: `/home/z/my-project/screenshots/site1_${slug}.png`, fullPage: true });
      
      // Body text
      const bodyText = await page.evaluate(() => document.body.innerText);
      console.log(bodyText.substring(0, 3000));
      
      // Links specific to this page
      const links = await page.$$eval('a', els => 
        els.map(el => ({ text: el.textContent.trim().substring(0, 60), href: el.href }))
          .filter(l => l.text && l.href.includes('hormuzstraitmonitor') && !l.href.includes('#'))
      ).catch(() => []);
      const uniquePageLinks = [...new Map(links.map(l => [l.href, l])).values()];
      if (uniquePageLinks.length > 0) {
        console.log('\nPage-specific links:');
        uniquePageLinks.forEach(l => console.log(`  "${l.text}" -> ${l.href}`));
      }
      
    } catch (e) {
      console.error(`Error on ${p.name}:`, e.message);
    }
  }
  
  await browser.close();
})();
