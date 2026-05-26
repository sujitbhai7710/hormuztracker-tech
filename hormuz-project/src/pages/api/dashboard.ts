import type { APIRoute } from 'astro';
import { NEWS_DATA } from '../../data/news.js';

export const GET: APIRoute = async () => {
  try {
    let combinedData: any = null;
    let dashboardOk = false;
    let trackerOk = false;
    let trackerData: any = null;

    // First try the dashboard API which has live data
    try {
      const dashRes = await fetch('https://hormuzstraitmonitor.com/api/dashboard', {
        headers: { 'User-Agent': 'HormuzWatch/1.0', 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000)
      });
      if (dashRes.ok) {
        const dashJson = await dashRes.json();
        if (dashJson.success && dashJson.data) {
          combinedData = dashJson;
          dashboardOk = true;
        }
      }
    } catch {
      // Dashboard API failed
    }

    // Also try the tracker API for supplementary data
    try {
      const trackerRes = await fetch('https://www.hormuztracker.com/api/dashboard', {
        headers: { 'User-Agent': 'HormuzWatch/1.0', 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000)
      });
      if (trackerRes.ok) {
        trackerData = await trackerRes.json();
        trackerOk = true;
      }
    } catch {
      // Tracker API failed
    }

    // If dashboard worked, use it as the base and enhance with our own news
    if (dashboardOk && combinedData) {
      // Replace the news array with our own unique curated news
      if (combinedData.data) {
        combinedData.data.news = NEWS_DATA;
      }
      // Merge any supplementary data from tracker if available
      if (trackerOk && trackerData?.data) {
        // If tracker has better AIS data, merge it
        if (trackerData.data.ais && (!combinedData.data.shipCount || combinedData.data.shipCount?.last24h === 0)) {
          combinedData.data.shipCount = trackerData.data.ais;
        }
      }
      // Always set a fresh timestamp
      combinedData.timestamp = new Date().toISOString();
      combinedData.source = 'hormuzstraitmonitor.com (enhanced)';
      return new Response(JSON.stringify(combinedData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // If only tracker worked, use its data with our news
    if (trackerOk && trackerData) {
      if (trackerData.data) {
        trackerData.data.news = NEWS_DATA;
      }
      trackerData.timestamp = new Date().toISOString();
      trackerData.source = 'hormuztracker.com (enhanced)';
      return new Response(JSON.stringify(trackerData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // If both failed, return our own constructed response with news
    const fallbackData = {
      success: true,
      data: {
        straitStatus: { status: 'RESTRICTED', description: 'Strait of Hormuz remains restricted to commercial traffic', since: '2026-02-28', transitCount: 0 },
        shipCount: { currentTransits: 0, last24h: 0, normalDaily: 60, percentOfNormal: 0 },
        oilPrice: { brentPrice: 116.73, wtiPrice: 114.52, ttfPrice: 43.15, gasolinePrice: 4.12, change24h: 2.77, changePercent24h: 2.43, sparkline: [94, 96, 99, 102, 105, 108, 110, 113, 114, 116] },
        insurance: { level: 'EXTREME', warRiskPercent: 2.4, normalPercent: 0.15, multiplier: 16 },
        diplomacy: { status: 'TALKS_IN_PROGRESS', headline: 'Multi-party negotiations ongoing', summary: 'Diplomatic efforts continue with UN mediation. No breakthrough yet.', parties: ['UN', 'US', 'Iran', 'GCC', 'EU', 'China'] },
        globalTradeImpact: {
          percentOfWorldOilAtRisk: 20,
          estimatedDailyCostBillions: 4.2,
          supplyChainImpact: { shippingRateIncreasePercent: 380, consumerPriceImpactPercent: 3.5, sprStatusDays: 28, keyDisruptions: ['Container rates up 400%', 'LNG supply to Asia severely disrupted', 'Fertilizer prices surging', 'SPR drawdowns accelerating'] },
          lngImpact: { percentOfWorldLngAtRisk: 25, estimatedLngDailyCostBillions: 1.8, topAffectedImporters: ['Japan', 'South Korea', 'India'], description: 'Qatar LNG exports severely curtailed. Asian importers scrambling for alternatives.' },
          affectedRegions: [
            { name: 'Japan', severity: 'CRITICAL', oilDependencyPercent: 90, description: 'Over 90% of crude imports depend on Hormuz transit.' },
            { name: 'South Korea', severity: 'CRITICAL', oilDependencyPercent: 80, description: 'Major refining and petrochemical sector under severe strain.' },
            { name: 'China', severity: 'HIGH', oilDependencyPercent: 40, description: 'Partial buffer from Russian overland supply and domestic production.' },
            { name: 'India', severity: 'HIGH', oilDependencyPercent: 60, description: 'Refineries scrambling for alternative crude sources.' },
            { name: 'European Union', severity: 'MODERATE', oilDependencyPercent: 20, description: 'Diversified supply since 2022 limits exposure but LNG still impacted.' }
          ]
        },
        tankerRates: { currentRate: 240, preCrisisRate: 50, changePercent: 380 },
        strandedVessels: { total: 47, tankers: 22, bulk: 12, other: 13, changeToday: -3 },
        crisisTimeline: { events: [
          { date: '2026-02-28', type: 'ESCALATION', title: 'Iran Announces Hormuz Transit Restrictions', description: 'IRGC imposes new transit requirements on commercial shipping.' },
          { date: '2026-03-01', type: 'MILITARY', title: 'US Fifth Fleet Moves to Heightened Alert', description: 'Naval forces reposition in response to Iranian actions.' },
          { date: '2026-03-05', type: 'ESCALATION', title: 'Major Carriers Suspend Hormuz Transits', description: 'Maersk, MSC, CMA CGM announce immediate suspension.' },
          { date: '2026-03-15', type: 'DIPLOMATIC', title: 'UN Calls for De-escalation', description: 'Security Council holds emergency session on freedom of navigation.' },
          { date: '2026-04-01', type: 'MILITARY', title: 'Operation Freedom Naval Escort Announced', description: 'Pentagon announces plan to escort merchant vessels through the Strait.' },
          { date: '2026-04-02', type: 'MILITARY', title: 'Naval Escort Program Paused After One Day', description: 'Program paused due to risk of direct military confrontation.' },
          { date: '2026-05-01', type: 'ESCALATION', title: 'Oil Prices Surpass $100/barrel', description: 'Brent crude breaks $100 for the first time since 2022.' },
          { date: '2026-05-15', type: 'DIPLOMATIC', title: 'Trump-Xi Summit Addresses Hormuz', description: 'Beijing summit places energy security at center of negotiations.' },
          { date: '2026-05-21', type: 'DIPLOMATIC', title: 'Senate Advances War Powers Resolution', description: 'Bipartisan vote constrains presidential military authority.' },
          { date: '2026-05-23', type: 'DE_ESCALATION', title: 'First LNG Carrier Exits Under New Procedures', description: 'Qatari LNG vessel successfully transits under Iran\'s new rules, reaching India.' }
        ] },
        throughput: { todayDWT: 850000, normalDailyDWT: 4500000, percentOfNormal: 19 },
        news: NEWS_DATA
      },
      timestamp: new Date().toISOString(),
      source: 'fallback'
    };

    return new Response(JSON.stringify(fallbackData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
