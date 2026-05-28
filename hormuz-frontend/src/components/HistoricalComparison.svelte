<script>
import { onMount } from 'svelte';
import { API_BASE, formatNum } from '../data/api.js';

let historicalData = $state(null);
let loading = $state(true);
let error = $state(null);
let expandedIndex = $state(-1);

const defaultEvents = [
  {
    name: '1956 Suez Crisis',
    year: 1956,
    duration: '5 months',
    oilPriceSpike: 10,
    priceBefore: 2.50,
    priceAfter: 2.75,
    barrelDisrupted: 1.5,
    description: 'Egypt nationalized the Suez Canal. British, French, and Israeli military intervention. Canal blocked by sunken ships.',
    resolution: 'UN ceasefire; canal reopened after clearing sunken vessels',
    similarity: 'Strategic chokepoint closure; military confrontation; Western intervention',
  },
  {
    name: '1967 Six-Day War',
    year: 1967,
    duration: '8 years',
    oilPriceSpike: 15,
    priceBefore: 2.50,
    priceAfter: 2.88,
    barrelDisrupted: 3.0,
    description: 'Suez Canal closed after the Six-Day War. Ships forced to route around Cape of Good Hope, adding 10+ days.',
    resolution: 'Canal reopened in 1975 after Egyptian-Israeli disengagement',
    similarity: 'Extended chokepoint closure; permanent rerouting of global shipping; tanker market restructuring',
  },
  {
    name: '1973 Oil Embargo',
    year: 1973,
    duration: '5 months',
    oilPriceSpike: 400,
    priceBefore: 3.00,
    priceAfter: 12.00,
    barrelDisrupted: 8.0,
    description: 'OAPEC oil embargo against nations supporting Israel. Production cuts of 25%. Quadrupled oil prices.',
    resolution: 'Negotiated end; led to creation of IEA and strategic petroleum reserves',
    similarity: 'Deliberate supply restriction as geopolitical weapon; massive price spike; consumer panic',
  },
  {
    name: '1979 Iranian Revolution',
    year: 1979,
    duration: '12 months',
    oilPriceSpike: 150,
    priceBefore: 13.00,
    priceAfter: 32.50,
    barrelDisrupted: 5.0,
    description: 'Iranian Revolution shut down 5M bpd of production. Panic buying and hoarding amplified disruption.',
    resolution: 'Saudi Arabia increased production; prices stabilized by 1981',
    similarity: 'Major Gulf producer collapse; panic-driven price overshoot; long-term market restructuring',
  },
  {
    name: '1980-88 Tanker War',
    year: 1980,
    duration: '8 years',
    oilPriceSpike: 30,
    priceBefore: 32.00,
    priceAfter: 41.60,
    barrelDisrupted: 2.0,
    description: 'Iran-Iraq War: both sides attacked tankers in the Persian Gulf. 543 commercial ships attacked.',
    resolution: 'UN ceasefire 1988; US naval escort operations (Operation Earnest Will)',
    similarity: 'Direct attacks on commercial shipping in Persian Gulf; war risk insurance crisis; military convoy operations',
  },
  {
    name: '1990 Gulf War',
    year: 1990,
    duration: '7 months',
    oilPriceSpike: 130,
    priceBefore: 17.00,
    priceAfter: 39.10,
    barrelDisrupted: 4.5,
    description: 'Iraq invaded Kuwait, removing 4.5M bpd from markets. Prices doubled before US-led coalition response.',
    resolution: 'Coalition victory; Kuwait production restored over 2 years',
    similarity: 'Major Middle Eastern conflict disrupting oil; US military response; temporary massive price spike',
  },
];

let maxSpike = $derived(
  Math.max(...(historicalData?.events || defaultEvents).map(e => e.oilPriceSpike))
);

function getBarWidth(spike) {
  return maxSpike > 0 ? (spike / maxSpike) * 100 : 0;
}

function getSpikeColor(spike) {
  if (spike >= 200) return 'bg-crisis-red';
  if (spike >= 100) return 'bg-crisis-orange';
  if (spike >= 30) return 'bg-crisis-amber';
  return 'bg-crisis-green';
}

function getSpikeTextClass(spike) {
  if (spike >= 200) return 'text-crisis-red';
  if (spike >= 100) return 'text-crisis-orange';
  if (spike >= 30) return 'text-crisis-amber';
  return 'text-crisis-green';
}

