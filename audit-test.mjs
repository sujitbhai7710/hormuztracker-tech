import { chromium } from '@playwright/test';
import fs from 'fs';

const SITE = 'https://hormuztracker-tech.pages.dev/';

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const results = {
    cssLoaded: null,
    dashboardData: null,
    straitStatus: null,
    shipCount: null,
    oilPrices: null,
    warRisk: null,
    navLinks: [],
    newPages: {},
    interactiveMap: null,
    tradingViewChart: null,
    carrierCards: null,
    routeCalculator: null,
    timelineFilters: null,
    faqAccordion: null,
    mobileMenu: null,
    jsErrors: [],
    missingAssets: [],
    screenshots: [],
    referenceGaps: [],
  };

  // Collect console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.jsErrors.push(msg.text());
    }
  });

  // Collect failed requests
  page.on('requestfailed', req => {
    results.missingAssets.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  console.log('=== 1. Loading homepage ===');
  try {
    await page.goto(SITE, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'audit-screenshots/01-homepage.png', fullPage: true });
    results.screenshots.push('01-homepage.png');
    console.log('Homepage loaded');
  } catch (e) {
    console.log('Homepage load error:', e.message);
    await page.screenshot({ path: 'audit-screenshots/01-homepage-error.png', fullPage: true });
  }

  // === CHECK 1: CSS IS LOADED ===
  console.log('\n=== 2. Checking CSS ===');
  try {
    const bodyBg = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontFamily: computed.fontFamily,
        display: computed.display,
      };
    });
    console.log('Body styles:', bodyBg);

    // Check for dark background
    const bodyStyles = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const darkBgElements = [];
      for (const el of allElements) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg.includes('5') && bg.includes('10') || bg.includes('5, 10, 20') || bg === 'rgb(5, 10, 20)') {
          darkBgElements.push({ tag: el.tagName, bg, id: el.id, class: el.className?.toString()?.slice(0, 50) });
        }
      }
      return darkBgElements.slice(0, 10);
    });
    console.log('Dark bg elements found:', darkBgElements.length > 0 ? 'YES' : 'NO', darkBgElements);

    // Check for glass-morphism (backdrop-filter)
    const glassElements = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const glass = [];
      for (const el of allElements) {
        const bf = window.getComputedStyle(el).backdropFilter;
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bf && bf !== 'none') {
          glass.push({ tag: el.tagName, backdropFilter: bf, class: el.className?.toString()?.slice(0, 50) });
        }
        // Also check for rgba backgrounds (translucent)
        if (bg.includes('rgba')) {
          glass.push({ tag: el.tagName, bg, class: el.className?.toString()?.slice(0, 50) });
        }
      }
      return glass.slice(0, 10);
    });
    console.log('Glass-morphism elements:', glassElements.length > 0 ? 'YES' : 'NO', glassElements);

    // Check for CSS files loaded
    const cssFiles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    });
    console.log('CSS files loaded:', cssFiles);

    // Check inline styles
    const inlineStyles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('style')).map(s => s.textContent?.slice(0, 200));
    });
    console.log('Inline style blocks:', inlineStyles.length, inlineStyles.map(s => s?.slice(0, 80)));

    // Check computed background of main container
    const mainBg = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const main = document.querySelector('main') || document.querySelector('#app') || document.querySelector('.app');
      return {
        htmlBg: window.getComputedStyle(root).backgroundColor,
        bodyBg: window.getComputedStyle(body).backgroundColor,
        mainBg: main ? window.getComputedStyle(main).backgroundColor : 'no main element',
        bodyClasses: body.className,
        bodyChildren: body.children.length,
        bodyHTML: body.innerHTML.slice(0, 500),
      };
    });
    console.log('Backgrounds:', mainBg);

    results.cssLoaded = {
      bodyBg: bodyBg.backgroundColor,
      darkBgElements: darkBgElements.length > 0,
      glassElements: glassElements.length > 0,
      cssFiles,
    };
  } catch (e) {
    console.log('CSS check error:', e.message);
    results.cssLoaded = { error: e.message };
  }

  // === CHECK 2: Dashboard Data ===
  console.log('\n=== 3. Checking Dashboard Data ===');
  try {
    const pageText = await page.textContent('body');
    console.log('Page text length:', pageText?.length);
    console.log('First 1000 chars:', pageText?.slice(0, 1000));

    // Look for specific dashboard content
    const dashboardContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      return {
        hasStraitStatus: text.includes('RESTRICTED') || text.includes('CLOSED') || text.includes('OPEN'),
        hasShipCount: /\d+/.test(text) && (text.includes('ship') || text.includes('vessel') || text.includes('transit')),
        hasOilPrice: text.includes('Brent') || text.includes('WTI') || text.includes('oil'),
        hasWarRisk: text.includes('war') || text.includes('insurance') || text.includes('risk'),
        fullText: text.slice(0, 2000),
      };
    });
    console.log('Dashboard content:', dashboardContent);
    results.dashboardData = dashboardContent;
  } catch (e) {
    console.log('Dashboard check error:', e.message);
  }

  // === CHECK 3-6: Specific values ===
  console.log('\n=== 4. Checking specific values ===');
  try {
    const specificValues = await page.evaluate(() => {
      const text = document.body.textContent || '';
      return {
        straitStatus: text.includes('RESTRICTED') ? 'RESTRICTED found' :
                       text.includes('CLOSED') ? 'CLOSED found (WRONG!)' :
                       text.includes('OPEN') ? 'OPEN found' : 'No strait status found',
        shipCount33: text.includes('33') ? '33 found somewhere' : '33 not found',
        brent: text.includes('Brent'),
        wti: text.includes('WTI'),
        ttf: text.includes('TTF'),
        gasoline: text.includes('Gasoline') || text.includes('gasoline') || text.includes('RBOB'),
        warRisk8: text.includes('8%') || text.includes('8.0%') ? '8% found' :
                   text.includes('3%') || text.includes('3.0%') ? '3% found (WRONG!)' : 'No war risk % found',
        // Find all numbers that look like oil prices
        pricePatterns: text.match(/\$[\d,.]+/g)?.slice(0, 10) || [],
        percentPatterns: text.match(/\d+(\.\d+)?%/g)?.slice(0, 10) || [],
      };
    });
    console.log('Specific values:', specificValues);
    results.straitStatus = specificValues.straitStatus;
    results.shipCount = specificValues.shipCount33;
    results.oilPrices = { brent: specificValues.brent, wti: specificValues.wti, ttf: specificValues.ttf, gasoline: specificValues.gasoline };
    results.warRisk = specificValues.warRisk;
  } catch (e) {
    console.log('Specific values error:', e.message);
  }

  // === CHECK 7: Navigation Links ===
  console.log('\n=== 5. Checking Navigation ===');
  try {
    const navLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('nav a, header a, .nav a, [role="navigation"] a');
      return Array.from(links).map(a => ({
        href: a.href,
        text: a.textContent?.trim(),
        isActive: a.classList.contains('active') || a.getAttribute('aria-current') === 'page',
      }));
    });
    console.log('Nav links found:', navLinks);
    results.navLinks = navLinks;
  } catch (e) {
    console.log('Nav check error:', e.message);
  }

  // === CHECK 8: Visit new pages ===
  const newPages = ['/oil-explained', '/lng-explained', '/exposure'];
  for (const path of newPages) {
    console.log(`\n=== Visiting ${path} ===`);
    try {
      await page.goto(`${SITE}${path}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2000);
      const screenshotName = `audit-screenshots/${path.replace(/\//g, '_')}.png`;
      await page.screenshot({ path: screenshotName, fullPage: true });
      results.screenshots.push(screenshotName);

      const pageContent = await page.evaluate(() => {
        const text = document.body.textContent || '';
        return {
          title: document.title,
          textLength: text.length,
          first500: text.slice(0, 500),
          hasContent: text.length > 100,
          cssLoaded: window.getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)',
        };
      });
      console.log(`${path} content:`, pageContent);
      results.newPages[path] = pageContent;
    } catch (e) {
      console.log(`${path} error:`, e.message);
      results.newPages[path] = { error: e.message };
    }
  }

  // === CHECK 9: Interactive Map ===
  console.log('\n=== 6. Checking /map ===');
  try {
    await page.goto(`${SITE}map`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'audit-screenshots/map.png', fullPage: true });
    results.screenshots.push('map.png');

    const mapContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const canvas = document.querySelectorAll('canvas');
      const mapDiv = document.querySelectorAll('[class*="map"], [id*="map"], .leaflet-container, .maplibregl-map');
      const iframes = document.querySelectorAll('iframe');
      return {
        hasCanvas: canvas.length > 0,
        canvasCount: canvas.length,
        hasMapDiv: mapDiv.length > 0,
        mapDivCount: mapDiv.length,
        hasIframe: iframes.length > 0,
        text: text.slice(0, 300),
        allDivClasses: Array.from(document.querySelectorAll('div')).map(d => d.className?.toString()?.slice(0, 50)).filter(c => c.includes('map') || c.includes('leaflet') || c.includes('maplibre')).slice(0, 5),
      };
    });
    console.log('Map content:', mapContent);
    results.interactiveMap = mapContent;
  } catch (e) {
    console.log('Map error:', e.message);
    results.interactiveMap = { error: e.message };
  }

  // === CHECK 10: TradingView Chart ===
  console.log('\n=== 7. Checking /oil ===');
  try {
    await page.goto(`${SITE}oil`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'audit-screenshots/oil.png', fullPage: true });
    results.screenshots.push('oil.png');

    const oilContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const tradingview = document.querySelectorAll('[class*="tradingview"], [id*="tradingview"], .tradingview-widget-container');
      const iframes = document.querySelectorAll('iframe');
      const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src).filter(s => s.includes('tradingview'));
      return {
        hasTradingview: tradingview.length > 0 || scripts.length > 0,
        tradingviewCount: tradingview.length,
        iframes: iframes.length,
        scripts,
        text: text.slice(0, 500),
      };
    });
    console.log('Oil page content:', oilContent);
    results.tradingViewChart = oilContent;
  } catch (e) {
    console.log('Oil page error:', e.message);
    results.tradingViewChart = { error: e.message };
  }

  // === CHECK 11: Carrier Cards ===
  console.log('\n=== 8. Checking /carriers ===');
  try {
    await page.goto(`${SITE}carriers`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'audit-screenshots/carriers.png', fullPage: true });
    results.screenshots.push('carriers.png');

    const carrierContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const cards = document.querySelectorAll('[class*="card"], [class*="carrier"]');
      return {
        cardCount: cards.length,
        text: text.slice(0, 500),
        hasCarrierNames: text.includes('MSC') || text.includes('Maersk') || text.includes('COSCO') || text.includes('Evergreen') || text.includes('Hapag'),
      };
    });
    console.log('Carriers content:', carrierContent);
    results.carrierCards = carrierContent;
  } catch (e) {
    console.log('Carriers error:', e.message);
    results.carrierCards = { error: e.message };
  }

  // === CHECK 12: Route Calculator ===
  console.log('\n=== 9. Checking /routes ===');
  try {
    await page.goto(`${SITE}routes`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'audit-screenshots/routes.png', fullPage: true });
    results.screenshots.push('routes.png');

    const routeContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const inputs = document.querySelectorAll('input, select');
      const buttons = document.querySelectorAll('button');
      return {
        inputCount: inputs.length,
        buttonCount: buttons.length,
        text: text.slice(0, 500),
        hasCalculator: text.includes('calculator') || text.includes('Calculate') || text.includes('route') || inputs.length > 0,
      };
    });
    console.log('Routes content:', routeContent);
    results.routeCalculator = routeContent;
  } catch (e) {
    console.log('Routes error:', e.message);
    results.routeCalculator = { error: e.message };
  }

  // === CHECK 13: Timeline Filters ===
  console.log('\n=== 10. Checking /timeline ===');
  try {
    await page.goto(`${SITE}timeline`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'audit-screenshots/timeline.png', fullPage: true });
    results.screenshots.push('timeline.png');

    const timelineContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const buttons = document.querySelectorAll('button');
      const selects = document.querySelectorAll('select');
      return {
        buttonCount: buttons.length,
        selectCount: selects.length,
        text: text.slice(0, 500),
        hasFilters: text.includes('filter') || text.includes('Filter') || selects.length > 0,
        hasTimeline: text.includes('timeline') || text.includes('Timeline') || text.includes('event') || text.includes('Event'),
      };
    });
    console.log('Timeline content:', timelineContent);
    results.timelineFilters = timelineContent;
  } catch (e) {
    console.log('Timeline error:', e.message);
    results.timelineFilters = { error: e.message };
  }

  // === CHECK 14: FAQ Accordion ===
  console.log('\n=== 11. Checking /faq ===');
  try {
    await page.goto(`${SITE}faq`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'audit-screenshots/faq.png', fullPage: true });
    results.screenshots.push('faq.png');

    const faqContent = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const details = document.querySelectorAll('details');
      const accordions = document.querySelectorAll('[class*="accordion"], [class*="faq"], [data-accordion]');
      return {
        detailsCount: details.length,
        accordionCount: accordions.length,
        text: text.slice(0, 500),
        hasFAQ: text.includes('FAQ') || text.includes('Frequently') || text.includes('question'),
      };
    });
    console.log('FAQ content:', faqContent);

    // Test accordion click
    if (faqContent.detailsCount > 0 || faqContent.accordionCount > 0) {
      const firstDetail = await page.$('details');
      if (firstDetail) {
        await firstDetail.click();
        await page.waitForTimeout(500);
        const isOpen = await firstDetail.evaluate(el => el.hasAttribute('open'));
        console.log('Accordion opens on click:', isOpen);
      }
    }

    results.faqAccordion = faqContent;
  } catch (e) {
    console.log('FAQ error:', e.message);
    results.faqAccordion = { error: e.message };
  }

  // === CHECK 15: Mobile Menu ===
  console.log('\n=== 12. Checking Mobile Menu ===');
  try {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(SITE, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'audit-screenshots/mobile-home.png', fullPage: true });

    const mobileMenu = await page.evaluate(() => {
      const hamburger = document.querySelector('[class*="hamburger"], [class*="menu-toggle"], [class*="burger"], button[aria-label*="menu"], button[aria-label*="Menu"], [class*="mobile-menu"]');
      const nav = document.querySelector('nav, [role="navigation"]');
      return {
        hasHamburger: !!hamburger,
        hamburgerClass: hamburger?.className,
        navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false,
        navClass: nav?.className,
      };
    });
    console.log('Mobile menu:', mobileMenu);

    // Try clicking hamburger
    const hamburger = await page.$('[class*="hamburger"], [class*="menu-toggle"], [class*="burger"], button[aria-label*="menu"], button[aria-label*="Menu"], [class*="mobile-menu"]');
    if (hamburger) {
      await hamburger.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'audit-screenshots/mobile-menu-open.png', fullPage: true });
      const menuOpen = await page.evaluate(() => {
        const nav = document.querySelector('nav, [role="navigation"]');
        return {
          navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false,
          navHeight: nav ? window.getComputedStyle(nav).height : 'N/A',
        };
      });
      console.log('Menu after click:', menuOpen);
    }

    results.mobileMenu = mobileMenu;

    // Reset viewport
    await page.setViewportSize({ width: 1440, height: 900 });
  } catch (e) {
    console.log('Mobile menu error:', e.message);
    results.mobileMenu = { error: e.message };
  }

  // === CHECK 16-17: JS Errors and Missing Assets (collected throughout) ===
  console.log('\n=== 13. Summary of Errors ===');
  console.log('JS Errors:', results.jsErrors);
  console.log('Missing Assets:', results.missingAssets);

  // === REFERENCE SITE COMPARISON ===
  console.log('\n=== 14. Visiting reference site 1: hormuzstraitmonitor.com ===');
  try {
    const refPage = await context.newPage();
    await refPage.goto('https://hormuzstraitmonitor.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await refPage.waitForTimeout(3000);
    await refPage.screenshot({ path: 'audit-screenshots/ref-site1.png', fullPage: true });

    const ref1Content = await refPage.evaluate(() => {
      const text = document.body.textContent || '';
      return {
        title: document.title,
        textLength: text.length,
        first1000: text.slice(0, 1000),
        features: {
          hasMap: text.includes('map') || text.includes('Map'),
          hasShips: text.includes('ship') || text.includes('vessel'),
          hasOil: text.includes('oil') || text.includes('Oil'),
          hasInsurance: text.includes('insurance') || text.includes('risk'),
          hasNews: text.includes('news') || text.includes('News') || text.includes('alert'),
          hasTimeline: text.includes('timeline') || text.includes('Timeline'),
        },
        navLinks: Array.from(document.querySelectorAll('nav a, header a')).map(a => ({ text: a.textContent?.trim(), href: a.href })).slice(0, 20),
      };
    });
    console.log('Reference site 1:', ref1Content);
    results.reference1 = ref1Content;
    await refPage.close();
  } catch (e) {
    console.log('Reference site 1 error:', e.message);
  }

  console.log('\n=== 15. Visiting reference site 2: hormuztracker.com ===');
  try {
    const refPage2 = await context.newPage();
    await refPage2.goto('https://hormuztracker.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await refPage2.waitForTimeout(3000);
    await refPage2.screenshot({ path: 'audit-screenshots/ref-site2.png', fullPage: true });

    const ref2Content = await refPage2.evaluate(() => {
      const text = document.body.textContent || '';
      return {
        title: document.title,
        textLength: text.length,
        first1000: text.slice(0, 1000),
        features: {
          hasMap: text.includes('map') || text.includes('Map'),
          hasShips: text.includes('ship') || text.includes('vessel'),
          hasOil: text.includes('oil') || text.includes('Oil'),
          hasInsurance: text.includes('insurance') || text.includes('risk'),
          hasNews: text.includes('news') || text.includes('News') || text.includes('alert'),
          hasTimeline: text.includes('timeline') || text.includes('Timeline'),
        },
        navLinks: Array.from(document.querySelectorAll('nav a, header a')).map(a => ({ text: a.textContent?.trim(), href: a.href })).slice(0, 20),
      };
    });
    console.log('Reference site 2:', ref2Content);
    results.reference2 = ref2Content;
    await refPage2.close();
  } catch (e) {
    console.log('Reference site 2 error:', e.message);
  }

  // Write results
  fs.writeFileSync('audit-screenshots/audit-results.json', JSON.stringify(results, null, 2));
  console.log('\n=== AUDIT COMPLETE ===');
  console.log('Results saved to audit-screenshots/audit-results.json');

  await browser.close();
  return results;
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
