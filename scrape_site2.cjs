const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  console.log('=== SITE 2: hormuztracker.com ===\n');
  
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
  
  try {
    console.log('Loading homepage...');
    await page.goto('https://www.hormuztracker.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(5000);
    
    await page.screenshot({ path: '/home/z/my-project/screenshots/site2_home.png', fullPage: true });
    console.log('Screenshot saved: site2_home.png');
    
    const title = await page.title();
    console.log('Page Title:', title);
    
    // Navigation
    console.log('\n--- NAVIGATION ---');
    const navItems = await page.$$eval('nav a, header a, .nav a, .menu a, [role="navigation"] a, .navbar a, .header a', els => 
      els.map(el => ({ text: el.textContent.trim(), href: el.href }))
    ).catch(() => []);
    navItems.forEach(item => console.log(`  ${item.text} -> ${item.href}`));
    
    // All links
    console.log('\n--- ALL LINKS ---');
    const allLinks = await page.$$eval('a', els => 
      els.map(el => ({ text: el.textContent.trim().substring(0, 100), href: el.href }))
        .filter(l => l.text && l.href && !l.href.startsWith('javascript'))
    ).catch(() => []);
    const uniqueLinks = [...new Map(allLinks.map(l => [l.href, l])).values()];
    uniqueLinks.forEach(item => console.log(`  "${item.text}" -> ${item.href}`));
    
    // Page text
    console.log('\n--- PAGE TEXT CONTENT ---');
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(bodyText.substring(0, 10000));
    
    // Data elements
    console.log('\n--- DATA/STAT ELEMENTS ---');
    const dataElements = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      const results = [];
      all.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length < 300 && /(\d+[\d,.]*\s*(bpd|barrel|vessel|ship|tanker|transit|million|billion|%|MT|metric|ton|crude|lng|lpg|oil|gas|dwt))/i.test(text)) {
          if (el.children.length <= 3) {
            results.push({ tag: el.tagName, text: text.substring(0, 200), id: el.id, class: el.className?.toString()?.substring(0, 100) });
          }
        }
      });
      return results.slice(0, 50);
    }).catch(() => []);
    dataElements.forEach(d => console.log(`  <${d.tag} id="${d.id}" class="${d.class}"> ${d.text}`));
    
    // Maps
    const mapElements = await page.$$eval('[id*="map"], [class*="map"], iframe[src*="map"], [id*="Map"], [class*="Map"], [id*="leaflet"], [class*="leaflet"]', els => 
      els.map(el => ({ tag: el.tagName, id: el.id, class: el.className, src: el.src || '' }))
    ).catch(() => []);
    console.log('\nMap elements:', mapElements);
    
    // Charts
    const chartElements = await page.$$eval('canvas, [class*="chart"], [id*="chart"], [class*="Chart"], [id*="Chart"], svg', els => 
      els.map(el => ({ tag: el.tagName, id: el.id, class: el.className?.toString()?.substring(0, 80), width: el.width, height: el.height }))
    ).catch(() => []);
    console.log('Chart/Canvas/SVG elements:', chartElements.length);
    chartElements.slice(0, 10).forEach(c => console.log(`  <${c.tag} id="${c.id}" class="${c.class}">`));
    
    // Iframes
    const iframes = await page.$$eval('iframe', els => els.map(el => ({ src: el.src, title: el.title, id: el.id }))).catch(() => []);
    console.log('Iframes:', iframes);
    
    // Form elements
    const formElements = await page.$$eval('input, select, button, [role="button"], [role="combobox"]', els => 
      els.map(el => ({ tag: el.tagName, type: el.type || '', placeholder: el.placeholder || '', text: el.textContent?.trim()?.substring(0, 50) || '', id: el.id, class: el.className?.toString()?.substring(0, 80) }))
    ).catch(() => []);
    console.log('\nForm elements:', formElements.length);
    formElements.slice(0, 30).forEach(f => console.log(`  <${f.tag} type="${f.type}" placeholder="${f.placeholder}" id="${f.id}" class="${f.class}"> ${f.text}`));
    
    // API endpoints
    console.log('\n--- API ENDPOINTS ---');
    apiRequests.forEach(r => console.log(`  [${r.status}] ${r.contentType} -> ${r.url}`));
    
    // Script tags with data
    console.log('\n--- SCRIPT TAGS WITH DATA ---');
    const scriptData = await page.$$eval('script', els => 
      els.map(el => el.textContent.substring(0, 500))
        .filter(t => t.includes('data') || t.includes('api') || t.includes('endpoint') || t.includes('fetch') || t.includes('axios') || t.includes('config') || t.includes('__NEXT_DATA__'))
    ).catch(() => []);
    scriptData.slice(0, 10).forEach((s, i) => console.log(`  Script ${i}:`, s.substring(0, 400)));
    
    // Check for __NEXT_DATA__
    const nextData = await page.evaluate(() => {
      const el = document.getElementById('__NEXT_DATA__');
      return el ? el.textContent.substring(0, 3000) : null;
    }).catch(() => null);
    if (nextData) {
      console.log('\n--- NEXT_DATA ---');
      console.log(nextData);
    }
    
    // Meta tags
    console.log('\n--- META TAGS ---');
    const metaTags = await page.$$eval('meta', els => 
      els.map(el => ({ name: el.name || el.getAttribute('property') || '', content: el.content || '' }))
    ).catch(() => []);
    metaTags.forEach(m => console.log(`  ${m.name}: ${m.content}`));
    
  } catch (e) {
    console.error('Error on Site 2:', e.message);
  }
  
  await browser.close();
})();
