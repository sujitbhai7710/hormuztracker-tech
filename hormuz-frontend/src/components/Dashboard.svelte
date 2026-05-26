<script>
import { onMount } from 'svelte';
import { API_BASE, formatNum, formatCurrency, formatPct, getCrisisDay, severityColor, eventTypeColor } from '../data/api.js';

let data = $state(null);
let loading = $state(true);
let error = $state(null);
let oilData = $state(null);
let currentTime = $state(new Date());
let activeTab = $state('overview');

async function loadData() {
  try {
    const [dashRes, oilRes] = await Promise.all([
      fetch(`${API_BASE}/api/dashboard`).then(r => r.json()),
      fetch(`${API_BASE}/api/oil`).then(r => r.json()),
    ]);
    data = dashRes;
    oilData = oilRes;
    error = null;
  } catch (e) {
    error = e.message;
  } finally {
    loading = false;
  }
}

onMount(() => {
  loadData();
  const interval = setInterval(loadData, 300000); // 5 min
  const timer = setInterval(() => { currentTime = new Date(); }, 1000);
  return () => { clearInterval(interval); clearInterval(timer); };
});

let crisisDay = $derived(getCrisisDay());
let durationHours = $derived(() => {
  const crisisStart = new Date('2026-02-28T00:00:00Z');
  const diff = Date.now() - crisisStart.getTime();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
});
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <div class="w-12 h-12 border-2 border-crisis-red/30 border-t-crisis-red rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-slate-400 text-sm">Loading live data...</p>
    </div>
  </div>
{:else if error && !data}
  <div class="max-w-4xl mx-auto px-4 py-16 text-center">
    <div class="glass-card p-8">
      <h2 class="text-xl font-bold text-crisis-red mb-2">Connection Error</h2>
      <p class="text-slate-400 mb-4">{error}</p>
      <button onclick={loadData} class="px-4 py-2 bg-crisis-red/20 text-crisis-red rounded-lg hover:bg-crisis-red/30 transition-colors">Retry</button>
    </div>
  </div>
{:else if data}
  <!-- Hero Section -->
  <div class="relative overflow-hidden border-b border-ops-800">
    <div class="absolute inset-0 bg-gradient-to-br from-crisis-red/5 via-transparent to-crisis-orange/5"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crisis-red/20 text-crisis-red border border-crisis-red/30 animate-glow-red">
              {data.straitStatus?.status || 'RESTRICTED'}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crisis-amber/20 text-crisis-amber border border-crisis-amber/30">
              SEVERITY {data.severityScore || 10}/10
            </span>
            <span class="text-sm text-slate-500">Since Feb 28, 2026</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-white mb-2">
            Strait of Hormuz — <span class="gradient-text-red">Crisis Monitor</span>
          </h1>
          <p class="text-slate-400 text-sm max-w-xl">{data.straitStatus?.description || 'Commercial shipping suspended through the Strait of Hormuz'}</p>
        </div>

        <!-- Duration Counter -->
        <div class="glass-card px-6 py-4 text-center min-w-[280px]">
          <div class="text-xs text-slate-500 uppercase tracking-wider mb-2">Disruption Duration</div>
          <div class="flex items-center justify-center gap-1 font-mono text-2xl font-bold text-white">
            <span class="bg-ops-800 px-2 py-1 rounded">{String(durationHours().d).padStart(2,'0')}</span>
            <span class="text-crisis-red animate-pulse-live">:</span>
            <span class="bg-ops-800 px-2 py-1 rounded">{String(durationHours().h).padStart(2,'0')}</span>
            <span class="text-crisis-red animate-pulse-live">:</span>
            <span class="bg-ops-800 px-2 py-1 rounded">{String(durationHours().m).padStart(2,'0')}</span>
            <span class="text-crisis-red animate-pulse-live">:</span>
            <span class="bg-ops-800 px-2 py-1 rounded">{String(durationHours().s).padStart(2,'0')}</span>
          </div>
          <div class="flex justify-center gap-5 mt-1 text-[10px] text-slate-500 uppercase">
            <span>Days</span><span>Hours</span><span>Min</span><span>Sec</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Key Metrics Row -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 -mt-0 pt-6">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <!-- Severity -->
      <div class="glass-card p-4 card-hover">
        <div class="text-xs text-slate-500 uppercase tracking-wider">Severity</div>
        <div class="text-2xl font-black text-crisis-red mt-1">{data.severityScore || 10}/10</div>
      </div>
      <!-- Ships Today -->
      <div class="glass-card p-4 card-hover">
        <div class="text-xs text-slate-500 uppercase tracking-wider">Ships Today</div>
        <div class="text-2xl font-black text-white mt-1">{data.shipCount?.last24h || 0}</div>
        <div class="text-xs text-crisis-red">vs {data.shipCount?.normalDaily || 60} normal</div>
      </div>
      <!-- Throughput -->
      <div class="glass-card p-4 card-hover">
        <div class="text-xs text-slate-500 uppercase tracking-wider">Daily Throughput</div>
        <div class="text-2xl font-black text-white mt-1">{data.throughput?.percentOfNormal || 50}%</div>
        <div class="text-xs text-slate-500">{(data.throughput?.todayDWT / 1000000).toFixed(1)}M / {(data.throughput?.averageDWT / 1000000).toFixed(1)}M DWT</div>
      </div>
      <!-- Carriers Suspended -->
      <div class="glass-card p-4 card-hover">
        <div class="text-xs text-slate-500 uppercase tracking-wider">Carriers</div>
        <div class="text-2xl font-black text-crisis-orange mt-1">{data.carriersSuspended || '9/9'}</div>
        <div class="text-xs text-crisis-red">Suspended</div>
      </div>
      <!-- Pipeline -->
      <div class="glass-card p-4 card-hover">
        <div class="text-xs text-slate-500 uppercase tracking-wider">Pipeline Coverage</div>
        <div class="text-2xl font-black text-crisis-amber mt-1">{data.pipelineCoverage || '35%'}</div>
        <div class="text-xs text-slate-500">of normal flow</div>
      </div>
      <!-- Insurance -->
      <div class="glass-card p-4 card-hover">
        <div class="text-xs text-slate-500 uppercase tracking-wider">War Risk</div>
        <div class="text-2xl font-black text-crisis-red mt-1">{data.insurance?.warRiskPercent || 3}%</div>
        <div class="text-xs text-crisis-red">{data.insurance?.multiplier || 20}x normal</div>
      </div>
    </div>
  </div>

  <!-- Main Content Grid -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

    <!-- Oil Prices + Brent Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 glass-card p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">Energy Prices</h2>
          <span class="text-xs text-slate-500">Live from exchange feeds</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-ops-900/50 rounded-lg p-3 border border-ops-700/30">
            <div class="text-xs text-slate-500">Brent Crude</div>
            <div class="text-xl font-bold text-white mt-1">{formatCurrency(oilData?.brent || data.oilPrice?.brentPrice)}</div>
            <div class="text-xs mt-1" class:text-crisis-green={data.oilPrice?.change24h > 0} class:text-crisis-red={data.oilPrice?.change24h < 0}>
              {data.oilPrice?.change24h > 0 ? '+' : ''}{data.oilPrice?.change24h?.toFixed(2) || '—'} ({data.oilPrice?.changePercent24h?.toFixed(2) || '—'}%)
            </div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 border border-ops-700/30">
            <div class="text-xs text-slate-500">WTI Crude</div>
            <div class="text-xl font-bold text-white mt-1">{formatCurrency(oilData?.wti)}</div>
            <div class="text-xs text-slate-500 mt-1">West Texas Intermediate</div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 border border-ops-700/30">
            <div class="text-xs text-slate-500">EU Gas (TTF)</div>
            <div class="text-xl font-bold text-white mt-1">{formatCurrency(oilData?.ttf, '€')}</div>
            <div class="text-xs text-slate-500 mt-1">Dutch TTF Hub</div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 border border-ops-700/30">
            <div class="text-xs text-slate-500">US Gasoline</div>
            <div class="text-xl font-bold text-white mt-1">{formatCurrency(oilData?.gasoline)}</div>
            <div class="text-xs text-slate-500 mt-1">National Average</div>
          </div>
        </div>
        <!-- Pre-Crisis Comparison -->
        <div class="mt-4 grid grid-cols-4 gap-3">
          <div class="text-center">
            <div class="text-[10px] text-slate-600 uppercase">Pre-Crisis Brent</div>
            <div class="text-sm font-mono text-slate-500">{formatCurrency(oilData?.preCrisis?.brent || 74.50)}</div>
          </div>
          <div class="text-center">
            <div class="text-[10px] text-slate-600 uppercase">Pre-Crisis WTI</div>
            <div class="text-sm font-mono text-slate-500">{formatCurrency(oilData?.preCrisis?.wti || 72.30)}</div>
          </div>
          <div class="text-center">
            <div class="text-[10px] text-slate-600 uppercase">Pre-Crisis TTF</div>
            <div class="text-sm font-mono text-slate-500">{formatCurrency(oilData?.preCrisis?.ttf || 28.50, '€')}</div>
          </div>
          <div class="text-center">
            <div class="text-[10px] text-slate-600 uppercase">Pre-Crisis Gas</div>
            <div class="text-sm font-mono text-slate-500">{formatCurrency(oilData?.preCrisis?.gasoline || 3.20)}</div>
          </div>
        </div>
      </div>

      <!-- Tanker Rates -->
      <div class="glass-card p-5 card-hover">
        <h2 class="text-lg font-bold text-white mb-4">Tanker Spot Rates</h2>
        <div class="space-y-4">
          <div>
            <div class="text-xs text-slate-500 uppercase">VLCC TD3C Current</div>
            <div class="text-3xl font-black text-white">{data.tankerRates?.currentRate || 100} <span class="text-lg text-slate-400">WS</span></div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-crisis-red">+{data.tankerRates?.changePercent || 100}%</span>
              <span class="text-xs text-slate-500">vs pre-crisis ({data.tankerRates?.preCrisisRate || 50} WS)</span>
            </div>
          </div>
          <div>
            <div class="text-xs text-slate-500 mb-1">{data.tankerRates?.route || 'Ras Tanura → East'}</div>
            <div class="text-xs text-slate-500">{data.tankerRates?.vesselType || 'VLCC'}</div>
          </div>
          <!-- Rate bar -->
          <div class="bg-ops-900/50 rounded-lg p-3">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Pre-Crisis</span>
              <span>Current</span>
            </div>
            <div class="h-3 bg-ops-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-crisis-amber to-crisis-red rounded-full transition-all duration-1000"
                   style="width: {Math.min((data.tankerRates?.currentRate || 100) / (data.tankerRates?.currentRate || 100) * 100, 100)}%">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diplomacy + Seizures -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Peace Talks -->
      <div class="glass-card p-5 card-hover">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-2 rounded-full bg-crisis-blue animate-pulse-live"></div>
          <h2 class="text-lg font-bold text-white">Peace Talks & Diplomacy</h2>
        </div>
        <div class="bg-ops-900/50 rounded-lg p-4 border border-crisis-blue/20">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2 py-0.5 rounded text-xs font-bold bg-crisis-blue/20 text-crisis-blue">
              {data.diplomacy?.status || 'IN PROGRESS'}
            </span>
            <span class="text-xs text-slate-500">{data.diplomacy?.date}</span>
          </div>
          <h3 class="text-sm font-semibold text-white mb-2">{data.diplomacy?.headline || 'Beijing-mediated talks resume'}</h3>
          <p class="text-xs text-slate-400 mb-3">{data.diplomacy?.summary || 'Emergency summit as global pressure mounts for strait reopening.'}</p>
          {#if data.diplomacy?.parties?.length}
            <div class="flex flex-wrap gap-1.5">
              {#each data.diplomacy.parties as party}
                <span class="px-2 py-0.5 rounded text-xs bg-ops-800 text-slate-300 border border-ops-700/50">{party}</span>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Stranded Vessels -->
      <div class="glass-card p-5 card-hover">
        <h2 class="text-lg font-bold text-white mb-4">Stranded Vessels</h2>
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-ops-900/50 rounded-lg p-3 text-center border border-ops-700/30">
            <div class="text-2xl font-black text-crisis-red">{data.strandedVessels?.total || 0}</div>
            <div class="text-xs text-slate-500 mt-1">Total</div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 text-center border border-ops-700/30">
            <div class="text-2xl font-black text-crisis-orange">{data.strandedVessels?.tankers || 0}</div>
            <div class="text-xs text-slate-500 mt-1">Tankers</div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 text-center border border-ops-700/30">
            <div class="text-2xl font-black text-crisis-amber">{data.strandedVessels?.bulk || 0}</div>
            <div class="text-xs text-slate-500 mt-1">Bulk/Other</div>
          </div>
        </div>
        {#if data.strandedVessels?.changeToday}
          <div class="mt-3 text-xs text-center" class:text-crisis-green={data.strandedVessels.changeToday < 0} class:text-crisis-red={data.strandedVessels.changeToday > 0}>
            {data.strandedVessels.changeToday > 0 ? '+' : ''}{data.strandedVessels.changeToday} today
          </div>
        {/if}
      </div>
    </div>

    <!-- Global Trade Impact -->
    <div class="glass-card p-5 card-hover">
      <h2 class="text-lg font-bold text-white mb-4">Global Trade Impact</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-ops-900/50 rounded-lg p-4 border border-ops-700/30 text-center">
          <div class="text-3xl font-black gradient-text-red">{data.globalTradeImpact?.percentOfWorldOilAtRisk || 21}%</div>
          <div class="text-xs text-slate-500 mt-1">World Oil at Risk</div>
        </div>
        <div class="bg-ops-900/50 rounded-lg p-4 border border-ops-700/30 text-center">
          <div class="text-3xl font-black gradient-text-gold">{formatCurrency(data.globalTradeImpact?.estimatedDailyCostBillions, '$')}B</div>
          <div class="text-xs text-slate-500 mt-1">Daily Cost</div>
        </div>
        <div class="bg-ops-900/50 rounded-lg p-4 border border-ops-700/30 text-center">
          <div class="text-3xl font-black text-crisis-orange">{data.globalTradeImpact?.lngImpact?.percentOfWorldLngAtRisk || 25}%</div>
          <div class="text-xs text-slate-500 mt-1">World LNG at Risk</div>
        </div>
        <div class="bg-ops-900/50 rounded-lg p-4 border border-ops-700/30 text-center">
          <div class="text-3xl font-black text-crisis-amber">+{data.globalTradeImpact?.supplyChainImpact?.shippingRateIncreasePercent || 85}%</div>
          <div class="text-xs text-slate-500 mt-1">Shipping Rate Increase</div>
        </div>
      </div>

      <!-- Region Heatmap -->
      <h3 class="text-sm font-semibold text-slate-300 mb-3">Most Exposed Nations</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {#each (data.globalTradeImpact?.affectedRegions || []) as region}
          <a href="/regions/{region.name.toLowerCase().replace(/\s+/g, '-')}" class="bg-ops-900/50 rounded-lg p-3 text-center border border-ops-700/30 hover:border-ops-600 transition-colors">
            <div class="text-xs font-bold {severityColor(region.severity).split(' ')[0]}">{region.severity}</div>
            <div class="text-sm font-semibold text-white mt-1">{region.name}</div>
            <div class="text-xs text-slate-500 mt-0.5">{region.oilDependencyPercent}% dep.</div>
          </a>
        {/each}
      </div>

      <!-- Supply Chain Disruptions -->
      {#if data.globalTradeImpact?.supplyChainImpact?.keyDisruptions?.length}
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-slate-300 mb-2">Key Disruptions</h3>
          <div class="flex flex-wrap gap-2">
            {#each data.globalTradeImpact.supplyChainImpact.keyDisruptions as disruption}
              <span class="px-2.5 py-1 rounded-full text-xs bg-crisis-red/10 text-crisis-red border border-crisis-red/20">{disruption}</span>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Insurance + LNG -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Insurance -->
      <div class="glass-card p-5 card-hover">
        <h2 class="text-lg font-bold text-white mb-4">War Risk Insurance</h2>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="bg-ops-900/50 rounded-lg p-3 text-center border border-crisis-red/20">
            <div class="text-xs text-slate-500">Risk Level</div>
            <div class="text-sm font-bold text-crisis-red mt-1">{data.insurance?.level || 'EXTREME'}</div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 text-center border border-ops-700/30">
            <div class="text-xs text-slate-500">War Risk</div>
            <div class="text-sm font-bold text-white mt-1">{data.insurance?.warRiskPercent || 3}%</div>
          </div>
          <div class="bg-ops-900/50 rounded-lg p-3 text-center border border-ops-700/30">
            <div class="text-xs text-slate-500">Multiplier</div>
            <div class="text-sm font-bold text-crisis-orange mt-1">{data.insurance?.multiplier || 20}x</div>
          </div>
        </div>
        <!-- Premium comparison bar -->
        <div class="bg-ops-900/50 rounded-lg p-3">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="text-slate-500">Normal: {data.insurance?.normalPercent || 0.15}%</span>
            <span class="text-crisis-red">Current: {data.insurance?.warRiskPercent || 3}%</span>
          </div>
          <div class="h-4 bg-ops-800 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-crisis-amber to-crisis-red rounded-full"
                 style="width: {Math.min((data.insurance?.warRiskPercent || 3) / 5 * 100, 100)}%"></div>
          </div>
        </div>
        <a href="/insurance" class="mt-4 block text-center text-xs text-crisis-blue hover:text-crisis-blue/80 transition-colors">View P&I Club Details →</a>
      </div>

      <!-- LNG Impact -->
      <div class="glass-card p-5 card-hover">
        <h2 class="text-lg font-bold text-white mb-4">LNG Supply Impact</h2>
        {#if data.globalTradeImpact?.lngImpact}
          <div class="space-y-3">
            <div class="bg-ops-900/50 rounded-lg p-4 border border-crisis-amber/20">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-slate-500">World LNG at Risk</div>
                  <div class="text-2xl font-black text-crisis-amber">{data.globalTradeImpact.lngImpact.percentOfWorldLngAtRisk}%</div>
                </div>
                <div>
                  <div class="text-xs text-slate-500">Daily Cost</div>
                  <div class="text-2xl font-black text-crisis-orange">{formatCurrency(data.globalTradeImpact.lngImpact.estimatedLngDailyCostBillions, '$')}B</div>
                </div>
              </div>
            </div>
            <p class="text-xs text-slate-400">{data.globalTradeImpact.lngImpact.description || 'Qatar LNG exports severely disrupted. No pipeline bypass exists for LNG.'}</p>
            {#if data.globalTradeImpact.lngImpact.topAffectedImporters?.length}
              <div class="flex flex-wrap gap-1.5">
                {#each data.globalTradeImpact.lngImpact.topAffectedImporters as importer}
                  <span class="px-2 py-0.5 rounded text-xs bg-crisis-amber/10 text-crisis-amber border border-crisis-amber/20">{importer}</span>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <!-- Timeline + News -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Crisis Timeline -->
      <div class="glass-card p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">Crisis Timeline</h2>
          <a href="/timeline" class="text-xs text-crisis-blue hover:text-crisis-blue/80">View All →</a>
        </div>
        <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {#each (data.crisisTimeline?.events || []).slice(0, 8) as event}
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 rounded-full {eventTypeColor(event.type)} flex-shrink-0 mt-1"></div>
                <div class="w-0.5 flex-1 bg-ops-700/50 mt-1"></div>
              </div>
              <div class="pb-3">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-slate-500">{event.date}</span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold {eventTypeColor(event.type)} text-white">{event.type}</span>
                </div>
                <h4 class="text-sm font-semibold text-white mt-0.5">{event.title}</h4>
                <p class="text-xs text-slate-400 mt-0.5">{event.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Latest News -->
      <div class="glass-card p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">Latest News</h2>
          <a href="/news" class="text-xs text-crisis-blue hover:text-crisis-blue/80">View All →</a>
        </div>
        <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {#each (data.news || []).slice(0, 6) as article}
            <a href={article.url || '#'} class="block bg-ops-900/50 rounded-lg p-3 border border-ops-700/30 hover:border-ops-600 transition-colors" target={article.url !== '#' ? '_blank' : undefined} rel="noopener">
              <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span class="font-medium text-slate-400">{article.source}</span>
                <span>·</span>
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <h4 class="text-sm font-semibold text-white leading-snug">{article.title}</h4>
              {#if article.description}
                <p class="text-xs text-slate-400 mt-1 line-clamp-2">{article.description}</p>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Alternative Routes Quick -->
    <div class="glass-card p-5 card-hover">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-white">Alternative Routes</h2>
        <a href="/routes" class="text-xs text-crisis-blue hover:text-crisis-blue/80">Full Details →</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {#each (data.globalTradeImpact?.alternativeRoutes || []).slice(0, 4) as route}
          <div class="bg-ops-900/50 rounded-lg p-3 border border-ops-700/30">
            <div class="text-sm font-semibold text-white">{route.name}</div>
            {#if route.additionalDays > 0}
              <div class="text-xs text-crisis-orange mt-1">+{route.additionalDays} days</div>
              <div class="text-xs text-crisis-red">+{formatCurrency(route.additionalCostPerVessel)} per vessel</div>
            {:else}
              <div class="text-xs text-crisis-green mt-1">{route.currentUsageStatus || 'Pipeline'}</div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Brent Crude Live Chart + Vessel Seizures Tracker -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- TradingView Brent Chart -->
      <div class="glass-card p-5 card-hover">
        <h2 class="text-lg font-bold text-white mb-4">Brent Crude — Live Chart</h2>
        <div class="tradingview-widget-container" style="height:400px;">
          <iframe
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=TVC%3AUKOIL&interval=D&theme=dark&style=1&locale=en"
            style="width:100%;height:100%;border:none;border-radius:8px;"
            loading="lazy"
            title="Brent Crude Live Chart"
          ></iframe>
        </div>
        <a href="/oil" class="mt-2 block text-center text-xs text-crisis-blue hover:text-crisis-blue/80 transition-colors">Why Hormuz oil matters →</a>
      </div>

      <!-- Vessel Seizures Tit-for-Tat Tracker -->
      <div class="glass-card p-5 card-hover">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">Vessel Seizures Tracker</h2>
          <a href="/seizures" class="text-xs text-crisis-blue hover:text-crisis-blue/80">Full Details →</a>
        </div>

        {#if data}
        {@const seizuresRaw = data.seizures || { iranSeized: 12, westSeized: 5, currentlyHeld: 6, timeline: [] }}
        {@const seizures = Array.isArray(seizuresRaw) ? { iranSeized: seizuresRaw.filter(s => s.entity?.includes('Iran')).length, westSeized: seizuresRaw.filter(s => s.entity?.includes('US/UK')).length, currentlyHeld: seizuresRaw.filter(s => s.status === 'Held').length, timeline: seizuresRaw } : seizuresRaw}
        {@const total = (seizures.iranSeized || 11) + (seizures.westSeized || 4)}

        <!-- Summary Bar -->
        <div class="bg-ops-900/60 rounded-lg p-4 border border-ops-700/30 mb-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-crisis-red">🇮🇷 Iran: {seizures.iranSeized || 11}</span>
              <span class="text-xs text-slate-600">vs</span>
              <span class="text-sm font-bold text-crisis-blue">🇺🇸🇬🇧 US/UK: {seizures.westSeized || 4}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-xs font-bold bg-crisis-amber/20 text-crisis-amber border border-crisis-amber/30">
              {seizures.currentlyHeld || 5} currently held
            </span>
          </div>
          <!-- Proportional Stacked Bar -->
          <div class="h-5 bg-ops-800 rounded-full overflow-hidden flex">
            <div
              class="h-full bg-gradient-to-r from-crisis-red to-crisis-red/80 transition-all duration-700 flex items-center justify-center"
              style="width: {((seizures.iranSeized || 11) / total) * 100}%"
            >
              <span class="text-[10px] font-bold text-white/80">{seizures.iranSeized || 11}</span>
            </div>
            <div
              class="h-full bg-gradient-to-r from-crisis-blue to-crisis-blue/80 transition-all duration-700 flex items-center justify-center"
              style="width: {((seizures.westSeized || 4) / total) * 100}%"
            >
              <span class="text-[10px] font-bold text-white/80">{seizures.westSeized || 4}</span>
            </div>
          </div>
          <div class="flex justify-between mt-1 text-[10px] text-slate-500">
            <span>Iranian seizures</span>
            <span>US/UK seizures</span>
          </div>
        </div>

        <!-- Timeline -->
        <div class="space-y-2 max-h-[250px] overflow-y-auto pr-1">
          {#each (seizures.timeline || [
            { date: 'Mar 5', side: 'iran', vessel: 'MT Pacific Voyager', flag: '🇬🇧', status: 'Held' },
            { date: 'Mar 3', side: 'west', vessel: 'MV Hormuz Star', flag: '🇮🇷', status: 'Released' },
            { date: 'Mar 1', side: 'iran', vessel: 'MT Eastern Crown', flag: '🇯🇵', status: 'Held' },
            { date: 'Feb 28', side: 'iran', vessel: 'MV Gulf Grace', flag: '🇰🇷', status: 'Held' },
            { date: 'Feb 26', side: 'west', vessel: 'MV Tehran Trader', flag: '🇮🇷', status: 'Released' },
            { date: 'Feb 24', side: 'iran', vessel: 'MT Stena Impero', flag: '🇬🇧', status: 'Released' },
          ]) as entry}
            <div class="flex items-center gap-2.5 bg-ops-900/40 rounded-lg p-2.5 border border-ops-700/20">
              <div class="w-2 h-2 rounded-full flex-shrink-0 {entry.side === 'iran' ? 'bg-crisis-red' : 'bg-crisis-blue'}"></div>
              <span class="text-[10px] font-mono text-slate-500 flex-shrink-0 w-12">{entry.date}</span>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-white truncate">{entry.vessel}</div>
                <div class="text-[10px] text-slate-500">{entry.flag}</div>
              </div>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold {entry.status === 'Held' ? 'bg-crisis-red/20 text-crisis-red' : 'bg-crisis-green/20 text-crisis-green'} flex-shrink-0">
                {entry.status}
              </span>
            </div>
          {/each}
        </div>
        {/if}
      </div>
    </div>

    <!-- Supply Chain Disruptions + Featured Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Supply Chain Disruptions -->
      <div class="lg:col-span-2 glass-card p-5 card-hover">
        <h2 class="text-lg font-bold text-white mb-4">Supply Chain Disruptions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div class="bg-ops-900/60 rounded-lg p-4 border border-crisis-red/20 text-center">
            <div class="text-2xl font-black text-crisis-red animate-pulse-live">+85%</div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Shipping Rates</div>
          </div>
          <div class="bg-ops-900/60 rounded-lg p-4 border border-crisis-orange/20 text-center">
            <div class="text-2xl font-black text-crisis-orange">+2.5%</div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider mt-1">CPI Impact</div>
          </div>
          <div class="bg-ops-900/60 rounded-lg p-4 border border-crisis-amber/20 text-center">
            <div class="text-2xl font-black text-crisis-amber">38d</div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider mt-1">SPR Reserve</div>
          </div>
          <div class="bg-ops-900/60 rounded-lg p-4 border border-ops-700/30 text-center">
            <div class="text-2xl font-black text-white">{data.shipCount?.last24h || 0}</div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Ships Today</div>
          </div>
        </div>

        <!-- Key Disruption Tags -->
        <div class="flex flex-wrap gap-2">
          {#each (data.globalTradeImpact?.supplyChainImpact?.keyDisruptions || [
            'Container rerouting',
            'War risk surcharges',
            'Crew safety zones',
            'P&I cancellations',
            'SPR drawdown',
            'Freight force majeure',
            'LNG cargo diversions',
            'Insurance market hardening',
          ]) as tag}
            <span class="px-2.5 py-1 rounded-full text-xs bg-crisis-red/10 text-crisis-red border border-crisis-red/20">{tag}</span>
          {/each}
        </div>

        <!-- Disruption Severity Breakdown -->
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-ops-900/40 rounded-lg p-3 border border-ops-700/20">
            <div class="text-xs font-bold text-white mb-2">Upstream Impacts</div>
            <ul class="space-y-1.5">
              <li class="flex items-center gap-2 text-xs text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-crisis-red flex-shrink-0"></span>
                Gulf crude production down 40%
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-crisis-orange flex-shrink-0"></span>
                Iraq export terminals at 60% capacity
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-crisis-amber flex-shrink-0"></span>
                Saudi East-West pipeline at maximum
              </li>
            </ul>
          </div>
          <div class="bg-ops-900/40 rounded-lg p-3 border border-ops-700/20">
            <div class="text-xs font-bold text-white mb-2">Downstream Impacts</div>
            <ul class="space-y-1.5">
              <li class="flex items-center gap-2 text-xs text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-crisis-red flex-shrink-0"></span>
                Asian refineries facing feedstock shortage
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-crisis-orange flex-shrink-0"></span>
                European gas prices at 3x seasonal norm
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-crisis-amber flex-shrink-0"></span>
                US gasoline at 6-month highs
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Featured Analysis -->
      <div class="glass-card p-5 card-hover flex flex-col">
        <div class="flex items-center gap-2 mb-4">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold/20 text-gold border border-gold/30">Featured Analysis</span>
        </div>
        <a href="/blog" class="block flex-1 group">
          <div class="bg-gradient-to-br from-ops-900/80 to-ops-800/40 rounded-lg p-4 border border-gold/10 h-full flex flex-col">
            <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Latest Deep Dive</div>
            <h3 class="text-base font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug">
              {data.featuredAnalysis?.title || 'Why Hormuz Matters More Than Suez: A Structural Analysis'}
            </h3>
            <p class="text-xs text-slate-400 mb-4 flex-1">
              {data.featuredAnalysis?.summary || 'The Strait of Hormuz handles 4x the traffic of Suez and has no viable maritime bypass. A closure isn\'t a detour — it\'s a hard stop on 21% of world oil supply.'}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-slate-600">{data.featuredAnalysis?.date || 'Feb 28, 2026'}</span>
              <span class="text-xs text-gold font-semibold group-hover:underline">Read more →</span>
            </div>
          </div>
        </a>
      </div>
    </div>

  </div>
{/if}
