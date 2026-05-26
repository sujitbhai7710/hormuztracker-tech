const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SITES = [
  { name: 'hormuzstraitmonitor', url: 'https://hormuzstraitmonitor.com/' },
  { name: 'hormuztracker', url: 'https://www.hormuztracker.com/' }
];

const BASE_DIR = '/home/z/my-project/download/scraped';

function sanitizeFilename(url) {
  return url.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 200);
}

function getExtension(url, contentType) {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath);
  if (ext) return ext;
  if (contentType) {
    if (contentType.includes('javascript')) return '.js';
    if (contentType.includes('css')) return '.css';
    if (contentType.includes('html')) return '.html';
    if (contentType.includes('json')) return '.json';
    if (contentType.includes('image')) return '.png';
    if (contentType.includes('font')) return '.woff2';
  }
  return '.bin';
}

async function downloadResource(url, destPath) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const file = fs.createWriteStream(destPath);
    protocol.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*'
      },
      rejectUnauthorized: false
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadResource(response.headers.location, destPath).then(resolve);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      resolve(false);
    });
  });
}

async function scrapeSite(siteConfig) {
  const siteDir = path.join(BASE_DIR, siteConfig.name);
  const resourcesDir = path.join(siteDir, 'resources');
  const pagesDir = path.join(siteDir, 'pages');
  
  if (!fs.existsSync(resourcesDir)) fs.mkdirSync(resourcesDir, { recursive: true });
  if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ['--ignore-certificate-errors'] });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  const networkRequests = [];
  const apiCalls = [];

  // Capture all network requests
  page.on('request', (request) => {
    const url = request.url();
    const method = request.method();
    const resourceType = request.resourceType();
    networkRequests.push({ url, method, resourceType, headers: request.headers(), postData: request.postData() });
  });

  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();
    const contentType = response.headers()['content-type'] || '';
    
    if (url.includes('api') || url.includes('fetch') || url.includes('graphql') || 
        contentType.includes('json') || url.match(/\.(json|geojson)$/i)) {
      try {
        const body = await response.text();
        apiCalls.push({ url, status, contentType, body: body.substring(0, 50000), headers: response.headers() });
      } catch(e) {}
    }
  });

  console.log(`\n=== Scraping ${siteConfig.name} ===`);
  
  try {
    // Visit main page
    console.log(`Visiting ${siteConfig.url}...`);
    await page.goto(siteConfig.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);

    // Get page title and meta
    const pageInfo = await page.evaluate(() => {
      const meta = {};
      document.querySelectorAll('meta').forEach(m => {
        const name = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('http-equiv');
        if (name) meta[name] = m.getAttribute('content');
      });
      return {
        title: document.title,
        url: window.location.href,
        meta,
        bodyText: document.body.innerText.substring(0, 10000),
        html: document.documentElement.outerHTML.substring(0, 500000)
      };
    });
    
    fs.writeFileSync(path.join(pagesDir, 'index-info.json'), JSON.stringify(pageInfo, null, 2));
    fs.writeFileSync(path.join(pagesDir, 'index.html'), pageInfo.html);
    console.log(`Main page saved. Title: ${pageInfo.title}`);

    // Find all internal links
    const links = await page.evaluate(() => {
      const links = new Set();
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.href;
        if (href && !href.startsWith('javascript:') && !href.startsWith('mailto:')) {
          links.add(href);
        }
      });
      return [...links];
    });
    
    console.log(`Found ${links.length} links on main page`);
    fs.writeFileSync(path.join(siteDir, 'links.json'), JSON.stringify(links, null, 2));

    // Visit each internal link
    const baseUrl = new URL(siteConfig.url).origin;
    const internalLinks = links.filter(l => l.startsWith(baseUrl));
    const uniquePaths = [...new Set(internalLinks.map(l => new URL(l).pathname))].slice(0, 30);
    
    console.log(`Visiting ${uniquePaths.length} internal pages...`);
    
    for (const pathname of uniquePaths) {
      const pageUrl = baseUrl + pathname;
      const pageFileName = sanitizeFilename(pathname) || 'root';
      try {
        console.log(`  Visiting ${pageUrl}...`);
        await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2000);
        
        const subPageInfo = await page.evaluate(() => {
          return {
            title: document.title,
            url: window.location.href,
            bodyText: document.body.innerText.substring(0, 10000),
            html: document.documentElement.outerHTML.substring(0, 500000)
          };
        });
        
        fs.writeFileSync(path.join(pagesDir, `${pageFileName}-info.json`), JSON.stringify(subPageInfo, null, 2));
        fs.writeFileSync(path.join(pagesDir, `${pageFileName}.html`), subPageInfo.html);
      } catch(e) {
        console.log(`  Failed to visit ${pageUrl}: ${e.message}`);
      }
    }

    // Save network requests log
    fs.writeFileSync(path.join(siteDir, 'network-requests.json'), JSON.stringify(networkRequests, null, 2));
    fs.writeFileSync(path.join(siteDir, 'api-calls.json'), JSON.stringify(apiCalls, null, 2));
    
    console.log(`Captured ${networkRequests.length} network requests and ${apiCalls.length} API calls`);

    // Download key resources
    const resourceUrls = networkRequests
      .filter(r => ['script', 'stylesheet', 'image', 'font'].includes(r.resourceType))
      .map(r => r.url);
    
    const uniqueResourceUrls = [...new Set(resourceUrls)];
    console.log(`Downloading ${uniqueResourceUrls.length} unique resources...`);
    
    let downloaded = 0;
    for (const resUrl of uniqueResourceUrls.slice(0, 100)) {
      try {
        const ext = getExtension(resUrl, '');
        const fileName = sanitizeFilename(resUrl) + ext;
        const destPath = path.join(resourcesDir, fileName);
        const success = await downloadResource(resUrl, destPath);
        if (success) downloaded++;
      } catch(e) {}
    }
    console.log(`Downloaded ${downloaded} resources`);

  } catch(e) {
    console.error(`Error scraping ${siteConfig.name}: ${e.message}`);
  }

  await browser.close();
  return { name: siteConfig.name, networkRequests, apiCalls };
}

async function main() {
  const results = [];
  for (const site of SITES) {
    try {
      const result = await scrapeSite(site);
      results.push(result);
    } catch(e) {
      console.error(`Failed to scrape ${site.name}: ${e.message}`);
    }
  }
  
  fs.writeFileSync(path.join(BASE_DIR, 'scrape-summary.json'), JSON.stringify(results.map(r => ({
    name: r.name,
    requestCount: r.networkRequests.length,
    apiCount: r.apiCalls.length
  })), null, 2));
  
  console.log('\n=== Scraping Complete ===');
  console.log(JSON.stringify(results.map(r => ({
    name: r.name,
    requests: r.networkRequests.length,
    apis: r.apiCalls.length
  })), null, 2));
}

main().catch(console.error);
