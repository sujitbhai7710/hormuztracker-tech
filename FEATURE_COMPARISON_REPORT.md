# Comprehensive Feature Comparison: HormuzStraitMonitor vs HormuzTracker

## Executive Summary

Both sites are Next.js-based real-time Strait of Hormuz crisis monitoring dashboards with dark themes. **HormuzStraitMonitor** is more content/editorial-rich with blog analysis, detailed region pages, vessel seizure tracking, and diplomacy monitoring. **HormuzTracker** is more data/tool-focused with an interactive map, carrier-specific tracking, reroute calculator, CSV downloads, embeddable widgets, i18n, and a glossary. A combined site should incorporate ALL features from both.

---

## SITE 1: HormuzStraitMonitor.com

### Tech Stack
- **Framework**: Next.js (App Router with RSC)
- **Analytics**: Google Analytics (G-9H2X5XRCMH)
- **Charts**: TradingView embedded widget (iframe)
- **Fonts**: Inter, JetBrains Mono
- **CSS**: Tailwind CSS (with custom `ops-*` theme tokens)
- **Data Source**: Self-hosted API (`/api/dashboard`) + blog-index.json

### Pages & Navigation
| Page | URL | Description |
|------|-----|-------------|
| **Dashboard (Home)** | `/` | Main live tracker with all widget cards |
| **Blog** | `/blog/` | Long-form analysis articles |
| **About** | `/about/` | Project description, what they track |
| **News** | `/news/` | Aggregated news feed (Next.js RSC page) |
| **FAQ** | `/faq/` | Auto-updated from live data |
| **Oil Explained** | `/oil-explained/` | Deep-dive on why Hormuz oil matters |
| **LNG Explained** | `/lng-explained/` | LNG supply impact deep-dive |
| **Alternative Routes** | `/alternative-routes/` | Pipeline and Cape route details |
| **Region: Japan** | `/regions/japan/` | Country-specific impact profile |
| **Region: South Korea** | `/regions/south-korea/` | Country-specific impact profile |
| **Region: China** | `/regions/china/` | Country-specific impact profile |
| **Region: India** | `/regions/india/` | Country-specific impact profile |
| **Region: EU** | `/regions/european-union/` | Country-specific impact profile |
| **Region: Southeast Asia** | `/regions/southeast-asia/` | Country-specific impact profile |
| **Region: United States** | `/regions/united-states/` | Country-specific impact profile |
| **Region: Australia** | `/regions/australia/` | Country-specific impact profile |
| **Region: Middle East** | `/regions/middle-east/` | Gulf States impact profile |
| **Advertise** | `/advertise/` | Ad placement info & contact |

### Data Displayed (Dashboard Widgets)

1. **Strait Status Badge** — RESTRICTED/CLOSED/OPEN with live indicator, since date, duration counter (days:hours:minutes)
2. **Traffic Overview Map** — Custom SVG map of Strait with Iran/UAE/Oman labels, inbound/outbound arrows, ship counts
3. **Daily Throughput** — 309K DWT vs 10.3M avg (3%), 7-day sparkline bar chart
4. **Transits (24h)** — 26 ships vs 60/day normal (3.3%)
5. **Vessels Waiting** — Data availability status
6. **Ships Transiting Now** — 2 current, 26 last 24h, 60 normal avg, % of normal bar
7. **War Risk Insurance** — EXTREME level, 3% premium, 0.15% normal, 20x multiplier
8. **Tanker Spot Rate (VLCC)** — 100 WS equivalent, +100% vs pre-crisis, trend sparkline
9. **Brent Crude Historical Chart** — TradingView embedded iframe (TVC:UKOIL, dark theme)
10. **Featured Analysis** — Blog post card
11. **Vessel Seizures Tracker** — Tit-for-tat tracker: Iran 11, US/UK 4, with 5 currently held; chronological list with flag, date, entity, vessel, status
12. **Global Trade Impact** — 21% world oil at risk, $2.8B daily cost, country heatmap (Japan/CRITICAL, South Korea/CRITICAL, China/HIGH, India/HIGH, EU/MODERATE)
13. **LNG Supply Impact** — 25% world LNG at risk, $0.85B daily cost, top importers
14. **Supply Chain Disruptions** — +85% shipping rates, +2.5% CPI, 38d SPR reserve, bullet list
15. **Alternative Routes** — Cape of Good Hope (+12d, +$650K), East-West Pipeline, UAE Pipeline, Iran corridors
16. **Peace Talks & Diplomacy** — Status (IN PROGRESS), headline, date, participating countries, summary
17. **Crisis Timeline** — Chronological events with date/type/title/description (ESCALATION, MILITARY, ECONOMIC, DIPLOMATIC)
18. **News Feed** — Aggregated from NewsData.io, with source, title, date, description
19. **Ad Placements** — Dashboard Upper, Dashboard Lower, In-Content

