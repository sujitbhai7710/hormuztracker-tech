<script>
import { onMount } from 'svelte';
import { API_BASE, formatPct } from '../data/api.js';

let severityData = $state(null);
let loading = $state(false);
let error = $state(null);
let animatedScore = $state(0);

const defaultSubScores = [
  { label: 'Ship Traffic', key: 'shipTraffic' },
  { label: 'Oil Prices', key: 'oilPrices' },
  { label: 'Insurance', key: 'insurance' },
  { label: 'Carriers', key: 'carriers' },
  { label: 'Security', key: 'security' },
];

let score = $derived(severityData?.score ?? 8);
let subScores = $derived(severityData?.subScores ?? {
  shipTraffic: 9,
  oilPrices: 8,
  insurance: 7,
  carriers: 9,
  security: 8,
});
let isHighSeverity = $derived(score >= 8);

function getGaugeColor(val) {
  if (val <= 3) return '#22c55e';
  if (val <= 5) return '#f59e0b';
  if (val <= 7) return '#f97316';
  return '#ef4444';
}

function getGaugeColorClass(val) {
  if (val <= 3) return 'text-crisis-green';
  if (val <= 5) return 'text-crisis-amber';
  if (val <= 7) return 'text-crisis-orange';
  return 'text-crisis-red';
}

function getBarColor(val) {
  if (val <= 3) return 'bg-crisis-green';
  if (val <= 5) return 'bg-crisis-amber';
  if (val <= 7) return 'bg-crisis-orange';
  return 'bg-crisis-red';
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

let needleAngle = $derived((animatedScore / 10) * 180);
let needlePoint = $derived(polarToCartesian(100, 100, 72, needleAngle));

function loadData() {
  // No external API — use default subScores directly
  severityData = null; // falls back to default subScores
  loading = false;
}

onMount(() => {
  loadData();
});

$effect(() => {
  if (score === undefined) return;
  const target = score;
  let current = animatedScore;
  const step = () => {
    if (Math.abs(current - target) < 0.05) {
      animatedScore = target;
      return;
    }
    current += (target - current) * 0.08;
    animatedScore = current;
    requestAnimationFrame(step);
  };
  const id = setTimeout(step, 300);
  return () => clearTimeout(id);
});
</script>

<div class="glass-card p-6 animate-fade-in" class:animate-glow-red={isHighSeverity && !loading}>
  <div class="flex items-center gap-3 mb-4">
    <div class="w-10 h-10 rounded-lg bg-crisis-red/20 flex items-center justify-center text-xl">📊</div>
    <div>
      <h2 class="text-lg font-bold text-white">Crisis Severity</h2>
      <p class="text-xs text-slate-500">Composite risk assessment</p>
    </div>
  </div>

  {#if loading && !severityData}
    <div class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-2 border-crisis-red/30 border-t-crisis-red rounded-full animate-spin"></div>
    </div>
  {:else}
    <!-- Semi-circular Gauge -->
    <div class="flex justify-center mb-4">
      <svg viewBox="0 0 200 120" class="w-full max-w-[280px]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#22c55e" />
            <stop offset="35%" stop-color="#f59e0b" />
            <stop offset="65%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#ef4444" />
          </linearGradient>
        </defs>

        <!-- Background arc -->
        {describeArc(100, 100, 80, 0, 180) && (
          <path
            d={describeArc(100, 100, 80, 0, 180)}
            fill="none"
            stroke="rgba(58,84,120,0.3)"
            stroke-width="14"
            stroke-linecap="round"
          />
        )}

        <!-- Colored arc -->
        <path
          d={describeArc(100, 100, 80, 0, Math.min((animatedScore / 10) * 180, 180))}
          fill="none"
          stroke="url(#gaugeGradient)"
          stroke-width="14"
          stroke-linecap="round"
        />

        <!-- Tick marks -->
        {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as tick}
          {@const tickAngle = (tick / 10) * 180}
          {@const tickOuter = polarToCartesian(100, 100, 88, tickAngle)}
          {@const tickInner = polarToCartesian(100, 100, 80, tickAngle)}
          <line
            x1={tickInner.x}
            y1={tickInner.y}
            x2={tickOuter.x}
            y2={tickOuter.y}
            stroke="rgba(100,130,160,0.4)"
            stroke-width="1.5"
          />
        {/each}

        <!-- Needle -->
        <line
          x1="100"
          y1="100"
          x2={needlePoint.x}
          y2={needlePoint.y}
          stroke={getGaugeColor(animatedScore)}
          stroke-width="3"
          stroke-linecap="round"
        />
        <circle cx="100" cy="100" r="6" fill={getGaugeColor(animatedScore)} />
        <circle cx="100" cy="100" r="3" fill="#0a1628" />

        <!-- Score text -->
        <text x="100" y="95" text-anchor="middle" class="fill-white text-2xl font-black" style="font-size:28px;font-weight:900">
          {score.toFixed(1)}
        </text>
        <text x="100" y="112" text-anchor="middle" style="font-size:10px;fill:#64748b">out of 10</text>

        <!-- Labels -->
        <text x="20" y="118" text-anchor="middle" style="font-size:9px;fill:#22c55e">LOW</text>
        <text x="100" y="118" text-anchor="middle" style="font-size:9px;fill:#f59e0b">MED</text>
        <text x="180" y="118" text-anchor="middle" style="font-size:9px;fill:#ef4444">HIGH</text>
      </svg>
    </div>

    <!-- Sub-scores -->
    <div class="space-y-2.5">
      {#each defaultSubScores as sub, i}
        {@const val = subScores[sub.key] ?? 5}
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-500 w-24 flex-shrink-0">{sub.label}</span>
          <div class="flex-1 h-2.5 bg-ops-800 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-1000 {getBarColor(val)}"
              style="width: {(val / 10) * 100}%"
            ></div>
          </div>
          <span class="text-xs font-mono font-bold {getGaugeColorClass(val)} w-6 text-right">{val}</span>
        </div>
      {/each}
    </div>

    <!-- Severity label -->
    <div class="mt-4 text-center">
      {#if isHighSeverity}
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crisis-red/20 text-crisis-red border border-crisis-red/30 animate-pulse-live">
          Critical — Monitor Active
        </span>
      {:else if score >= 5}
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crisis-amber/20 text-crisis-amber border border-crisis-amber/30">
          Elevated Risk
        </span>
      {:else}
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crisis-green/20 text-crisis-green border border-crisis-green/30">
          Moderate Risk
        </span>
      {/if}
    </div>

    {#if error}
      <div class="mt-3 text-center">
        <button onclick={loadData} class="text-xs text-crisis-blue hover:underline">Retry loading data</button>
      </div>
    {/if}
  {/if}
</div>
