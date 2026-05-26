# Task: SEO Optimization & AdSense-Required Pages for HormuzTracker.tech

## Agent: main
## Date: 2026-03-04

## Summary
Added SEO optimization and AdSense-required pages to the HormuzTracker.tech Astro frontend project.

## Files Created
1. **`/home/z/my-project/hormuz-frontend/src/pages/privacy.astro`** — Comprehensive Privacy Policy page (~1500+ words) covering data collection, third-party services (Google Analytics, AdSense, TradingView), cookie policy, user rights, data security, children's privacy, international data transfers, and contact information. Uses same Layout and glass-card styling.

2. **`/home/z/my-project/hormuz-frontend/src/pages/terms.astro`** — Terms of Service page (~1200+ words) covering acceptance of terms, description of service, data accuracy disclaimers, limitation of liability, intellectual property (CC BY 4.0 for data), user conduct, embedded widgets, indemnification, governing law, termination, and changes to terms.

3. **`/home/z/my-project/hormuz-frontend/src/pages/contact.astro`** — Contact page with cards for General Inquiries, Press & Media, Data Corrections, Privacy & Legal, social media links (X, GitHub, LinkedIn), partnership info, response time table, and legal document links.

## Files Modified
4. **`/home/z/my-project/hormuz-frontend/public/robots.txt`** — Updated to allow full indexing by all user agents including Googlebot and Mediapartners-Google. Removed Disallow rules for /embed/ and /api/. Updated sitemap URL to `hormuztracker.tech` domain.

5. **`/home/z/my-project/hormuz-frontend/src/layouts/Layout.astro`** — Multiple changes:
   - Added `<meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />` 
   - Added `<meta name="theme-color" content="#0a1628" />`
   - Canonical URL now uses `https://hormuztracker.tech${path}` consistently (instead of Astro.site)
   - og:url uses `https://hormuztracker.tech${path}` consistently
   - og:image and twitter:image updated from `hormuztracker-tech.pages.dev` to `hormuztracker.tech`
   - JSON-LD logo updated to `hormuztracker.tech` domain
   - BreadcrumbList item URL uses consistent `hormuztracker.tech` domain
   - Removed unused `canonicalURL` variable
   - Added "Legal" section to "More" dropdown with Privacy Policy, Terms of Service, Contact links
   - Added "Legal" section to mobile menu with same links
   - Added Privacy Policy, Terms of Service, Contact links to footer bottom bar
   - Added Contact, Privacy Policy, Terms of Service to footer Resources column

6. **`/home/z/my-project/hormuz-frontend/src/pages/faq.astro`** — Added FAQ question about data privacy ("What data does HormuzTracker.tech collect about me?") and a "Privacy & Legal" card section at the bottom with links to Privacy Policy, Terms of Service, and Contact pages.

## Build Verification
- `astro build` completed successfully with 48 pages built
- All three new pages confirmed: `/contact/index.html`, `/privacy/index.html`, `/terms/index.html`
- No build errors or warnings
