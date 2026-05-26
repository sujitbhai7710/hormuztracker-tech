const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  const subPages = [
    { name: 'Alternative Routes', url: 'https://www.hormuztracker.com/routes' },
    { name: 'Trade Exposure', url: 'https://www.hormuztracker.com/exposure' },
    { name: 'Data Downloads', url: 'https://www.hormuztracker.com/data' },
    { name: 'Glossary', url: 'https://www.hormuztracker.com/glossary' },
    { name: 'Methodology', url: 'https://www.hormuztracker.com/methodology' },
    { name: 'Embed Widgets', url: 'https://www.hormuztracker.com/embed' },
    { name: 'Korean Version', url: 'https://www.hormuztracker.com/ko' },
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
      await page.screenshot({ path: `/home/z/my-project/screenshots/site2_${slug}.png`, fullPage: true });
      
      // Body text
      const bodyText = await page.evaluate(() => document.body.innerText);
      console.log(bodyText.substring(0, 4000));
      
      // Links on this page
      const links = await page.$$eval('a', els => 
        els.map(el => ({ text: el.textContent.trim().substring(0, 60), href: el.href }))
          .filter(l => l.text && l.href.includes('hormuztracker') && !l.href.includes('#'))
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
