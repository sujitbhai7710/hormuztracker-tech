<script>
import { onMount } from 'svelte';
import { API_BASE, formatCurrency } from '../data/api.js';

let impactData = $state(null);
let loading = $state(true);
let error = $state(null);
let selectedCountry = $state('US');
let monthlySpend = $state('');
let showShareToast = $state(false);

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

let result = $derived.by(() => {
  if (!impactData || !monthlySpend) return null;
  const country = impactData.countries?.find(c => c.code === selectedCountry);
  if (!country) return null;
  const spend = parseFloat(monthlySpend);
  if (isNaN(spend) || spend <= 0) return null;
  const preCrisisSpend = spend / (1 + country.increasePercent / 100);
  const extraPerMonth = spend - preCrisisSpend;
  const extraPerYear = extraPerMonth * 12;
  return {
    preCrisisSpend,
    currentSpend: spend,
    extraPerMonth,
    extraPerYear,
    increasePercent: country.increasePercent,
    fuelType: country.fuelType,
    unit: country.unit,
    countryName: country.name,
  };
});

let equivalencies = $derived.by(() => {
  if (!result) return [];
  const yearly = result.extraPerYear;
  const items = [];
  if (result.unit === '$' || result.unit === 'USD') {
    if (yearly >= 50) items.push({ icon: '🛒', label: 'Grocery trips', value: Math.round(yearly / 75) });
    if (yearly >= 15) items.push({ icon: '☕', label: 'Coffees', value: Math.round(yearly / 5.5) });
    if (yearly >= 12) items.push({ icon: '🎬', label: 'Movie nights', value: Math.round(yearly / 15) });
    if (yearly >= 800) items.push({ icon: '✈️', label: 'Flights', value: Math.round(yearly / 350) });
    if (yearly >= 1200) items.push({ icon: '📱', label: 'Phone upgrades', value: Math.round(yearly / 1200) });
  } else {
    if (yearly >= 50) items.push({ icon: '🛒', label: 'Grocery trips', value: Math.round(yearly / 60) });
    if (yearly >= 10) items.push({ icon: '☕', label: 'Coffees', value: Math.round(yearly / 4) });
    if (yearly >= 800) items.push({ icon: '✈️', label: 'Flights', value: Math.round(yearly / 300) });
  }
  return items.slice(0, 4);
});