### API Endpoints
- `GET /api/dashboard` — Returns comprehensive JSON with all dashboard data
- `GET /blog-index.json` — Blog article index

### `/api/dashboard` Response Structure
```json
{
  "success": true,
  "data": {
    "straitStatus": { "status", "since", "description" },
    "shipCount": { "currentTransits", "last24h", "normalDaily", "percentOfNormal" },
    "oilPrice": { "brentPrice", "change24h", "changePercent24h", "sparkline[]" },
    "strandedVessels": { "total", "tankers", "bulk", "other", "changeToday" },
    "insurance": { "level", "warRiskPercent", "normalPercent", "multiplier" },
    "throughput": { "todayDWT", "averageDWT", "percentOfNormal", "last7Days[]" },
    "diplomacy": { "status", "headline", "date", "parties[]", "summary" },
    "globalTradeImpact": {
      "percentOfWorldOilAtRisk", "estimatedDailyCostBillions",
      "affectedRegions[]": { "name", "severity", "oilDependencyPercent", "description" },
      "lngImpact": { "percentOfWorldLngAtRisk", "estimatedLngDailyCostBillions", "topAffectedImporters[]", "description" },
      "alternativeRoutes[]": { "name", "additionalDays", "additionalCostPerVessel", "currentUsageStatus" },
      "supplyChainImpact": { "shippingRateIncreasePercent", "consumerPriceImpactPercent", "sprStatusDays", "keyDisruptions[]" }
    },
    "crisisTimeline": { "events[]": { "date", "type", "title", "description" } },
    "tankerRates": { "currentRate", "preCrisisRate", "changePercent", "route", "vesselType", "trend[]", "unit" },
    "news[]": { "title", "source", "url", "publishedAt", "description" }
  }
}
```

### Blog Articles (12+)
All tagged "Analysis" or "Explainer", with slug, title, description, date, category, readingTime. Some have updates.

### Unique Features (Site 1 only)
- **Vessel Seizure Tracker** — Detailed tit-for-tat seizure log with flags, vessel names, status (held/released)
- **Peace Talks/Diplomacy Section** — Live diplomatic status with parties and summary
- **Crisis Timeline** — Type-tagged chronological events (ESCALATION/MILITARY/ECONOMIC/DIPLOMATIC)
- **Blog/Analysis Section** — 12+ long-form articles with reading time estimates
- **Region Pages** — 8 dedicated country/region pages with energy profile, key facts, vulnerabilities, mitigations, historical context
- **Oil Explained Page** — Deep educational content on Brent vs WTI, price transmission chain, historical oil shocks
- **LNG Explained Page** — Qatar LNG focus, why no LNG bypass, LNG stats
- **Alternative Routes Page** — Detailed pipeline/route comparison with OpenFreeMap maps
- **News Section** — Aggregated news via NewsData.io with source attribution
- **Auto-updating FAQ** — Answers pulled from live data
- **Advertise Page** — Monetization with placement options and stats (340K+ monthly users)
- **Strait Status Duration Counter** — Live DD:HH:MM counter
- **Throughput 7-Day Sparkline** — Bar chart of last 7 days
- **Tanker Rate Trend** — Sparkline with pre-crisis comparison
- **Custom SVG Map** — Stylized strait overview with ship counts and labels

---

## SITE 2: HormuzTracker.com

### Tech Stack
- **Framework**: Next.js (App Router)
- **Map**: Mapbox GL via Leaflet (interactive, pan/zoom)
- **AIS Data**: AISstream.io (WebSocket, real-time)
- **Oil Prices**: oilpriceapi.com (5-min intervals)
- **CSS**: Tailwind CSS with slate-800/900 dark theme
- **Styling**: JSX style hash (jsx-8d78ba8189320d40)
- **i18n**: Korean language support (`/ko`)

### Pages & Navigation
| Page | URL | Description |
|------|-----|-------------|
| **Dashboard (Home)** | `/` | Single-page with anchor sections |
| **Alternative Routes** | `/routes` | Detailed route comparison with table |
| **Trade Exposure** | `/exposure` | Oil dependency by country & industry |
| **Data Downloads** | `/data` | Free CSV exports & embeddable widgets |
| **Glossary** | `/glossary` | 30+ maritime/energy terms |
| **Methodology** | `/methodology` | Data sources, limitations, update schedule |
| **Embed Widgets** | `/embed` | Live embeddable widget showcase |
| **Korean Dashboard** | `/ko` | Full Korean translation |
| **PDF Report** | `/api/report` | Auto-generated PDF report |

