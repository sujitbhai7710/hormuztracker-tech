<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let since: string = '2026-02-28';
  
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let interval: any;
  
  function update() {
    const start = new Date(since).getTime();
    const now = Date.now();
    const diff = now - start;
    
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }
  
  onMount(() => {
    update();
    interval = setInterval(update, 1000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="flex items-center justify-center gap-1 font-mono">
  <div class="flex flex-col items-center">
    <span class="text-3xl sm:text-4xl font-bold text-white">{days}</span>
    <span class="text-xs text-slate-400 uppercase tracking-wider">Days</span>
  </div>
  <span class="text-2xl text-red-500 font-bold animate-pulse">:</span>
  <div class="flex flex-col items-center">
    <span class="text-3xl sm:text-4xl font-bold text-white">{String(hours).padStart(2, '0')}</span>
    <span class="text-xs text-slate-400 uppercase tracking-wider">Hours</span>
  </div>
  <span class="text-2xl text-red-500 font-bold animate-pulse">:</span>
  <div class="flex flex-col items-center">
    <span class="text-3xl sm:text-4xl font-bold text-white">{String(minutes).padStart(2, '0')}</span>
    <span class="text-xs text-slate-400 uppercase tracking-wider">Min</span>
  </div>
  <span class="text-2xl text-red-500 font-bold animate-pulse">:</span>
  <div class="flex flex-col items-center">
    <span class="text-3xl sm:text-4xl font-bold text-white">{String(seconds).padStart(2, '0')}</span>
    <span class="text-xs text-slate-400 uppercase tracking-wider">Sec</span>
  </div>
</div>
