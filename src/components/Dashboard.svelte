<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  let refreshInterval: number = 60000;
  let data: any = null;
  let loading = true;
  let error: string | null = null;
  let lastUpdated: Date | null = null;
  let interval: any;
  
  function getEventDotClass(type: string) {
    if (type === 'ESCALATION') return 'bg-red-500';
    if (type === 'DIPLOMATIC') return 'bg-blue-500';
    if (type === 'MILITARY') return 'bg-orange-500';
    if (type === 'DE_ESCALATION') return 'bg-green-500';
    return 'bg-slate-500';
  }
  
  function getEventBadgeClass(type: string) {
    if (type === 'ESCALATION') return 'bg-red-900/50 text-red-400';
    if (type === 'DIPLOMATIC') return 'bg-blue-900/50 text-blue-400';
    if (type === 'MILITARY') return 'bg-orange-900/50 text-orange-400';
    if (type === 'DE_ESCALATION') return 'bg-green-900/50 text-green-400';
    return 'bg-slate-700 text-slate-300';
  }
  
  function getChangeColor(val: number) {
    return val > 0 ? 'text-red-400' : 'text-green-400';
  }
  
  async function fetchData() {
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      if (result.success) {
        data = result.data;
        lastUpdated = new Date(result.timestamp || Date.now());
        error = null;
      }
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    fetchData();
    interval = setInterval(fetchData, refreshInterval);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="min-h-screen bg-slate-950">
  {#if loading}
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="flex flex-col items-center space-y-4">
        <div class="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-slate-400">Loading live data...</p>
      </div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <p class="text-red-400 text-lg">Error loading data: {error}</p>
        <button onclick={fetchData} class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Retry</button>
      </div>
    </div>
  {:else if data}
    <!-- Header -->
    <div class="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-2xl sm:text-3xl font-bold text-white">STRAIT OF HORMUZ</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/40 text-red-400 pulse-live">
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
                LIVE
              </span>
            </div>
            <p class="text-slate-400 text-sm">Real-Time Shipping &amp; Oil Crisis Tracker</p>
          </div>
          {#if lastUpdated}
            <div class="text-xs text-slate-500 font-mono">
              Updated {lastUpdated.toLocaleString()}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Top Status Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <!-- Status Card -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 glow-red">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-slate-400 uppercase tracking-wider">Strait Status</span>
            <span class="px-3 py-1 rounded-full text-sm font-bold border border-red-500/50 text-red-400 bg-red-900/20">
              {data.straitStatus?.status || 'RESTRICTED'}
            </span>
          </div>
          <p class="text-slate-300 text-sm mb-4">{data.straitStatus?.description || 'Strait status unavailable'}</p>
          <div class="text-xs text-slate-500">Since {data.straitStatus?.since || '2026-02-28'}</div>
        </div>

        <!-- Duration Counter -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
          <span class="text-sm font-medium text-slate-400 uppercase tracking-wider block mb-4">Duration of Disruption</span>
          <div id="countdown-display" class="text-slate-300">
            <div class="flex items-center justify-center gap-1 font-mono">
              <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl font-bold text-white" id="days-val">--</span>
                <span class="text-xs text-slate-400 uppercase">Days</span>
              </div>
              <span class="text-2xl text-red-500 font-bold">:</span>
              <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl font-bold text-white" id="hours-val">--</span>
                <span class="text-xs text-slate-400 uppercase">Hrs</span>
              </div>
              <span class="text-2xl text-red-500 font-bold">:</span>
              <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl font-bold text-white" id="mins-val">--</span>
                <span class="text-xs text-slate-400 uppercase">Min</span>
              </div>
              <span class="text-2xl text-red-500 font-bold">:</span>
              <div class="flex flex-col items-center">
                <span class="text-3xl sm:text-4xl font-bold text-white" id="secs-val">--</span>
                <span class="text-xs text-slate-400 uppercase">Sec</span>
              </div>
            </div>
          </div>
          <div class="text-xs text-slate-500 mt-3">Since {data.straitStatus?.since || '2026-02-28'}</div>
        </div>

        <!-- Crisis Severity -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <span class="text-sm font-medium text-slate-400 uppercase tracking-wider block mb-4">Crisis Severity</span>
          <div class="flex items-center justify-center">
            <div class="relative w-24 h-24">
              <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1e293b" stroke-width="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#ef4444" stroke-width="8" fill="none" stroke-dasharray="251.2" stroke-dashoffset="0" stroke-linecap="round" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-red-400">10/10</span>
              </div>
            </div>
          </div>
          <div class="text-center mt-2 text-xs text-red-400">EXTREME CRISIS</div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 card-hover">
          <div class="text-xs text-slate-400 uppercase tracking-wider mb-2">Transits (24H)</div>
          <div class="text-2xl font-bold text-white">{data.shipCount?.last24h || 0} <span class="text-sm text-slate-400">ships</span></div>
          <div class="text-xs text-red-400 mt-1">{data.shipCount?.percentOfNormal || 0}% of normal ({data.shipCount?.normalDaily || 60}/day)</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 card-hover">
          <div class="text-xs text-slate-400 uppercase tracking-wider mb-2">Daily Throughput</div>
          <div class="text-2xl font-bold text-white">{((data.throughput?.todayDWT || 0) / 1000).toFixed(0)}K <span class="text-sm text-slate-400">DWT</span></div>
          <div class="text-xs text-red-400 mt-1">{data.throughput?.percentOfNormal || 0}% of avg</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 card-hover">
          <div class="text-xs text-slate-400 uppercase tracking-wider mb-2">Brent Crude</div>
          <div class="text-2xl font-bold text-white">${data.oilPrice?.brentPrice?.toFixed(2) || '--'}</div>
          <div class="text-xs mt-1 {getChangeColor(data.oilPrice?.changePercent24h || 0)}">
            {(data.oilPrice?.changePercent24h || 0) > 0 ? '+' : ''}{(data.oilPrice?.changePercent24h || 0).toFixed(2)}%
          </div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 card-hover">
          <div class="text-xs text-slate-400 uppercase tracking-wider mb-2">War Risk Insurance</div>
          <div class="text-2xl font-bold text-white">{data.insurance?.warRiskPercent || 0}%</div>
          <div class="text-xs text-red-400 mt-1">{data.insurance?.multiplier || 0}x normal</div>
        </div>
      </div>

      <!-- Map + Diplomacy -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Map -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Strait of Hormuz — Traffic Overview</h2>
          <div class="relative">
            <svg viewBox="0 0 600 400" class="w-full h-auto" style="min-height: 300px;">
              <rect x="0" y="0" width="600" height="400" fill="#0c1e3a" />
              <path d="M 0,120 Q 150,100 250,160 Q 300,200 320,250 L 280,280 Q 200,240 150,250 Q 80,260 0,240 Z" fill="#0a1929" stroke="#1e3a5f" stroke-width="1"/>
              <path d="M 320,250 Q 380,200 450,180 Q 520,170 600,160 L 600,300 Q 520,280 450,260 Q 380,250 320,250 Z" fill="#0a1929" stroke="#1e3a5f" stroke-width="1"/>
              <path d="M 0,0 L 600,0 L 600,160 Q 520,170 450,180 Q 380,200 320,250 Q 300,200 250,160 Q 150,100 0,120 Z" fill="#1a1a2e" stroke="#334155" stroke-width="1.5"/>
              <text x="200" y="80" fill="#94a3b8" font-size="14" font-weight="600">IRAN</text>
              <path d="M 150,250 Q 200,240 280,280 L 320,300 Q 280,320 200,340 Q 150,350 100,340 L 0,300 L 0,240 Q 80,260 150,250 Z" fill="#1a1a2e" stroke="#334155" stroke-width="1.5"/>
              <text x="100" y="310" fill="#94a3b8" font-size="11" font-weight="600">UAE</text>
              <path d="M 320,300 L 450,260 Q 520,280 600,300 L 600,400 L 0,400 L 0,340 Q 100,340 150,350 Q 200,340 280,320 Z" fill="#1a1a2e" stroke="#334155" stroke-width="1.5"/>
              <text x="420" y="360" fill="#94a3b8" font-size="11" font-weight="600">OMAN</text>
              <ellipse cx="240" cy="210" rx="30" ry="12" fill="#1a1a2e" stroke="#334155" stroke-width="1"/>
              <text x="220" y="215" fill="#64748b" font-size="8">Qeshm</text>
              <ellipse cx="290" cy="230" rx="8" ry="5" fill="#1a1a2e" stroke="#334155" stroke-width="1"/>
              <text x="275" y="245" fill="#64748b" font-size="8">Hormuz</text>
              <line x1="260" y1="170" x2="320" y2="280" stroke="#ef444466" stroke-width="20" stroke-dasharray="5,5"/>
              <line x1="420" y1="200" x2="300" y2="230" stroke="#22c55e" stroke-width="2" stroke-dasharray="8,4"/>
              <polygon points="295,232 305,225 300,235" fill="#22c55e"/>
              <text x="380" y="195" fill="#22c55e" font-size="10" font-weight="600">INBOUND</text>
              <line x1="300" y1="250" x2="420" y2="220" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8,4"/>
              <polygon points="425,218 415,225 420,215" fill="#3b82f6"/>
              <text x="380" y="240" fill="#3b82f6" font-size="10" font-weight="600">OUTBOUND</text>
              {#each Array(data.shipCount?.currentTransits || 2) as _, i}
                <circle cx="{290 + i * 30}" cy="{220 + i * 10}" r="4" fill="#f59e0b">
                  <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
                </circle>
              {/each}
              <text x="80" y="190" fill="#475569" font-size="12" font-weight="500">PERSIAN GULF</text>
              <text x="430" y="270" fill="#475569" font-size="12" font-weight="500">GULF OF OMAN</text>
              <rect x="150" y="130" width="120" height="30" rx="4" fill="#ef444433" stroke="#ef4444" stroke-width="1"/>
              <text x="165" y="150" fill="#ef4444" font-size="12" font-weight="700">{data.straitStatus?.status || 'RESTRICTED'}</text>
            </svg>
          </div>
        </div>

        <!-- Diplomacy + News -->
        <div class="space-y-4">
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-sm font-medium text-slate-400 uppercase tracking-wider">Diplomacy Status</span>
              <span class="px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-400 border border-blue-500/30">
                {data.diplomacy?.status?.replace(/_/g, ' ') || 'TALKS IN PROGRESS'}
              </span>
            </div>
            <h3 class="text-white font-semibold mb-2 text-sm">{data.diplomacy?.headline || 'No updates'}</h3>
            <p class="text-slate-400 text-xs mb-3 line-clamp-3">{data.diplomacy?.summary || ''}</p>
            <div class="flex flex-wrap gap-1">
              {#each (data.diplomacy?.parties || []) as party}
                <span class="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">{party}</span>
              {/each}
            </div>
          </div>

          <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Latest News</h2>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              {#each (data.news || []).slice(0, 5) as article}
                <a href={article.url} target="_blank" rel="noopener noreferrer" class="block p-3 rounded-lg hover:bg-slate-800 transition-colors">
                  <div class="flex items-start gap-3">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-white line-clamp-2">{article.title}</p>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="text-xs text-slate-500">{article.source}</span>
                        <span class="text-xs text-slate-600">-</span>
                        <span class="text-xs text-slate-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Oil + Tanker + Impact -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Oil Price</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Brent Crude</span>
              <div class="text-right">
                <span class="text-xl font-bold text-white">${data.oilPrice?.brentPrice?.toFixed(2) || '--'}</span>
                <span class="text-xs ml-2 {getChangeColor(data.oilPrice?.changePercent24h || 0)}">
                  {(data.oilPrice?.changePercent24h || 0) > 0 ? '+' : ''}{(data.oilPrice?.changePercent24h || 0).toFixed(2)}%
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">24h Change</span>
              <span class="text-sm {getChangeColor(data.oilPrice?.change24h || 0)}">
                ${(data.oilPrice?.change24h || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Tanker Rates</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Current (VLCC)</span>
              <span class="text-xl font-bold text-white">{data.tankerRates?.currentRate || '--'} WS</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Pre-Crisis</span>
              <span class="text-sm text-slate-300">{data.tankerRates?.preCrisisRate || '--'} WS</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Change</span>
              <span class="text-sm text-red-400 font-semibold">+{data.tankerRates?.changePercent || 0}%</span>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Global Impact</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">World Oil at Risk</span>
              <span class="text-lg font-bold text-red-400">{data.globalTradeImpact?.percentOfWorldOilAtRisk || 0}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Daily Cost</span>
              <span class="text-lg font-bold text-red-400">${data.globalTradeImpact?.estimatedDailyCostBillions || 0}B</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Shipping Rates</span>
              <span class="text-sm text-red-400">+{data.globalTradeImpact?.supplyChainImpact?.shippingRateIncreasePercent || 0}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Consumer Prices</span>
              <span class="text-sm text-orange-400">+{data.globalTradeImpact?.supplyChainImpact?.consumerPriceImpactPercent || 0}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">SPR Days</span>
              <span class="text-sm text-yellow-400">{data.globalTradeImpact?.supplyChainImpact?.sprStatusDays || 0} days</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LNG + Insurance -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">LNG Impact</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">World LNG at Risk</span>
              <span class="text-lg font-bold text-red-400">{data.globalTradeImpact?.lngImpact?.percentOfWorldLngAtRisk || 0}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Daily LNG Cost</span>
              <span class="text-lg font-bold text-red-400">${data.globalTradeImpact?.lngImpact?.estimatedLngDailyCostBillions || 0}B</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Top Affected</span>
              <div class="flex gap-1">
                {#each (data.globalTradeImpact?.lngImpact?.topAffectedImporters || []) as importer}
                  <span class="px-2 py-0.5 rounded text-xs bg-red-900/40 text-red-400">{importer}</span>
                {/each}
              </div>
            </div>
            <p class="text-xs text-slate-500 mt-2">{data.globalTradeImpact?.lngImpact?.description || ''}</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Insurance Status</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Risk Level</span>
              <span class="px-3 py-1 rounded-full text-sm font-bold border border-red-500/50 text-red-400 bg-red-900/20">
                {data.insurance?.level || 'EXTREME'}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">War Risk Premium</span>
              <span class="text-lg font-bold text-red-400">{data.insurance?.warRiskPercent || 0}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Normal Premium</span>
              <span class="text-sm text-slate-300">{data.insurance?.normalPercent || 0}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Multiplier</span>
              <span class="text-sm text-red-400 font-bold">{data.insurance?.multiplier || 0}x normal</span>
            </div>
            <div class="mt-3">
              <div class="relative h-8 bg-slate-800 rounded-full overflow-hidden">
                <div class="absolute inset-y-0 left-0 bg-red-500/30 rounded-full" style="width: 100%"></div>
                <div class="absolute inset-y-0 left-0 bg-green-500/30 rounded-full" style="width: {(data.insurance?.normalPercent || 0.15) / (data.insurance?.warRiskPercent || 2.4) * 100}%"></div>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-mono">
                  <span class="text-green-400 mr-4">{data.insurance?.normalPercent || 0.15}% (normal)</span>
                  <span class="text-red-400">{data.insurance?.warRiskPercent || 2.4}% (current)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Affected Regions -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 class="text-lg font-semibold text-white mb-4">Regional Impact</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {#each (data.globalTradeImpact?.affectedRegions || []) as region}
            <a href="/regions/{region.name.toLowerCase().replace(/\s+/g, '-')}" class="block p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-white">{region.name}</span>
                <span class="px-2 py-0.5 rounded text-xs font-medium {region.severity === 'CRITICAL' ? 'bg-red-900/40 text-red-400' : region.severity === 'HIGH' ? 'bg-orange-900/40 text-orange-400' : 'bg-yellow-900/40 text-yellow-400'}">
                  {region.severity}
                </span>
              </div>
              <div class="text-2xl font-bold text-red-400 mb-1">{region.oilDependencyPercent}%</div>
              <div class="text-xs text-slate-400">Oil dependency on Hormuz</div>
            </a>
          {/each}
        </div>
      </div>

      <!-- Crisis Timeline -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">Crisis Timeline</h2>
          <a href="/timeline" class="text-sm text-red-400 hover:text-red-300 transition-colors">View Full Timeline</a>
        </div>
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
          <div class="space-y-4">
            {#each (data.crisisTimeline?.events || []).slice(-5) as event}
              <div class="relative pl-10">
                <div class="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 {getEventDotClass(event.type)}"></div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs text-slate-500 font-mono">{event.date}</span>
                  <span class="px-1.5 py-0.5 rounded text-xs font-medium {getEventBadgeClass(event.type)}">
                    {event.type?.replace(/_/g, ' ')}
                  </span>
                </div>
                <h4 class="text-sm font-medium text-white">{event.title}</h4>
                <p class="text-xs text-slate-400 mt-1 line-clamp-2">{event.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Supply Chain -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Supply Chain Disruptions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          {#each (data.globalTradeImpact?.supplyChainImpact?.keyDisruptions || []) as disruption}
            <div class="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
              <span class="text-red-400 mt-0.5 flex-shrink-0">&#9888;</span>
              <p class="text-sm text-slate-300">{disruption}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<svelte:head>
  <script>
    (function() {{
      function startCountdown() {{
        const sinceDate = new Date('2026-02-28').getTime();
        function update() {{
          const now = Date.now();
          const diff = now - sinceDate;
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          const dEl = document.getElementById('days-val');
          const hEl = document.getElementById('hours-val');
          const mEl = document.getElementById('mins-val');
          const sEl = document.getElementById('secs-val');
          if (dEl) dEl.textContent = d;
          if (hEl) hEl.textContent = String(h).padStart(2, '0');
          if (mEl) mEl.textContent = String(m).padStart(2, '0');
          if (sEl) sEl.textContent = String(s).padStart(2, '0');
        }}
        update();
        setInterval(update, 1000);
      }}
      if (document.readyState === 'loading') {{
        document.addEventListener('DOMContentLoaded', startCountdown);
      }} else {{
        startCountdown();
      }}
    }})();
  </script>
</svelte:head>