### Navigation Sections (Single-Page Anchors)
- `#crisis-status`
- `#oil-energy`
- `#map`
- `#pipelines`
- `#carriers`
- `#insurance`
- `#faq`

### Data Displayed (Dashboard Sections)

1. **Severity Score** — 10/10 with disruption day counter (Day 88)
2. **Strait Status** — "CLOSED TO COMMERCIAL SHIPPING — DAY 88"
3. **Days of Disruption** — 88
4. **Vessels Detected Today** — ~10, -93% vs 138 avg
5. **Carriers Suspended** — 9/9
6. **Pipeline Coverage** — 35% of normal flow
7. **Interactive Map** — Mapbox dark tiles, Leaflet, zoom/pan, map markers, layers (Ports & Terminals, Pipelines, Chokepoint, Active, Disrupted, Other), "DISRUPTED — Day 88" marker
8. **Energy Prices Table** — Brent $94.45, WTI $95.72, EU Gas TTF €43.15, US Gasoline $4.12; with pre-crisis, change %, trend sparklines
9. **Bypass Pipeline Capacity** — Visual bar showing 7M of 20M, gap of 13M bbl/day; pipeline cards (Saudi Petroline 5M, UAE ADCOP 1.5M, Iraq-Turkey 0.5M) with status and detail toggles
10. **Ships Affected** — Trapped inside Gulf (0), Waiting outside (0), Rerouting via Cape (—)
11. **Carrier Breakdown** — Bar chart: MSC 22, Maersk 18, COSCO 12, CMA CGM 8, PIL 4; with TEU counts
12. **Carrier Status Detail** — Expandable cards per carrier (Maersk, MSC, CMA CGM, Hapag-Lloyd, COSCO, ONE, HMM, Evergreen, PIL) with status, trapped vessels, TEU, surcharges, descriptions
13. **Email Newsletter Subscription** — "Get the Daily Hormuz Update"
14. **Reroute Cost Calculator** — Dropdown route selector (5 routes), comparison of normal vs Cape (days, nm, extra days, extra distance %, extra cost $), "Share this route" button
15. **Historical Comparison Table** — 6 crises compared (Hormuz 2026, OPEC 1973, Persian Gulf 1984-88, Kuwait 1990, Suez 2021, Red Sea 2024-25) with year, duration, peak oil spike, trade impact
16. **P&I Insurance Status** — WITHDRAWN; 6 clubs listed (Gard, Skuld, NorthStandard, London P&I Club, American Club, Steamship Mutual) with Cancelled status; war risk premium 0.125%→0.8-1.5%+, VLCC transit cost $125K→$2-3M
17. **Who's Most Exposed** — Country cards with toggle (Import Dependency / Strategic Reserves): Japan 88%, South Korea 73%, India 64%, China 40%, EU 14%, US 5%
18. **US Energy Position** — Dedicated section on US resilience
19. **FAQ Accordion** — 6 questions, expandable

### API Endpoints
- `GET /api/ais` — Real-time ship data from AISstream.io
  ```json
  { "shipsDetected", "tankers", "cargo", "other", "lastCollection", "collectionDuration", "live", "aisReliabilityNote" }
  ```
- `GET /api/oil` — Oil price data from oilpriceapi.com
  ```json
  { "brent", "wti", "ttf", "gasoline", "live", "timestamp", "history[]" }
  ```
- `GET /api/report` — Auto-generated PDF report

### CSV Downloads (from `/data`)
1. `hormuz-daily-transits.csv` — date, day, event, impact
2. `hormuz-oil-prices.csv` — date, brent, wti, ttf_eur, us_gasoline
3. `hormuz-carrier-status.csv` — carrier, status, vessels_trapped, teu_trapped, surcharge, last_updated
4. `hormuz-insurance.csv` — club_name, status, date, premium_before, premium_current

### Embeddable Widgets
1. **Severity Badge** — 220x80px iframe
2. **Ship Count** — 300x200px iframe
3. **Oil Prices** — 300x400px iframe
4. **Full Dashboard** — 100%x800px iframe

