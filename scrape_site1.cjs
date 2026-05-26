const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  console.log('=== SITE 1: hormuzstraitmonitor.com ===\n');
  
  try {
    console.log('Loading homepage...');
    const apiRequests = [];
    page.on('response', response => {
      const url = response.url();
      if (url.includes('api') || url.includes('data') || url.includes('json') || url.includes('graphql') || url.includes('feed') || url.includes('ws/') || url.includes('.json')) {
        apiRequests.push({ url, status: response.status(), contentType: response.headers()['content-type'] || '' });
      }
    });

    page.on('request', request => {
      const url = request.url();
      if (url.includes('api') || url.includes('data') || url.includes('json') || url.includes('graphql') || url.includes('feed') || url.includes('ws/') || url.includes('.json')) {
        console.log('  [REQ]', request.method(), url);
      }
    });
    
    await page.goto('https://hormuzstraitmonitor.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(5000);
    
    // Take screenshot
    await page.screenshot({ path: '/home/z/my-project/screenshots/site1_home.png', fullPage: true });
    console.log('Screenshot saved: site1_home.png');
    
    // Get page title
    const title = await page.title();
    console.log('Page Title:', title);
    
    // Get all navigation items
    console.log('\n--- NAVIGATION ---');
    const navItems = await page.$$eval('nav a, header a, .nav a, .menu a, [role="navigation"] a, .navbar a, .header a', els => 
      els.map(el => ({ text: el.textContent.trim(), href: el.href }))
    ).catch(() => []);
    navItems.forEach(item => console.log(`  ${item.text} -> ${item.href}`));
    
    // Get all links
    console.log('\n--- ALL INTERNAL LINKS ---');
    const allLinks = await page.$$eval('a', els => 
      els.map(el => ({ text: el.textContent.trim().substring(0, 100), href: el.href }))
        .filter(l => l.text && l.href && !l.href.startsWith('javascript'))
    ).catch(() => []);
    const uniqueLinks = [...new Map(allLinks.map(l => [l.href, l])).values()];
    uniqueLinks.forEach(item => console.log(`  "${item.text}" -> ${item.href}`));
    
    // Get page text content
    console.log('\n--- PAGE TEXT CONTENT ---');
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(bodyText.substring(0, 8000));
    
    // Check for specific data elements
    console.log('\n--- DATA/STAT ELEMENTS ---');
    const dataElements = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      const results = [];
      all.forEach(el => {
        const text = el.textContent.trim();
        // Look for numbers with units
        if (text && text.length < 300 && /(\d+[\d,.]*\s*(bpd|barrel|vessel|ship|tanker|transit|million|billion|%|MT|metric|ton|crude|lng|lpg|oil|gas))/i.test(text)) {
          // Only add if this element has few children (to avoid duplicating parent content)
          if (el.children.length <= 3) {
            results.push({ tag: el.tagName, text: text.substring(0, 200), id: el.id, class: el.className?.toString()?.substring(0, 100) });
          }
        }
      });
      return results.slice(0, 50);
    }).catch(() => []);
    dataElements.forEach(d => console.log(`  <${d.tag} id="${d.id}" class="${d.class}"> ${d.text}`));
    
    // Check for maps
    const mapElements = await page.$$eval('[id*="map"], [class*="map"], iframe[src*="map"], [id*="Map"], [class*="Map"]', els => 
      els.map(el => ({ tag: el.tagName, id: el.id, class: el.className, src: el.src || '' }))
    ).catch(() => []);
    console.log('\nMap elements:', mapElements);
    
    // Check for charts/canvas
    const chartElements = await page.$$eval('canvas, [class*="chart"], [id*="chart"], [class*="Chart"], [id*="Chart"]', els => 
      els.map(el => ({ tag: el.tagName, id: el.id, class: el.className, width: el.width, height: el.height }))
    ).catch(() => []);
    console.log('Chart elements:', chartElements);
    
    // Check for iframes
    const iframes = await page.$$eval('iframe', els => els.map(el => ({ src: el.src, title: el.title, id: el.id }))).catch(() => []);
    console.log('Iframes:', iframes);
    
    // Check for forms/inputs/filters
    const formElements = await page.$$eval('input, select, button, [role="button"], [role="combobox"]', els => 
      els.map(el => ({ tag: el.tagName, type: el.type || '', placeholder: el.placeholder || '', text: el.textContent?.trim()?.substring(0, 50) || '', id: el.id, class: el.className?.toString()?.substring(0, 80) }))
    ).catch(() => []);
    console.log('\nForm elements:', formElements.length);
    formElements.slice(0, 30).forEach(f => console.log(`  <${f.tag} type="${f.type}" placeholder="${f.placeholder}" id="${f.id}" class="${f.class}"> ${f.text}`));
    
    // API requests captured
    console.log('\n--- API ENDPOINTS ---');
    apiRequests.forEach(r => console.log(`  [${r.status}] ${r.contentType} -> ${r.url}`));
    
    // Check for scripts with data
    console.log('\n--- SCRIPT TAGS WITH DATA ---');
    const scriptData = await page.$$eval('script', els => 
      els.map(el => el.textContent.substring(0, 500))
        .filter(t => t.includes('data') || t.includes('api') || t.includes('endpoint') || t.includes('fetch') || t.includes('axios') || t.includes('config'))
    ).catch(() => []);
    scriptData.slice(0, 10).forEach((s, i) => console.log(`  Script ${i}:`, s.substring(0, 300)));
    
    // Meta tags
    console.log('\n--- META TAGS ---');
    const metaTags = await page.$$eval('meta', els => 
      els.map(el => ({ name: el.name || el.getAttribute('property') || '', content: el.content || '' }))
    ).catch(() => []);
    metaTags.forEach(m => console.log(`  ${m.name}: ${m.content}`));

  } catch (e) {
    console.error('Error on Site 1:', e.message);
  }
  
  await browser.close();
})();