async function loadData() {
  // No external API — use default data directly
  loading = false;
  historicalData = null; // uses defaultEvents in template
}

function toggleExpand(index) {
  expandedIndex = expandedIndex === index ? -1 : index;
}

onMount(() => {
  loadData();
});
</script>

<div class="glass-card p-6 animate-fade-in">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center text-xl">📜</div>
    <div>
      <h2 class="text-lg font-bold text-white">Historical Comparison</h2>
      <p class="text-xs text-slate-500">How past chokepoint crises compare</p>
    </div>
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
    </div>
  {:else}
    {@const events = historicalData?.events || defaultEvents}

    <!-- Summary -->
    <div class="bg-ops-900/60 rounded-lg p-4 border border-crisis-red/20 mb-5">
      <p class="text-sm text-slate-300">
        <span class="font-bold text-white">How does the current crisis compare?</span>
        The Hormuz crisis is unprecedented — it threatens <span class="text-crisis-red font-bold">21%</span> of world oil supply, more than any single historical event. Unlike past crises where alternative supply or routes existed, there is <span class="text-crisis-red font-bold">no substitute</span> for Hormuz's daily 18.5M barrel flow.
      </p>
    </div>

    <!-- Comparison Table -->
    <div class="space-y-2">
      {#each events as event, i}
        <div class="bg-ops-900/40 rounded-lg border border-ops-700/20 overflow-hidden transition-all hover:border-ops-600/40">
          <button
            onclick={() => toggleExpand(i)}
            class="w-full text-left p-3 flex items-center gap-3"
          >
            <!-- Year Badge -->
            <div class="w-12 text-center flex-shrink-0">
              <span class="text-xs font-mono font-bold text-slate-500">{event.year}</span>
            </div>

            <!-- Name + Bar -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold text-white truncate pr-2">{event.name}</span>
                <span class="text-xs font-bold {getSpikeTextClass(event.oilPriceSpike)} flex-shrink-0">
                  +{event.oilPriceSpike}%
                </span>
              </div>
              <div class="h-2 bg-ops-800 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700 {getSpikeColor(event.oilPriceSpike)}"
                  style="width: {getBarWidth(event.oilPriceSpike)}%"
                ></div>
              </div>
            </div>

            <!-- Chevron -->
            <svg class="w-4 h-4 text-slate-500 transition-transform flex-shrink-0 {expandedIndex === i ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          {#if expandedIndex === i}
            <div class="px-3 pb-3 pt-0 border-t border-ops-700/20 animate-fade-in">
              <div class="pt-3 space-y-3">
                <div class="grid grid-cols-3 gap-3 text-center">
                  <div class="bg-ops-800/50 rounded-lg p-2">
                    <div class="text-[10px] text-slate-500 uppercase">Duration</div>
                    <div class="text-xs font-bold text-white mt-0.5">{event.duration}</div>
                  </div>
                  <div class="bg-ops-800/50 rounded-lg p-2">
                    <div class="text-[10px] text-slate-500 uppercase">Price</div>
                    <div class="text-xs font-bold text-white mt-0.5">${event.priceBefore?.toFixed(2)} → ${event.priceAfter?.toFixed(2)}</div>
                  </div>
                  <div class="bg-ops-800/50 rounded-lg p-2">
                    <div class="text-[10px] text-slate-500 uppercase">Barrels Lost</div>
                    <div class="text-xs font-bold text-white mt-0.5">{event.barrelDisrupted}M bpd</div>
                  </div>
                </div>
                <p class="text-xs text-slate-400">{event.description}</p>
                <div class="bg-ops-800/30 rounded-lg p-2">
                  <div class="text-[10px] text-crisis-amber uppercase font-bold mb-0.5">Similarity to today</div>
                  <p class="text-xs text-slate-400">{event.similarity}</p>
                </div>
                <div class="text-[10px] text-slate-600">
                  <span class="font-medium text-slate-500">Resolution:</span> {event.resolution}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if error}
      <div class="mt-4 text-center">
        <p class="text-xs text-slate-500 mb-2">Showing default data (API unavailable)</p>
        <button onclick={loadData} class="text-xs text-crisis-blue hover:underline">Retry</button>
      </div>
    {/if}
  {/if}
</div>