### Unique Features (Site 2 only)
- **Interactive Mapbox Map** — Leaflet-based, zoomable, with toggleable layers (Ports & Terminals, Pipelines, Chokepoint, Active, Disrupted, Other)
- **Real-time AIS Data** — WebSocket from AISstream.io, updated every 60 seconds
- **Carrier-Specific Tracking** — 9 major carriers with expandable detail cards, vessel counts, TEU, surcharges
- **Reroute Cost Calculator** — Interactive route comparison with dropdown selector, distance/time/cost comparison
- **Historical Comparison Table** — 6 crises side-by-side
- **P&I Club Detail** — Individual club status (6 clubs, all "Cancelled")
- **Data Downloads** — 4 CSV files, CC BY 4.0 license
- **Embeddable Widgets** — 4 widget types (badge, ships, oil, full)
- **Glossary** — 30+ terms (AIS, Aframax, Bab el-Mandeb, Barrel, Brent, Bunkering, etc.) with alphabetical navigation
- **Methodology Page** — Full transparency on data sources, update schedules, known limitations
- **Korean Language Support** — Full `/ko` translation of dashboard
- **Severity Score** — Composite 10-point scale
- **Newsletter Subscription** — Email signup for daily updates
- **PDF Report Generation** — `/api/report` endpoint
- **Share Route Feature** — Share button for reroute calculator results
- **Crisis Schema.org Markup** — Structured data (Dataset type)
- **WTI + TTF + Gasoline** — Additional commodity prices beyond Brent

---

## Feature Comparison Matrix

| Feature | HormuzStraitMonitor | HormuzTracker | Combined |
|---------|:-------------------:|:-------------:|:--------:|
| **Strait Status (Open/Restricted/Closed)** | ✅ | ✅ | ✅ |
| **Duration Counter (days)** | ✅ DD:HH:MM | ✅ Day N | ✅ DD:HH:MM |
| **Ship Transit Count** | ✅ Current + 24h + normal | ✅ Today + vs avg | ✅ Both |
| **Daily Throughput (DWT)** | ✅ + 7-day sparkline | ❌ | ✅ |
| **Brent Crude Price** | ✅ + TradingView chart | ✅ + trend | ✅ Both |
| **WTI Crude Price** | ❌ | ✅ | ✅ |
| **EU Gas (TTF) Price** | ❌ | ✅ | ✅ |
| **US Gasoline Price** | ❌ | ✅ | ✅ |
| **War Risk Insurance** | ✅ Premium % + multiplier | ✅ + 6 P&I clubs detail | ✅ Both |
| **Tanker Spot Rates (VLCC)** | ✅ + sparkline + route | ❌ | ✅ |
| **Interactive Map** | ❌ (SVG static) | ✅ Mapbox/Leaflet | ✅ |
| **Map Layers Toggle** | ❌ | ✅ (5 layers) | ✅ |
| **Carrier Status Detail** | ❌ | ✅ (9 carriers) | ✅ |
| **Carrier Breakdown Chart** | ❌ | ✅ (bar chart) | ✅ |
| **Reroute Cost Calculator** | ❌ | ✅ (5 routes) | ✅ |
| **Vessel Seizure Tracker** | ✅ (15 incidents) | ❌ | ✅ |
| **Peace Talks / Diplomacy** | ✅ | ❌ | ✅ |
| **Crisis Timeline** | ✅ (11 events) | ❌ | ✅ |
| **Global Trade Impact** | ✅ | ✅ (simplified) | ✅ Both |
| **LNG Supply Impact** | ✅ | ❌ | ✅ |
| **Supply Chain Disruptions** | ✅ | ❌ | ✅ |
| **Alternative Routes** | ✅ | ✅ (more detailed table) | ✅ Both |
| **Pipeline Capacity Detail** | ✅ (basic) | ✅ (with status + detail) | ✅ Both |
| **Country Heatmap** | ✅ (5 countries) | ✅ (6 countries + US section) | ✅ Both |
| **Region Pages** | ✅ (8 pages) | ❌ | ✅ |
| **Oil Explained Page** | ✅ | ❌ | ✅ |
| **LNG Explained Page** | ✅ | ❌ | ✅ |
| **Blog / Analysis** | ✅ (12+ articles) | ❌ | ✅ |
| **News Feed** | ✅ (NewsData.io) | ❌ | ✅ |
| **FAQ** | ✅ (auto-updated) | ✅ (6 questions) | ✅ Both |
| **Glossary** | ❌ | ✅ (30+ terms) | ✅ |
| **CSV Downloads** | ❌ | ✅ (4 files) | ✅ |
| **Embeddable Widgets** | ❌ | ✅ (4 types) | ✅ |
| **Data API** | ✅ `/api/dashboard` | ✅ `/api/ais` + `/api/oil` | ✅ Both |
| **PDF Report** | ❌ | ✅ `/api/report` | ✅ |
| **Newsletter Subscription** | ❌ | ✅ | ✅ |
| **Korean Language** | ❌ | ✅ | ✅ |
| **Methodology Page** | ❌ | ✅ | ✅ |
| **Advertise Page** | ✅ | ❌ | ✅ |
| **Severity Score (1-10)** | ❌ | ✅ | ✅ |
| **Historical Comparison** | ❌ | ✅ (6 crises) | ✅ |
| **Ships Affected Summary** | ❌ | ✅ (trapped/waiting/rerouting) | ✅ |
| **Trade Exposure Page** | ❌ | ✅ (13 countries + industry) | ✅ |
| **Schema.org Markup** | ❌ | ✅ (Dataset) | ✅ |
| **TradingView Chart** | ✅ | ❌ | ✅ |
| **Map Markers** | ❌ | ✅ | ✅ |
| **Share Route** | ❌ | ✅ | ✅ |

