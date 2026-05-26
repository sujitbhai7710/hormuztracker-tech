<script>
let props = $props();
let name = $derived(props.name || 'Pipeline');
let capacity = $derived(props.capacity || 0);
let maxCapacity = $derived(props.maxCapacity || 100);
let status = $derived(props.status || 'Active');
let description = $derived(props.description || '');

let expanded = $state(false);

let percent = $derived(maxCapacity > 0 ? Math.min((capacity / maxCapacity) * 100, 100) : 0);

let statusColor = $derived.by(() => {
  switch (status?.toLowerCase()) {
    case 'active': return { bar: 'bg-crisis-green', text: 'text-crisis-green', bg: 'bg-crisis-green/10', border: 'border-crisis-green/30' };
    case 'intermittent': return { bar: 'bg-crisis-amber', text: 'text-crisis-amber', bg: 'bg-crisis-amber/10', border: 'border-crisis-amber/30' };
    case 'disrupted': return { bar: 'bg-crisis-red', text: 'text-crisis-red', bg: 'bg-crisis-red/10', border: 'border-crisis-red/30' };
    default: return { bar: 'bg-slate-500', text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' };
  }
});
</script>

<div class="bg-ops-900/50 rounded-lg border border-ops-700/30 overflow-hidden transition-all hover:border-ops-600/50">
  <button
    onclick={() => { expanded = !expanded; }}
    class="w-full text-left p-4 flex items-center gap-3"
  >
    <!-- Pipeline Icon -->
    <div class="w-8 h-8 rounded-lg {statusColor.bg} flex items-center justify-center flex-shrink-0">
      <svg class="w-4 h-4 {statusColor.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>

    <!-- Pipeline Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-sm font-semibold text-white truncate">{name}</span>
        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider {statusColor.bg} {statusColor.text} border {statusColor.border} flex-shrink-0 ml-2">
          {status}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex-1 h-2 bg-ops-800 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700 {statusColor.bar}"
            style="width: {percent}%"
          ></div>
        </div>
        <span class="text-xs font-mono text-slate-400 flex-shrink-0">{percent.toFixed(0)}%</span>
      </div>
    </div>

    <!-- Expand Chevron -->
    <svg class="w-4 h-4 text-slate-500 transition-transform flex-shrink-0 {expanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </button>

  {#if expanded}
    <div class="px-4 pb-4 pt-0 border-t border-ops-700/30 animate-fade-in">
      <div class="pt-3 space-y-2">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider">Current Capacity</div>
            <div class="text-sm font-bold text-white">{capacity.toLocaleString()} kb/d</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-500 uppercase tracking-wider">Maximum Capacity</div>
            <div class="text-sm font-bold text-white">{maxCapacity.toLocaleString()} kb/d</div>
          </div>
        </div>
        {#if description}
          <p class="text-xs text-slate-400">{description}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>
