---
Task ID: 1
Agent: Main Agent
Task: Fix HormuzTracker API Worker - Replace wrong data sources with correct ones

Work Log:
- Analyzed current worker code (V3) - found it was using ShipFinder APIs that returned null from Workers, and TradingEconomics function was never implemented
- Used Playwright to inspect windward.ai - discovered it's a static HTML page (~20MB) with rich Hormuz data embedded in HTML
- Used Playwright to inspect tradingeconomics.com - discovered HTML table with data-symbol="CO1:COM" for Brent, "CL1:COM" for WTI
- Tested ShipFinder APIs directly - confirmed they work with simple headers from command line
- Rewrote worker to V4 with TradingEconomics as PRIMARY oil source, ShipFinder for ship data, Windward for enrichment
- Fixed critical bug: fetchTradingEconomicsPrices() was called but never defined in V3
- Fixed TE HTML parsing: the page uses text content in td elements, NOT data-value attributes
- Simplified shipfinderFetch to remove session warm-up (doesn't work in Workers)
- Made cacheData resilient (won't throw on KV failures)
- Made getOrFetch resilient (won't throw on KV read failures)
- Added /api/windward endpoint for Windward insights data
- Added /api/debug and /api/test-oil endpoints for monitoring
- Deployed V4 worker and verified all endpoints return LIVE data

Stage Summary:
- Brent Crude: $99.57 (from TradingEconomics - was showing wrong 97.23 before)
- WTI: $93.84 (from TradingEconomics)
- BDTI: 2185, CTFI: 4044.92 (from ShipFinder)
- Gulf Vessels: 3,095 (from ShipFinder)
- Transits: 31 days of data (from ShipFinder)
- Windward: 603 active vessels, 5 inbound, 23 outbound, 589 GPS jammed
- Severity: 7.2/10, Status: RESTRICTED
- All data is LIVE and sourced from TradingEconomics + ShipFinder + Windward
- OLD sources (hormuzstraitmonitor.com, hormuztracker.com) are completely removed
