<script>
import { onMount } from 'svelte';
import { API_BASE, formatCurrency, formatNum } from '../data/api.js';

let clubsData = $state(null);
let loading = $state(false);
let error = $state(null);
let hoveredClub = $state(-1);

const defaultClubs = [
  {
    name: 'North of England',
    acronym: 'North',
    status: 'Cancelled',
    premiumBefore: 0.15,
    premiumCurrent: 3.50,
    members: 180,
    tonnage: '80M GT',
    flag: '🇬🇧',
    details: 'Oldest P&I Club. First to cancel Hormuz transit coverage on Day 3 of the crisis.',
  },
  {
    name: 'Britannia',
    acronym: 'Britannia',
    status: 'Cancelled',
    premiumBefore: 0.14,
    premiumCurrent: 3.20,
    members: 150,
    tonnage: '65M GT',
    flag: '🇬🇧',
    details: 'Withdrew war risk coverage for all Persian Gulf transits. Members must seek alternative cover.',
  },
  {
    name: 'Gard',
    acronym: 'Gard',
    status: 'Restricted',
    premiumBefore: 0.13,
    premiumCurrent: 2.80,
    members: 200,
    tonnage: '95M GT',
    flag: '🇳🇴',
    details: 'Norwegian club. Maintaining limited coverage for non-military voyages with 10x premium surcharge.',
  },
  {
    name: 'Steamship Mutual',
    acronym: 'Steamship',
    status: 'Cancelled',
    premiumBefore: 0.15,
    premiumCurrent: 3.40,
    members: 130,
    tonnage: '55M GT',
    flag: '🇬🇧',
    details: 'Complete cancellation of Hormuz transit P&I cover. Vessels advised to avoid the region entirely.',
  },
  {
    name: 'West of England',
    acronym: 'West',
    status: 'Restricted',
    premiumBefore: 0.14,
    premiumCurrent: 2.90,
    members: 110,
    tonnage: '45M GT',
    flag: '🇬🇧',
    details: 'Offering restricted coverage at 20x normal rates with a $5M deductible per vessel per voyage.',
  },
  {
    name: 'Swedish Club',
    acronym: 'Swedish',
    status: 'Cancelled',
    premiumBefore: 0.13,
    premiumCurrent: 3.10,
    members: 140,
    tonnage: '60M GT',
    flag: '🇸🇪',
    details: 'Cancelled all Gulf transit coverage. Issued notice of cancellation effective immediately.',
  },
];

function getStatusStyle(status) {
  switch (status?.toLowerCase()) {
    case 'cancelled':
      return { badge: 'bg-crisis-red/20 text-crisis-red border-crisis-red/30', dot: 'bg-crisis-red' };
    case 'restricted':
      return { badge: 'bg-crisis-amber/20 text-crisis-amber border-crisis-amber/30', dot: 'bg-crisis-amber' };
    case 'active':
      return { badge: 'bg-crisis-green/20 text-crisis-green border-crisis-green/30', dot: 'bg-crisis-green' };
    default:
      return { badge: 'bg-slate-500/20 text-slate-400 border-slate-500/30', dot: 'bg-slate-500' };
  }
}

function loadData() {
  // No external API — use default data directly
  clubsData = null; // uses defaultClubs in template
  loading = false;
}

onMount(() => {
  loadData();
});
</script>

<div class="glass-card p-6 animate-fade-in">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-crisis-red/20 flex items-center justify-center text-xl">🛡️</div>
      <div>
        <h2 class="text-lg font-bold text-white">P&I Club Status</h2>
        <p class="text-xs text-slate-500">War risk insurance coverage</p>
      </div>
    </div>
    <a href="/insurance" class="text-xs text-crisis-blue hover:text-crisis-blue/80 transition-colors">Full Details →</a>
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-2 border-crisis-red/30 border-t-crisis-red rounded-full animate-spin"></div>
    </div>
  {:else}
    {@const clubs = clubsData?.clubs || defaultClubs}

    <!-- Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      {#each clubs as club, i}
        {@const style = getStatusStyle(club.status)}
        <div
          class="relative bg-ops-900/60 rounded-lg p-4 border border-ops-700/30 hover:border-ops-600/50 transition-all cursor-default"
          onmouseenter={() => { hoveredClub = i; }}
          onmouseleave={() => { hoveredClub = -1; }}
        >
          <!-- Club Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">{club.flag}</span>
              <span class="text-sm font-bold text-white">{club.acronym || club.name.split(' ')[0]}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border {style.badge}">
              {club.status}
            </span>
          </div>

          <!-- Premium Change -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-500">Premium</span>
              <span class="font-mono">
                <span class="text-slate-500">{club.premiumBefore}%</span>
                <span class="text-slate-600 mx-1">→</span>
                <span class="text-crisis-red font-bold">{club.premiumCurrent}%</span>
              </span>
            </div>
            <div class="h-1.5 bg-ops-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-slate-600 to-crisis-red transition-all duration-700"
                   style="width: {Math.min((club.premiumCurrent / 4) * 100, 100)}%">
              </div>
            </div>
          </div>

          <!-- Hover Details -->
          {#if hoveredClub === i}
            <div class="absolute left-0 right-0 bottom-full mb-2 z-20 bg-ops-900/98 border border-ops-700/50 rounded-lg p-3 shadow-xl animate-fade-in">
              <div class="text-sm font-bold text-white mb-1">{club.name}</div>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <div class="text-[10px] text-slate-500 uppercase">Members</div>
                  <div class="text-xs font-bold text-white">{formatNum(club.members)}</div>
                </div>
                <div>
                  <div class="text-[10px] text-slate-500 uppercase">Tonnage</div>
                  <div class="text-xs font-bold text-white">{club.tonnage}</div>
                </div>
              </div>
              <p class="text-[10px] text-slate-400">{club.details}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Summary -->
    <div class="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-crisis-red"></span>
        {clubs.filter(c => c.status === 'Cancelled').length} Cancelled
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-crisis-amber"></span>
        {clubs.filter(c => c.status === 'Restricted').length} Restricted
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-crisis-green"></span>
        {clubs.filter(c => c.status === 'Active').length} Active
      </span>
    </div>

    {#if error}
      <div class="mt-3 text-center">
        <p class="text-[10px] text-slate-600">Showing default data (API unavailable)</p>
        <button onclick={loadData} class="text-xs text-crisis-blue hover:underline">Retry</button>
      </div>
    {/if}
  {/if}
</div>