---

## UI/UX Comparison

| Aspect | HormuzStraitMonitor | HormuzTracker |
|--------|-------------------|---------------|
| **Theme** | Ultra-dark ops center (`ops-*` tokens) | Dark slate (`slate-800/900`) |
| **Fonts** | Inter + JetBrains Mono | System + mono |
| **Layout** | Widget card grid (2-3 col) | Single column sections |
| **Navigation** | Top nav bar with page links | Sticky header with anchor links |
| **Map** | Custom SVG illustration | Interactive Mapbox/Leaflet |
| **Chart** | TradingView iframe | Inline SVG sparklines |
| **Card Style** | Bordered widget cards with scanline effect | Rounded slate cards with borders |
| **Status Indicators** | Color-coded badges (RED/AMBER/GREEN) | Severity score 10/10 |
| **Mobile** | Responsive | Responsive |
| **CTA** | Ad placements | Newsletter + embed widgets |

---

## Recommended Combined Site Architecture

### Pages
1. `/` — Combined dashboard (all widgets from both)
2. `/blog/` — Analysis articles (from Site 1)
3. `/news/` — Aggregated news feed (from Site 1)
4. `/regions/[slug]/` — 8+ region pages (from Site 1) + expanded from Site 2's trade exposure
5. `/oil-explained/` — Oil deep-dive (Site 1)
6. `/lng-explained/` — LNG deep-dive (Site 1)
7. `/alternative-routes/` — Routes with calculator (merged)
8. `/exposure/` — Trade exposure with industry pathways (Site 2)
9. `/data/` — CSV downloads + embed widgets (Site 2)
10. `/glossary/` — 30+ terms (Site 2)
11. `/methodology/` — Data transparency (Site 2)
12. `/faq/` — Auto-updated + static (merged)
13. `/about/` — Project info (Site 1)
14. `/advertise/` — Monetization (Site 1)
15. `/ko/` — Korean version (Site 2)
16. `/embed` — Widget showcase (Site 2)

### API Endpoints
- `GET /api/dashboard` — Comprehensive (merge both APIs)
- `GET /api/ais` — Real-time AIS data (Site 2)
- `GET /api/oil` — Oil prices (merge: add WTI, TTF, Gasoline to Site 1's Brent)
- `GET /api/report` — PDF generation (Site 2)

### Dashboard Widget Order (Combined)
1. Severity Score + Strait Status + Duration Counter
2. Key Metrics Row (Ships Today, Transit Count, Pipeline Coverage, Carriers Suspended)
3. Interactive Mapbox Map (with layers)
4. Ships Transiting Now + Vessel Seizure Tracker
5. Energy Prices (Brent + WTI + TTF + Gasoline with TradingView chart)
6. War Risk Insurance + P&I Club Detail
7. Tanker Spot Rates
8. Daily Throughput (DWT) + 7-Day Sparkline
9. Peace Talks & Diplomacy
10. Global Trade Impact + LNG Impact + Country Heatmap
11. Supply Chain Disruptions + Ships Affected Summary
12. Carrier Status Detail (9 carriers with expandable cards)
13. Bypass Pipeline Capacity
14. Reroute Cost Calculator
15. Alternative Routes
16. Crisis Timeline
17. Historical Comparison Table
18. News Feed
19. Featured Analysis
20. Newsletter Subscription

### Data Sources (Combined)
- **AISstream.io** — Real-time ship positions (WebSocket)
- **oilpriceapi.com** — Brent + WTI prices (5-min intervals)
- **TradingView** — Historical chart widget
- **NewsData.io** — News aggregation
- **AISstream.io** — Ship type classification
- **Manual data** — Carrier status, P&I clubs, crisis timeline, diplomacy, vessel seizures, alternative routes, regional data, pipeline status