async function loadData() {
  try {
    loading = true;
    const res = await fetch(`${API_BASE}/api/consumer-impact`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    impactData = await res.json();
    error = null;
  } catch (e) {
    error = e.message;
  } finally {
    loading = false;
  }
}

function shareImpact() {
  if (!result) return;
  const text = `The Strait of Hormuz crisis is costing me an extra ${formatCurrency(result.extraPerMonth, result.unit || '$')}/month on fuel. That's ${formatCurrency(result.extraPerYear, result.unit || '$')}/year! Check your impact → ${window.location.href}`;
  if (navigator.share) {
    navigator.share({ title: 'Hormuz Crisis — My Impact', text, url: window.location.href });
  } else {
    navigator.clipboard.writeText(text);
    showShareToast = true;
    setTimeout(() => { showShareToast = false; }, 3000);
  }
}

onMount(() => {
  loadData();
});
</script>

<div class="glass-card p-6 animate-fade-in">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-lg bg-crisis-orange/20 flex items-center justify-center text-xl">💸</div>
    <div>
      <h2 class="text-lg font-bold text-white">How Much Is This Costing You?</h2>
      <p class="text-xs text-slate-500">See your personal impact from the Hormuz crisis</p>
    </div>
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-2 border-crisis-orange/30 border-t-crisis-orange rounded-full animate-spin"></div>
    </div>
  {:else if error && !impactData}
    <div class="text-center py-8">
      <p class="text-sm text-crisis-red mb-3">Failed to load impact data</p>
      <button onclick={loadData} class="px-4 py-2 bg-crisis-orange/20 text-crisis-orange rounded-lg text-sm hover:bg-crisis-orange/30 transition-colors">Retry</button>
    </div>
  {:else}
    <!-- Country Selector -->
    <div class="mb-5">
      <label class="block text-xs text-slate-500 uppercase tracking-wider mb-2">Your Country</label>
      <div class="relative">
        <select bind:value={selectedCountry} class="w-full bg-ops-900/80 border border-ops-700/50 rounded-lg px-4 py-3 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-crisis-orange/50 transition-colors">
          {#each countries as c}
            <option value={c.code}>{c.flag} {c.name}</option>
          {/each}
        </select>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
    </div>

    <!-- Monthly Spend Input -->
    <div class="mb-6">
      <label class="block text-xs text-slate-500 uppercase tracking-wider mb-2">Monthly {impactData?.countries?.find(c => c.code === selectedCountry)?.fuelType || 'Fuel/Gas'} Spend</label>
      <div class="relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">{impactData?.countries?.find(c => c.code === selectedCountry)?.unit || '$'}</span>
        <input
          type="number"
          bind:value={monthlySpend}
          placeholder="0.00"
          min="0"
          step="0.01"
          class="w-full bg-ops-900/80 border border-ops-700/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-crisis-orange/50 transition-colors placeholder:text-slate-600"
        />
      </div>
      <!-- Quick presets -->
      <div class="flex gap-2 mt-2">
        {#each [50, 100, 200, 400] as preset}
          <button
            onclick={() => { monthlySpend = String(preset); }}
            class="px-3 py-1 rounded-md text-xs bg-ops-800/80 text-slate-400 hover:text-white hover:bg-ops-700/80 transition-colors border border-ops-700/30"
          >
            {impactData?.countries?.find(c => c.code === selectedCountry)?.unit || '$'}{preset}
          </button>
        {/each}
      </div>
    </div>

    <!-- Results -->
    {#if result}
      <div class="space-y-4 animate-fade-in">
        <!-- Extra Cost Cards -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-ops-900/60 rounded-lg p-4 border border-crisis-red/20">
            <div class="text-xs text-slate-500 uppercase tracking-wider">Extra Per Month</div>
            <div class="text-2xl font-black text-crisis-red mt-1">{formatCurrency(result.extraPerMonth, result.unit || '$')}</div>
            <div class="text-xs text-crisis-red/80 mt-1">+{result.increasePercent}% increase</div>
          </div>
          <div class="bg-ops-900/60 rounded-lg p-4 border border-crisis-orange/20">
            <div class="text-xs text-slate-500 uppercase tracking-wider">Extra Per Year</div>
            <div class="text-2xl font-black text-crisis-orange mt-1">{formatCurrency(result.extraPerYear, result.unit || '$')}</div>
            <div class="text-xs text-slate-400 mt-1">Due to Hormuz crisis</div>
          </div>
        </div>

        <!-- Comparison Bar -->
        <div class="bg-ops-900/60 rounded-lg p-4 border border-ops-700/30">
          <div class="flex items-center justify-between text-xs mb-3">
            <span class="text-slate-500">Pre-Crisis Cost</span>
            <span class="text-crisis-red font-bold">Current Cost</span>
          </div>
          <div class="space-y-2">
            <div>
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="text-slate-400">Before</span>
                <span class="text-crisis-green font-mono">{formatCurrency(result.preCrisisSpend, result.unit || '$')}</span>
              </div>
              <div class="h-4 bg-ops-800 rounded-full overflow-hidden">
                <div class="h-full bg-crisis-green/60 rounded-full transition-all duration-700"
                     style="width: {(result.preCrisisSpend / result.currentSpend) * 100}%"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="text-slate-400">Now</span>
                <span class="text-crisis-red font-mono">{formatCurrency(result.currentSpend, result.unit || '$')}</span>
              </div>
              <div class="h-4 bg-ops-800 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-crisis-amber to-crisis-red rounded-full transition-all duration-700"
                     style="width: 100%"></div>
              </div>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-ops-700/30 flex items-center justify-center gap-2">
            <span class="text-xs text-slate-500">You're paying</span>
            <span class="text-lg font-black text-crisis-red">{result.increasePercent}%</span>
            <span class="text-xs text-slate-500">more for {result.fuelType || 'fuel'}</span>
          </div>
        </div>

        <!-- Equivalency Cards -->
        {#if equivalencies.length > 0}
          <div class="bg-ops-900/60 rounded-lg p-4 border border-ops-700/30">
            <div class="text-xs text-slate-500 uppercase tracking-wider mb-3">That extra money could buy you...</div>
            <div class="grid grid-cols-2 gap-3">
              {#each equivalencies as eq}
                <div class="flex items-center gap-2 bg-ops-800/50 rounded-lg p-2.5">
                  <span class="text-lg">{eq.icon}</span>
                  <div>
                    <div class="text-sm font-bold text-white">{eq.value}x</div>
                    <div class="text-[10px] text-slate-500">{eq.label}/year</div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Share Button -->
        <button
          onclick={shareImpact}
          class="w-full py-3 rounded-lg bg-gradient-to-r from-crisis-orange/20 to-crisis-red/20 border border-crisis-orange/30 text-white text-sm font-semibold hover:from-crisis-orange/30 hover:to-crisis-red/30 transition-all flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          Share Your Impact
        </button>
      </div>
    {:else if monthlySpend}
      <div class="text-center py-6 text-sm text-slate-500">Enter your monthly spend to see impact</div>
    {:else}
      <div class="text-center py-6">
        <div class="text-3xl mb-2">⛽</div>
        <p class="text-sm text-slate-500">Enter your monthly fuel spend above to calculate your personal crisis impact</p>
      </div>
    {/if}
  {/if}

  <!-- Share Toast -->
  {#if showShareToast}
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-crisis-green/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
      Copied to clipboard!
    </div>
  {/if}
</div>
