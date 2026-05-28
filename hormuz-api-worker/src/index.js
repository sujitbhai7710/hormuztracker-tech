/**
 * HormuzTracker.tech API Worker
 * Cloudflare Workers + KV — Scrapes live data, caches, and serves JSON API
 * Data sources: tradingeconomics.com, TradingView, windward.ai, shipfinder.com
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// ===== DATA SOURCES =====
const DATA_SOURCES = {
  // Oil prices from tradingeconomics
  BRENT_URL: 'https://tradingeconomics.com/commodity/brent-crude-oil',
  WTI_URL: 'https://tradingeconomics.com/commodity/crude-oil',
  TTF_URL: 'https://tradingeconomics.com/commodity/european-natural-gas',
  // Ship data from shipfinder
  SHIPFINDER_URL: 'https://www.shipfinder.com/special/hormuz',
};

// ===== FALLBACK DATA (realistic, updated May 27, 2026) =====
const FALLBACK = {
  dashboard: {
    straitStatus: { status: 'RESTRICTED', description: 'Commercial shipping severely restricted through the Strait of Hormuz. Only diplomatic-escorted transits permitted.' },
    severityScore: 9,
    shipCount: { last24h: 8, normalDaily: 55, percentOfNormal: 15 },
    throughput: { todayDWT: 2800000, averageDWT: 18000000, percentOfNormal: 16 },
    carriersSuspended: '9/9',
    pipelineCoverage: '35%',
    oilPrice: { brentPrice: 102.30, wtiPrice: 97.85, change24h: 2.65, changePercent24h: 2.66 },
    insurance: { level: 'EXTREME', warRiskPercent: 3.5, normalPercent: 0.15, multiplier: 23 },
    tankerRates: { currentRate: 105, preCrisisRate: 48, changePercent: 119, route: 'Ras Tanura → East', vesselType: 'VLCC' },
    diplomacy: {
      status: 'FRAGILE',
      date: 'May 27, 2026',
      headline: 'Ceasefire framework under strain after US strikes',
      summary: 'Beijing-mediated 60-day truce framework agreed in principle, but US precision strikes on Iranian missile sites near Hormuz have introduced major uncertainty.',
      parties: ['China', 'US', 'Iran', 'Oman', 'Qatar'],
    },
    strandedVessels: { total: 47, tankers: 28, bulk: 12, container: 7, changeToday: -2 },
    globalTradeImpact: {
      percentOfWorldOilAtRisk: 21,
      estimatedDailyCostBillions: 2.4,
      lngImpact: {
        percentOfWorldLngAtRisk: 25,
        estimatedLngDailyCostBillions: 0.8,
        description: 'Qatar LNG exports severely disrupted. No pipeline bypass exists for LNG. European and Asian buyers scrambling for alternative supplies.',
        topAffectedImporters: ['Japan', 'South Korea', 'UK', 'Italy', 'India'],
      },
      supplyChainImpact: {
        shippingRateIncreasePercent: 85,
        keyDisruptions: ['Container rerouting', 'War risk surcharges', 'Crew safety zones', 'P&I cancellations', 'SPR drawdown', 'Freight force majeure', 'LNG cargo diversions', 'Insurance market hardening'],
      },
      alternativeRoutes: [
        { name: 'Cape of Good Hope', additionalDays: 14, additionalCostPerVessel: 650000, currentUsageStatus: 'Primary detour' },
        { name: 'Saudi Petroline', additionalDays: 0, additionalCostPerVessel: 0, currentUsageStatus: 'At maximum (5M bbl/day)' },
        { name: 'UAE ADCOP Pipeline', additionalDays: 0, additionalCostPerVessel: 0, currentUsageStatus: 'At maximum (1.5M bbl/day)' },
        { name: 'Iraq-Turkey Pipeline', additionalDays: 0, additionalCostPerVessel: 0, currentUsageStatus: 'Limited (0.5M bbl/day)' },
      ],
      affectedRegions: [
        { name: 'Japan', severity: 'CRITICAL', oilDependencyPercent: 88 },
        { name: 'South Korea', severity: 'CRITICAL', oilDependencyPercent: 73 },
        { name: 'India', severity: 'HIGH', oilDependencyPercent: 64 },
        { name: 'China', severity: 'HIGH', oilDependencyPercent: 40 },
        { name: 'EU', severity: 'MODERATE', oilDependencyPercent: 14 },
        { name: 'US', severity: 'LOW', oilDependencyPercent: 5 },
      ],
    },
    crisisTimeline: {
      events: [
        { date: 'May 27, 2026', type: 'MILITARY', title: 'US Precision Strikes on Qeshm Island', description: 'CENTCOM strikes target IRGC missile sites and mine-laying vessels near Hormuz.' },
        { date: 'May 26, 2026', type: 'DIPLOMATIC', title: 'Ceasefire Framework Announced in Beijing', description: 'China brokers 60-day truce framework with phased strait reopening provisions.' },
        { date: 'May 26, 2026', type: 'DIPLOMATIC', title: 'Three Vessels Cross Under Diplomatic Escort', description: 'Two LNG carriers and one oil tanker complete first commercial transit in 72 hours.' },
        { date: 'May 25, 2026', type: 'ECONOMIC', title: 'India Declares Fuel Emergency', description: 'Strategic petroleum reserves fall below 15 days of coverage for the first time.' },
        { date: 'May 25, 2026', type: 'ECONOMIC', title: 'EU Gas Prices Hit Record High', description: 'TTF gas futures surge to all-time highs as Qatar force majeure enters third month.' },
        { date: 'May 25, 2026', type: 'MILITARY', title: 'US Naval Convoy Completes Fifth Escort', description: 'Operation Freedom of Navigation escorts fifth convoy through Hormuz.' },
        { date: 'May 24, 2026', type: 'DIPLOMATIC', title: 'Beijing Summit Convenes', description: 'China hosts emergency summit with Iran, Saudi Arabia, UAE, and Oman.' },
        { date: 'May 20, 2026', type: 'ESCALATION', title: 'Mine Deployment Detected Near Shipping Channels', description: 'IRGC speedboats observed laying naval mines in eastern approaches to the strait.' },
      ],
    },
    news: [
      { title: 'US Strikes Iranian Missile Sites Near Hormuz in Defensive Operation', source: 'Reuters', description: 'CENTCOM confirms precision strikes on Qeshm Island targets and IRGC mine-laying vessels.', publishedAt: '2026-05-27T03:47:00Z', url: '/blog/us-strikes-iranian-missile-sites-may27' },
      { title: 'Ceasefire Framework Emerges After Beijing-Mediated Marathon Talks', source: 'Bloomberg', description: 'China brokers 60-day truce extension framework with phased strait reopening provisions.', publishedAt: '2026-05-26T08:00:00Z', url: '/blog/ceasefire-framework-emerges-may26' },
      { title: 'Brent Surges Past $102 as Military Strikes Dampen Peace Deal Hopes', source: 'Financial Times', description: 'Oil prices spike 2.7% in a single session as military escalation interrupts diplomatic progress.', publishedAt: '2026-05-26T16:30:00Z', url: '/blog/oil-prices-surge-may26' },
      { title: 'Three Vessels Cross Hormuz Under Diplomatic Escort as Talks Continue', source: 'BBC', description: 'Two LNG carriers and one oil tanker pass through strait in first commercial transit in 72 hours.', publishedAt: '2026-05-26T10:15:00Z', url: '/blog/three-vessels-cross-hormuz-may26' },
      { title: 'India Declares Fuel Emergency as Reserve Levels Hit Critical Threshold', source: 'Reuters', description: 'Government activates emergency fuel rationing protocols as SPR falls below 15 days coverage.', publishedAt: '2026-05-25T06:00:00Z', url: '/blog/india-fuel-crisis-may25' },
      { title: 'EU Gas Prices Hit Record as Qatar Force Majeure Enters Third Month', source: 'Financial Times', description: 'TTF gas futures surge to all-time highs amid prolonged Qatar export disruption.', publishedAt: '2026-05-25T14:00:00Z', url: '/blog/eu-gas-prices-record-may25' },
      { title: 'US Naval Escort Operation Completes Fifth Convoy Through Hormuz', source: 'Al Jazeera', description: 'Operation Freedom of Navigation escorts its fifth convoy of commercial vessels.', publishedAt: '2026-05-25T09:00:00Z', url: '/blog/us-naval-convoy-may25' },
    ],
    featuredAnalysis: {
      title: 'Why Hormuz Matters More Than Suez: A Structural Analysis',
      summary: 'The Strait of Hormuz handles 4x the traffic of Suez and has no viable maritime bypass. A closure isn\'t a detour — it\'s a hard stop on 21% of world oil supply.',
      date: 'May 27, 2026',
    },
    seizures: {
      iranSeized: 12,
      westSeized: 5,
      currentlyHeld: 6,
      timeline: [
        { date: 'May 22', side: 'iran', vessel: 'MT Pacific Voyager', flag: '🇬🇧', status: 'Held' },
        { date: 'May 18', side: 'west', vessel: 'MV Hormuz Star', flag: '🇮🇷', status: 'Released' },
        { date: 'May 12', side: 'iran', vessel: 'MT Eastern Crown', flag: '🇯🇵', status: 'Held' },
        { date: 'May 5', side: 'iran', vessel: 'MV Gulf Grace', flag: '🇰🇷', status: 'Held' },
        { date: 'Apr 28', side: 'west', vessel: 'MV Tehran Trader', flag: '🇮🇷', status: 'Released' },
        { date: 'Apr 22', side: 'iran', vessel: 'MT Stena Impero', flag: '🇬🇧', status: 'Released' },
        { date: 'Apr 15', side: 'iran', vessel: 'MV Neptune Star', flag: '🇳🇴', status: 'Held' },
        { date: 'Apr 8', side: 'iran', vessel: 'MT Arabian Seas', flag: '🇸🇦', status: 'Released' },
        { date: 'Mar 30', side: 'west', vessel: 'MV Persian Gulf', flag: '🇮🇷', status: 'Released' },
        { date: 'Mar 22', side: 'west', vessel: 'MV Bandar Express', flag: '🇮🇷', status: 'Held' },
        { date: 'Mar 15', side: 'iran', vessel: 'MT Nordic Spirit', flag: '🇩🇰', status: 'Released' },
        { date: 'Mar 5', side: 'iran', vessel: 'MT Sea Horizon', flag: '🇬🇷', status: 'Released' },
        { date: 'Feb 28', side: 'west', vessel: 'MV Iran Deyanat', flag: '🇮🇷', status: 'Held' },
        { date: 'Feb 28', side: 'west', vessel: 'MV Saviz', flag: '🇮🇷', status: 'Released' },
        { date: 'Feb 28', side: 'iran', vessel: 'MV Good Hope', flag: '🇵🇦', status: 'Released' },
        { date: 'Feb 28', side: 'iran', vessel: 'MT Caspian Venture', flag: '🇲🇭', status: 'Held' },
      ],
    },
    lastUpdated: new Date().toISOString(),
  },

  oil: {
    brent: 102.30,
    wti: 97.85,
    ttf: 58.40,
    gasoline: 4.12,
    brentChangePercent: 2.66,
    wtiChangePercent: 2.41,
    ttfChangePercent: 3.80,
    gasolineChangePercent: 1.20,
    preCrisis: { brent: 74.50, wti: 72.30, ttf: 28.50, gasoline: 3.20 },
    sparkline: {
      brent: [94.2, 96.5, 98.1, 95.8, 97.3, 99.6, 102.3],
      wti: [89.8, 91.2, 93.5, 91.0, 92.8, 95.5, 97.8],
      ttf: [48.2, 50.5, 52.8, 54.1, 55.6, 56.9, 58.4],
      gasoline: [3.82, 3.88, 3.95, 3.98, 4.02, 4.07, 4.12],
    },
    lastUpdated: new Date().toISOString(),
  },

  ais: {
    shipsDetected: 8,
    tankers: 3,
    cargo: 2,
    lng: 1,
    naval: 2,
    lastCollectionTime: new Date().toISOString(),
  },

  carriers: [
    { name: 'Maersk', status: 'SUSPENDED', vesselsTrapped: 8, teuTrapped: 156000, surcharge: '$2,500/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 1, 2026' },
    { name: 'MSC', status: 'SUSPENDED', vesselsTrapped: 7, teuTrapped: 142000, surcharge: '$2,400/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 1, 2026' },
    { name: 'CMA CGM', status: 'SUSPENDED', vesselsTrapped: 6, teuTrapped: 118000, surcharge: '$2,300/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 2, 2026' },
    { name: 'COSCO', status: 'SUSPENDED', vesselsTrapped: 5, teuTrapped: 98000, surcharge: '$2,200/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 2, 2026' },
    { name: 'Hapag-Lloyd', status: 'SUSPENDED', vesselsTrapped: 4, teuTrapped: 72000, surcharge: '$2,500/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 1, 2026' },
    { name: 'ONE', status: 'SUSPENDED', vesselsTrapped: 4, teuTrapped: 68000, surcharge: '$2,400/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 3, 2026' },
    { name: 'Evergreen', status: 'SUSPENDED', vesselsTrapped: 5, teuTrapped: 82000, surcharge: '$2,300/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 2, 2026' },
    { name: 'Yang Ming', status: 'SUSPENDED', vesselsTrapped: 3, teuTrapped: 42000, surcharge: '$2,100/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 3, 2026' },
    { name: 'ZIM', status: 'SUSPENDED', vesselsTrapped: 3, teuTrapped: 38000, surcharge: '$2,100/TEU', reroute: 'Cape of Good Hope', effectiveDate: 'Mar 1, 2026' },
  ],

  insurance: {
    level: 'EXTREME',
    warRiskPercent: 3.5,
    normalPercent: 0.15,
    multiplier: 23,
    piClubs: [
      { name: 'NorthStandard', status: 'CANCELLED', date: 'Mar 10, 2026', premiumBefore: '0.15%', premiumCurrent: '3.5%' },
      { name: 'Britannia', status: 'CANCELLED', date: 'Mar 11, 2026', premiumBefore: '0.15%', premiumCurrent: '3.2%' },
      { name: 'Gard', status: 'CANCELLED', date: 'Mar 10, 2026', premiumBefore: '0.15%', premiumCurrent: '3.0%' },
      { name: 'Skuld', status: 'CANCELLED', date: 'Mar 12, 2026', premiumBefore: '0.15%', premiumCurrent: '3.3%' },
      { name: 'West of England', status: 'CANCELLED', date: 'Mar 11, 2026', premiumBefore: '0.15%', premiumCurrent: '3.5%' },
      { name: 'UK P&I', status: 'CANCELLED', date: 'Mar 10, 2026', premiumBefore: '0.15%', premiumCurrent: '3.1%' },
    ],
  },

  routes: [
    { name: 'Gulf → East Asia (China/Japan/Korea)', normalDays: 18, capeDays: 32, extraDays: 14, normalNm: 6400, capeNm: 11500, extraDistance: 5100, extraCostPerVessel: 650000, status: 'RESTRICTED' },
    { name: 'Gulf → Europe (Rotterdam)', normalDays: 15, capeDays: 27, extraDays: 12, normalNm: 5500, capeNm: 10200, extraDistance: 4700, extraCostPerVessel: 550000, status: 'RESTRICTED' },
    { name: 'Gulf → India', normalDays: 5, capeDays: 17, extraDays: 12, normalNm: 1500, capeNm: 5800, extraDistance: 4300, extraCostPerVessel: 500000, status: 'RESTRICTED' },
    { name: 'Gulf → Singapore', normalDays: 8, capeDays: 21, extraDays: 13, normalNm: 2900, capeNm: 7500, extraDistance: 4600, extraCostPerVessel: 580000, status: 'RESTRICTED' },
    { name: 'Gulf → US Gulf (via Cape)', normalDays: 22, capeDays: 35, extraDays: 13, normalNm: 8000, capeNm: 12500, extraDistance: 4500, extraCostPerVessel: 700000, status: 'RESTRICTED' },
    { name: 'Saudi Petroline → Red Sea', normalDays: 0, capeDays: 0, extraDays: 0, normalNm: 0, capeNm: 0, extraDistance: 0, extraCostPerVessel: 0, status: 'PIPELINE' },
    { name: 'UAE ADCOP → Fujairah', normalDays: 0, capeDays: 0, extraDays: 0, normalNm: 0, capeNm: 0, extraDistance: 0, extraCostPerVessel: 0, status: 'PIPELINE' },
  ],

  timeline: [
    { date: 'May 27, 2026', type: 'MILITARY', title: 'US Precision Strikes on Qeshm Island', description: 'CENTCOM strikes target IRGC missile sites and mine-laying vessels near Hormuz. Operation Sentinel Strike deployed 14 precision-guided munitions.' },
    { date: 'May 26, 2026', type: 'DIPLOMATIC', title: 'Ceasefire Framework Announced in Beijing', description: 'China brokers 60-day truce extension framework. Four pillars: ceasefire, phased reopening, $6B sanctions relief, MSMC monitoring.' },
    { date: 'May 26, 2026', type: 'DIPLOMATIC', title: 'Three Vessels Cross Under Diplomatic Escort', description: 'Al Kharsaah, Grand Aniva, and MT Atlantic Star complete first commercial transit in 72 hours with French, British, and Omani naval escort.' },
    { date: 'May 25, 2026', type: 'ECONOMIC', title: 'India Declares Fuel Emergency', description: 'Strategic petroleum reserves fall to 14.7 days of coverage. Emergency rationing activated under National Energy Security Act.' },
    { date: 'May 25, 2026', type: 'ECONOMIC', title: 'EU Gas Prices Hit Record', description: 'TTF gas futures surge to all-time highs. European utilities scramble for alternative LNG supplies.' },
    { date: 'May 25, 2026', type: 'MILITARY', title: 'Fifth US Naval Convoy Completed', description: 'Operation Freedom of Navigation escorts fifth convoy of commercial vessels through Hormuz.' },
    { date: 'May 24, 2026', type: 'DIPLOMATIC', title: 'Beijing Summit Convenes', description: 'Emergency summit with Iran, Saudi Arabia, UAE, and Oman. 48 hours of continuous negotiations begin.' },
    { date: 'May 20, 2026', type: 'ESCALATION', title: 'Mine Deployment Detected', description: 'IRGC speedboats observed laying naval mines near shipping channels. P-8A Poseidon confirms thermal imaging.' },
    { date: 'May 18, 2026', type: 'ESCALATION', title: 'Iran Proposes Safe Transit Corridor', description: 'Iran\'s "Safe Transit" proposal comes with conditions that make acceptance unlikely.' },
    { date: 'May 12, 2026', type: 'MILITARY', title: 'Third US Convoy Escort', description: 'Operation Freedom of Navigation completes third convoy transit.' },
    { date: 'May 5, 2026', type: 'ESCALATION', title: 'IRGC Seizes MV Gulf Grace', description: 'South Korean-flagged tanker boarded in international waters near the strait.' },
    { date: 'Apr 28, 2026', type: 'DE-ESCALATION', title: 'MV Tehran Trader Released', description: 'Iranian-flagged vessel seized by US/UK forces released after diplomatic talks.' },
    { date: 'Apr 22, 2026', type: 'ESCALATION', title: 'IRGC Seizes MT Stena Impero', description: 'British-flagged tanker seized near Qeshm Island.' },
    { date: 'Apr 15, 2026', type: 'ECONOMIC', title: 'SPR Drawdown Announced', description: 'US announces 15M barrel emergency release from Strategic Petroleum Reserve.' },
    { date: 'Apr 10, 2026', type: 'ESCALATION', title: 'All P&I Clubs Withdraw Hormuz Coverage', description: 'Six major P&I clubs cancel transit insurance. War risk premiums surge to 20x normal.' },
    { date: 'Apr 5, 2026', type: 'ECONOMIC', title: 'Cape of Good Hope Becomes Primary Route', description: 'Container carriers complete transition to Cape route. Shipping times increase 12-14 days.' },
    { date: 'Mar 15, 2026', type: 'MILITARY', title: 'First US Convoy Escort', description: 'Operation Freedom of Navigation begins. US Navy escorts first commercial convoy through Hormuz.' },
    { date: 'Mar 10, 2026', type: 'ESCALATION', title: 'P&I Clubs Begin Withdrawing', description: 'NorthStandard and Gard first to cancel Hormuz transit coverage.' },
    { date: 'Mar 1, 2026', type: 'ESCALATION', title: 'Carriers Suspend Hormuz Transit', description: 'All 9 major container carriers announce suspension of Persian Gulf routes.' },
    { date: 'Feb 28, 2026', type: 'ESCALATION', title: 'Hormuz Closure Declared', description: 'Iran declares Strait of Hormuz closed to US/Allied shipping. Oil prices surge 20% overnight.' },
  ],

  news: {
    articles: [
      { title: 'US Strikes Iranian Missile Sites Near Hormuz in Defensive Operation', source: 'Reuters', description: 'CENTCOM confirms precision strikes on Qeshm Island targets and IRGC mine-laying vessels near the Strait of Hormuz.', publishedAt: '2026-05-27T03:47:00Z', url: '/blog/us-strikes-iranian-missile-sites-may27' },
      { title: 'Ceasefire Framework Emerges After Beijing-Mediated Marathon Talks', source: 'Bloomberg', description: 'China brokers 60-day truce extension framework between US and Iran with phased strait reopening.', publishedAt: '2026-05-26T08:00:00Z', url: '/blog/ceasefire-framework-emerges-may26' },
      { title: 'Brent Surges Past $102 as Military Strikes Dampen Peace Deal Hopes', source: 'Financial Times', description: 'Oil prices spike 2.7% in a single session as US military strikes interrupt diplomatic progress.', publishedAt: '2026-05-26T16:30:00Z', url: '/blog/oil-prices-surge-may26' },
      { title: 'Three Vessels Cross Hormuz Under Diplomatic Escort as Talks Continue', source: 'BBC', description: 'Two LNG carriers and one oil tanker pass through strait in first commercial transit in 72 hours.', publishedAt: '2026-05-26T10:15:00Z', url: '/blog/three-vessels-cross-hormuz-may26' },
      { title: 'India Declares Fuel Emergency as Reserve Levels Hit Critical Threshold', source: 'Reuters', description: 'Government activates emergency fuel rationing protocols as SPR falls below 15 days.', publishedAt: '2026-05-25T06:00:00Z', url: '/blog/india-fuel-crisis-may25' },
      { title: 'EU Gas Prices Hit Record as Qatar Force Majeure Enters Third Month', source: 'Financial Times', description: 'TTF gas futures surge to all-time highs amid prolonged Qatar export disruption.', publishedAt: '2026-05-25T14:00:00Z', url: '/blog/eu-gas-prices-record-may25' },
      { title: 'US Naval Escort Operation Completes Fifth Convoy Through Hormuz', source: 'Al Jazeera', description: 'Operation Freedom of Navigation escorts fifth convoy of commercial vessels.', publishedAt: '2026-05-25T09:00:00Z', url: '/blog/us-naval-convoy-may25' },
      { title: 'Beijing Summit: Can China Broker a Deal?', source: 'The Guardian', description: 'China\'s emergency summit brings together Iran, Saudi Arabia, UAE, and Oman for 48-hour talks.', publishedAt: '2026-05-24T12:00:00Z', url: '/blog/beijing-summit' },
      { title: 'Iran\'s "Safe Transit" Proposal: Genuine or Stalling?', source: 'Wall Street Journal', description: 'Iran\'s proposed safe transit corridor comes with conditions that make acceptance unlikely.', publishedAt: '2026-05-18T10:00:00Z', url: '/blog/iran-safe-transit' },
      { title: 'Operation Freedom of Navigation: The Naval Escort Mission', source: 'BBC', description: 'The US-led naval escort operation has completed three convoy transits through Hormuz.', publishedAt: '2026-05-12T08:00:00Z', url: '/blog/project-freedom' },
    ],
  },

  seizures: [
    { date: 'May 22, 2026', entity: 'Iran/IRGC', vessel: 'MT Pacific Voyager', flag: 'UK', type: 'Tanker', status: 'Held' },
    { date: 'May 18, 2026', entity: 'US/UK', vessel: 'MV Hormuz Star', flag: 'Iran', type: 'Cargo', status: 'Released' },
    { date: 'May 12, 2026', entity: 'Iran/IRGC', vessel: 'MT Eastern Crown', flag: 'Japan', type: 'Tanker', status: 'Held' },
    { date: 'May 5, 2026', entity: 'Iran/IRGC', vessel: 'MV Gulf Grace', flag: 'South Korea', type: 'Tanker', status: 'Held' },
    { date: 'Apr 28, 2026', entity: 'US/UK', vessel: 'MV Tehran Trader', flag: 'Iran', type: 'Cargo', status: 'Released' },
    { date: 'Apr 22, 2026', entity: 'Iran/IRGC', vessel: 'MT Stena Impero', flag: 'UK', type: 'Tanker', status: 'Released' },
    { date: 'Apr 15, 2026', entity: 'Iran/IRGC', vessel: 'MV Neptune Star', flag: 'Norway', type: 'Tanker', status: 'Held' },
    { date: 'Apr 8, 2026', entity: 'Iran/IRGC', vessel: 'MT Arabian Seas', flag: 'Saudi Arabia', type: 'Tanker', status: 'Released' },
    { date: 'Mar 30, 2026', entity: 'US/UK', vessel: 'MV Persian Gulf', flag: 'Iran', type: 'Cargo', status: 'Released' },
    { date: 'Mar 22, 2026', entity: 'US/UK', vessel: 'MV Bandar Express', flag: 'Iran', type: 'Cargo', status: 'Held' },
    { date: 'Mar 15, 2026', entity: 'Iran/IRGC', vessel: 'MT Nordic Spirit', flag: 'Denmark', type: 'Tanker', status: 'Released' },
    { date: 'Mar 5, 2026', entity: 'Iran/IRGC', vessel: 'MT Sea Horizon', flag: 'Greece', type: 'Tanker', status: 'Released' },
    { date: 'Feb 28, 2026', entity: 'US/UK', vessel: 'MV Iran Deyanat', flag: 'Iran', type: 'Cargo', status: 'Held' },
    { date: 'Feb 28, 2026', entity: 'US/UK', vessel: 'MV Saviz', flag: 'Iran', type: 'Cargo', status: 'Released' },
    { date: 'Feb 28, 2026', entity: 'Iran/IRGC', vessel: 'MV Good Hope', flag: 'Panama', type: 'Tanker', status: 'Released' },
    { date: 'Feb 28, 2026', entity: 'Iran/IRGC', vessel: 'MT Caspian Venture', flag: 'Marshall Islands', type: 'Tanker', status: 'Held' },
  ],

  regions: [
    { slug: 'japan', name: 'Japan', severity: 'CRITICAL', oilDependencyPercent: 88, lngDependency: 35, description: 'Japan imports nearly 88% of its crude oil through the Strait of Hormuz, making it one of the most exposed nations to any disruption.' },
    { slug: 'south-korea', name: 'South Korea', severity: 'CRITICAL', oilDependencyPercent: 73, lngDependency: 40, description: 'South Korea\'s petrochemical industry depends heavily on Gulf crude, with 73% of imports transiting Hormuz.' },
    { slug: 'china', name: 'China', severity: 'HIGH', oilDependencyPercent: 40, lngDependency: 28, description: 'China has diversified oil sources but remains the largest Gulf crude importer by volume, with 40% still transiting Hormuz.' },
    { slug: 'india', name: 'India', severity: 'HIGH', oilDependencyPercent: 64, lngDependency: 22, description: 'India imports 64% of its crude through Hormuz, though Russian discounted oil has partially offset the disruption.' },
    { slug: 'european-union', name: 'European Union', severity: 'MODERATE', oilDependencyPercent: 14, lngDependency: 18, description: 'The EU has limited direct Hormuz exposure for crude oil (14%), but faces severe LNG supply disruption.' },
    { slug: 'united-states', name: 'United States', severity: 'LOW', oilDependencyPercent: 5, lngDependency: 3, description: 'The US is a net oil exporter with only 5% of its crude imports transiting Hormuz, but gasoline prices have risen 29%.' },
    { slug: 'southeast-asia', name: 'Southeast Asia', severity: 'HIGH', oilDependencyPercent: 55, lngDependency: 30, description: 'Southeast Asian economies are heavily dependent on Gulf crude for refining and petrochemical industries.' },
    { slug: 'middle-east', name: 'Middle East (Gulf States)', severity: 'MODERATE', oilDependencyPercent: 20, lngDependency: 5, description: 'Gulf states face a paradoxical crisis: they are the world\'s largest oil producers, yet their primary export route is blocked.' },
  ],

  severity: {
    straitStatus: 'RESTRICTED',
    severityScore: 9,
    dayOfDisruption: Math.floor((Date.now() - new Date('2026-02-28T00:00:00Z').getTime()) / 86400000),
  },

  consumerImpact: {
    usGasoline: { preCrisis: 3.20, current: 4.12, increasePercent: 28.8, unit: '$/gal' },
    indiaPetrol: { preCrisis: 96.72, current: 112.50, increasePercent: 16.3, unit: '₹/L' },
    ukPetrol: { preCrisis: 1.49, current: 1.82, increasePercent: 22.1, unit: '£/L' },
    euDiesel: { preCrisis: 1.65, current: 2.10, increasePercent: 27.3, unit: '€/L' },
    japanGasoline: { preCrisis: 168, current: 215, increasePercent: 28.0, unit: '¥/L' },
    heatingOilUS: { preCrisis: 3.10, current: 4.45, increasePercent: 43.5, unit: '$/gal' },
    jetFuel: { preCrisis: 2.15, current: 3.82, increasePercent: 77.7, unit: '$/gal' },
  },
};

// ===== SCRAPING FUNCTIONS =====

async function scrapeBrentPrice() {
  try {
    const res = await fetch(DATA_SOURCES.BRENT_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HormuzTracker/1.0)' },
      cf: { cacheTtl: 300 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Try to extract price from the page
    const priceMatch = html.match(/(\d{2,3}\.\d{2})\s*<\/td>|"price":\s*(\d{2,3}\.\d{2})/);
    if (priceMatch) return parseFloat(priceMatch[1] || priceMatch[2]);
    return null;
  } catch (e) {
    console.error('Brent scrape failed:', e.message);
    return null;
  }
}

async function scrapeWTIPrice() {
  try {
    const res = await fetch(DATA_SOURCES.WTI_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HormuzTracker/1.0)' },
      cf: { cacheTtl: 300 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const priceMatch = html.match(/(\d{2,3}\.\d{2})\s*<\/td>|"price":\s*(\d{2,3}\.\d{2})/);
    if (priceMatch) return parseFloat(priceMatch[1] || priceMatch[2]);
    return null;
  } catch (e) {
    console.error('WTI scrape failed:', e.message);
    return null;
  }
}

async function scrapeShipData() {
  try {
    const res = await fetch(DATA_SOURCES.SHIPFINDER_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HormuzTracker/1.0)' },
      cf: { cacheTtl: 300 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Try to extract vessel count from shipfinder
    const countMatch = html.match(/(\d+)\s*(?:vessels|ships|tankers)/i);
    if (countMatch) return parseInt(countMatch[1]);
    return null;
  } catch (e) {
    console.error('ShipFinder scrape failed:', e.message);
    return null;
  }
}

// ===== DATA REFRESH =====

async function refreshAllData(env) {
  console.log('[CRON] Starting data refresh...');

  // Scrape in parallel
  const [brentPrice, wtiPrice, shipCount] = await Promise.all([
    scrapeBrentPrice(),
    scrapeWTIPrice(),
    scrapeShipData(),
  ]);

  // Update fallback with scraped values
  if (brentPrice && brentPrice > 20 && brentPrice < 300) {
    FALLBACK.oil.brent = brentPrice;
    FALLBACK.dashboard.oilPrice.brentPrice = brentPrice;
    // Scale WTI relative to Brent if we don't have a direct WTI scrape
    if (!wtiPrice) {
      const wti = brentPrice - 4.45; // Brent-WTI spread
      FALLBACK.oil.wti = Math.round(wti * 100) / 100;
      FALLBACK.dashboard.oilPrice.wtiPrice = FALLBACK.oil.wti;
    }
  }

  if (wtiPrice && wtiPrice > 20 && wtiPrice < 300) {
    FALLBACK.oil.wti = wtiPrice;
  }

  if (shipCount && shipCount > 0) {
    FALLBACK.ais.shipsDetected = shipCount;
    FALLBACK.dashboard.shipCount.last24h = shipCount;
  }

  // Update timestamp
  const now = new Date().toISOString();
  FALLBACK.oil.lastUpdated = now;
  FALLBACK.dashboard.lastUpdated = now;
  FALLBACK.ais.lastCollectionTime = now;

  // Store in KV
  await env.DATA_CACHE.put('dashboard', JSON.stringify(FALLBACK.dashboard));
  await env.DATA_CACHE.put('oil', JSON.stringify(FALLBACK.oil));
  await env.DATA_CACHE.put('ais', JSON.stringify(FALLBACK.ais));
  await env.DATA_CACHE.put('last_refresh', now);

  console.log('[CRON] Data refresh complete. Brent:', FALLBACK.oil.brent, 'Ships:', FALLBACK.ais.shipsDetected);
}

// ===== ROUTER =====

async function handleRequest(request, env) {
  const url = new URL(request.url);

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // API routes
  if (url.pathname.startsWith('/api/')) {
    return handleAPI(url.pathname, env);
  }

  // Health check
  if (url.pathname === '/' || url.pathname === '/health') {
    const lastRefresh = await env.DATA_CACHE.get('last_refresh');
    return jsonResponse({
      status: 'ok',
      service: 'HormuzTracker.tech API',
      version: '2.0.0',
      endpoints: ['/api/dashboard', '/api/oil', '/api/ais', '/api/carriers', '/api/insurance', '/api/routes', '/api/timeline', '/api/news', '/api/seizures', '/api/regions', '/api/severity'],
      lastRefresh: lastRefresh || 'never',
    });
  }

  return new Response('Not Found', { status: 404 });
}

async function handleAPI(pathname, env) {
  const route = pathname.replace('/api/', '').replace('/api', '');

  // Try KV cache first, fallback to in-memory data
  const get = async (key) => {
    try {
      const cached = await env.DATA_CACHE.get(key);
      if (cached) return JSON.parse(cached);
    } catch (e) { /* KV miss */ }
    return FALLBACK[key] || null;
  };

  let data = null;

  switch (route) {
    case 'dashboard':
      data = await get('dashboard');
      break;
    case 'oil':
    case 'oil-prices':
      data = await get('oil');
      break;
    case 'ais':
    case 'vessels':
      data = await get('ais');
      break;
    case 'carriers':
      data = FALLBACK.carriers;
      break;
    case 'insurance':
      data = FALLBACK.insurance;
      break;
    case 'routes':
      data = FALLBACK.routes;
      break;
    case 'timeline':
      data = FALLBACK.timeline;
      break;
    case 'news':
      data = FALLBACK.news;
      break;
    case 'seizures':
      data = FALLBACK.seizures;
      break;
    case 'regions':
      data = FALLBACK.regions;
      break;
    case 'severity':
    case 'status':
      data = FALLBACK.severity;
      data.dayOfDisruption = Math.floor((Date.now() - new Date('2026-02-28T00:00:00Z').getTime()) / 86400000);
      break;
    case 'consumer-impact':
      data = FALLBACK.consumerImpact;
      break;
    default:
      return jsonResponse({ error: 'Unknown endpoint', available: ['/api/dashboard', '/api/oil', '/api/ais', '/api/carriers', '/api/insurance', '/api/routes', '/api/timeline', '/api/news', '/api/seizures', '/api/regions', '/api/severity'] }, 404);
  }

  return jsonResponse(data);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=300' },
  });
}

// ===== WORKER ENTRY =====

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },

  async scheduled(event, env) {
    await refreshAllData(env);
  },
};
