import { chromium } from '@playwright/test';
import fs from 'fs';

const SITE = 'https://hormuztracker-tech.pages.dev/';

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // === FAQ Page Deep Dive ===
  console.log('=== FAQ Page Deep Dive ===');
  await page.goto(`${SITE}faq`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'audit-screenshots/faq-deep.png', fullPage: true });

  const faqDetails = await page.evaluate(() => {
    const text = document.body.textContent || '';
    // Find all clickable/expandable elements
    const allElements = document.querySelectorAll('*');
    const expandable = [];
    for (const el of allElements) {
      const cursor = window.getComputedStyle(el).cursor;
      const role = el.getAttribute('role');
      const tag = el.tagName;
      const cls = el.className?.toString() || '';
      if ((cursor === 'pointer' || role === 'button' || tag === 'BUTTON') && el.textContent?.trim().length > 5 && el.textContent?.trim().length < 200) {
        expandable.push({ tag, text: el.textContent?.trim().slice(0, 80), cls: cls.slice(0, 60), cursor, role });
      }
    }
    
    // Look for Svelte component islands
    const islands = document.querySelectorAll('astro-island');
    const islandInfo = Array.from(islands).map(i => ({
      componentUrl: i.getAttribute('component-url'),
      componentExport: i.getAttribute('component-export'),
      rendererUrl: i.getAttribute('renderer-url'),
      props: i.getAttribute('props')?.slice(0, 100),
    }));
    
    return {
      textLength: text.length,
      first2000: text.slice(0, 2000),
      expandable,
      islandCount: islands.length,
      islands: islandInfo,
      hasQuestionText: text.includes('What') || text.includes('How') || text.includes('Why'),
      detailsElements: document.querySelectorAll('details').length,
      summaryElements: document.querySelectorAll('summary').length,
    };
  });
  console.log('FAQ Details:', JSON.stringify(faqDetails, null, 2));

  // Try clicking a FAQ item if we find one
  const faqClickTarget = await page.$('.faq-item, [class*="faq"] button, [class*="accordion"], .question');
  if (faqClickTarget) {
    await faqClickTarget.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'audit-screenshots/faq-clicked.png', fullPage: true });
    console.log('Clicked a FAQ item');
  } else {
    console.log('No FAQ click target found');
  }

  // === Mobile Menu Deep Dive ===
  console.log('\n=== Mobile Menu Deep Dive ===');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'audit-screenshots/mobile-deep.png', fullPage: true });

  const mobileDetails = await page.evaluate(() => {
    const text = document.body.textContent || '';
    const allButtons = document.querySelectorAll('button');
    const buttonInfo = Array.from(allButtons).map(b => ({
      text: b.textContent?.trim().slice(0, 50),
      cls: b.className?.toString().slice(0, 60),
      ariaLabel: b.getAttribute('aria-label'),
      visible: b.offsetParent !== null || b.offsetWidth > 0,
      rect: b.getBoundingClientRect(),
    }));
    
    // Check for hamburger icon (usually SVG or 3 lines)
    const svgs = document.querySelectorAll('svg');
    const svgInfo = Array.from(svgs).map(s => ({
      cls: s.className?.toString().slice(0, 60),
      parentTag: s.parentElement?.tagName,
      parentCls: s.parentElement?.className?.toString().slice(0, 60),
      viewBox: s.getAttribute('viewBox'),
      visible: s.offsetParent !== null,
    }));
    
    // Check nav visibility
    const nav = document.querySelector('nav');
    const navComputed = nav ? {
      display: window.getComputedStyle(nav).display,
      visibility: window.getComputedStyle(nav).visibility,
      height: window.getComputedStyle(nav).height,
      overflow: window.getComputedStyle(nav).overflow,
      position: window.getComputedStyle(nav).position,
    } : null;
    
    return {
      buttonCount: allButtons.length,
      buttons: buttonInfo,
      svgCount: svgs.length,
      svgs: svgInfo,
      navComputed,
      bodyHTML: document.body.innerHTML.slice(0, 3000),
    };
  });
  console.log('Mobile buttons:', mobileDetails.buttons.length);
  console.log('Mobile buttons visible:', mobileDetails.buttons.filter(b => b.visible));
  console.log('SVGs:', mobileDetails.svgs.filter(s => s.visible));
  console.log('Nav computed:', mobileDetails.navComputed);

  // Try to find and click menu toggle
  const menuButton = await page.$('button[aria-label*="menu"], button[aria-label*="Menu"], button[aria-label*="Toggle"], button[aria-label*="Navigation"], .menu-toggle, .hamburger, [class*="menu-btn"]');
  if (menuButton) {
    console.log('Found menu button, clicking...');
    await menuButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'audit-screenshots/mobile-menu-opened.png', fullPage: true });
  } else {
    console.log('No menu button found. Looking for all buttons...');
    // Try clicking each visible button
    for (const btn of mobileDetails.buttons) {
      if (btn.visible && (btn.text.includes('Menu') || btn.text.includes('≡') || btn.cls.includes('menu') || btn.cls.includes('toggle') || btn.cls.includes('nav'))) {
        console.log('Trying button:', btn);
      }
    }
  }

  // === Map Page Deep Dive ===
  console.log('\n=== Map Page Deep Dive ===');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${SITE}map`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'audit-screenshots/map-deep.png', fullPage: true });

  const mapDeep = await page.evaluate(() => {
    const leafletContainers = document.querySelectorAll('.leaflet-container');
    const tiles = document.querySelectorAll('.leaflet-tile');
    const tileImages = document.querySelectorAll('.leaflet-tile img');
    const markers = document.querySelectorAll('.leaflet-marker-icon, .leaflet-marker');
    const popups = document.querySelectorAll('.leaflet-popup');
    
    // Check if tiles actually loaded images
    const tileLoadStatus = Array.from(tileImages).slice(0, 5).map(img => ({
      src: img.src?.slice(0, 80),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
    }));
    
    return {
      leafletContainers: leafletContainers.length,
      tiles: tiles.length,
      tileImages: tileImages.length,
      markers: markers.length,
      popups: popups.length,
      tileLoadStatus,
      mapHasDimensions: leafletContainers.length > 0 ? {
        width: leafletContainers[0].offsetWidth,
        height: leafletContainers[0].offsetHeight,
      } : null,
    };
  });
  console.log('Map deep details:', JSON.stringify(mapDeep, null, 2));

  // === Check remaining pages we haven't tested ===
  const additionalPages = ['/insurance', '/news', '/regions', '/seizures', '/blog', '/data', '/embed', '/glossary', '/methodology', '/about'];
  const pageResults = {};
  
  for (const p of additionalPages) {
    console.log(`\n=== Checking ${p} ===`);
    try {
      await page.goto(`${SITE}${p}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1500);
      const screenshotName = `audit-screenshots/${p.replace(/\//g, '_')}.png`;
      await page.screenshot({ path: screenshotName, fullPage: false });
      
      const pContent = await page.evaluate(() => {
        const text = document.body.textContent || '';
        return {
          title: document.title,
          textLength: text.length,
          first300: text.slice(0, 300),
          hasContent: text.length > 200,
          cssLoaded: window.getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)',
          bg: window.getComputedStyle(document.body).backgroundColor,
        };
      });
      pageResults[p] = pContent;
      console.log(`${p}: content=${pContent.textLength}, css=${pContent.cssLoaded}, bg=${pContent.bg}`);
    } catch (e) {
      pageResults[p] = { error: e.message };
      console.log(`${p}: ERROR - ${e.message}`);
    }
  }

  // === Final check: Dashboard Svelte hydration ===
  console.log('\n=== Dashboard Svelte Hydration Check ===');
  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'audit-screenshots/dashboard-final.png', fullPage: true });

  const hydrationCheck = await page.evaluate(() => {
    const islands = document.querySelectorAll('astro-island');
    const svelteComponents = [];
    
    for (const island of islands) {
      const props = island.getAttribute('props');
      const componentUrl = island.getAttribute('component-url');
      svelteComponents.push({
        componentUrl,
        propsLength: props?.length,
        hasChildren: island.children.length > 0,
        innerHTMLLength: island.innerHTML.length,
      });
    }
    
    // Check for reactive data (Svelte stores)
    const text = document.body.textContent || '';
    const dataPoints = {
      hasLiveTimestamp: text.includes('Updated') || text.includes('updated') || text.includes('Live'),
      hasRealTimeCounter: text.includes('Day') && text.includes('87'),
      hasDWTData: text.includes('DWT') || text.includes('dwt'),
      hasShipTransitData: text.includes('transit') || text.includes('Transit'),
      hasCountryData: text.includes('China') || text.includes('Japan') || text.includes('India') || text.includes('Korea'),
      hasInsuranceData: text.includes('premium') || text.includes('Premium') || text.includes('war risk'),
      hasBrentPrice: text.match(/\$9[0-9]\.[0-9]+/)?.[0],
      hasWTIPrice: text.match(/\$9[0-9]\.[0-9]+/g)?.[1] || text.match(/\$[6-9][0-9]\.[0-9]+/)?.[0],
    };
    
    return {
      islandCount: islands.length,
      svelteComponents,
      dataPoints,
    };
  });
  console.log('Hydration check:', JSON.stringify(hydrationCheck, null, 2));

  // Collect all results
  const finalResults = {
    faqDetails,
    mobileDetails: {
      buttons: mobileDetails.buttons.length,
      visibleButtons: mobileDetails.buttons.filter(b => b.visible).length,
      svgs: mobileDetails.svgs.length,
      navComputed: mobileDetails.navComputed,
    },
    mapDeep,
    additionalPages: pageResults,
    hydrationCheck,
  };

  fs.writeFileSync('audit-screenshots/deep-audit-results.json', JSON.stringify(finalResults, null, 2));
  console.log('\n=== DEEP AUDIT COMPLETE ===');

  await browser.close();
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
