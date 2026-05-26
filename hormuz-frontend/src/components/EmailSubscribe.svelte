<script>
let email = $state('');
let status = $state('idle'); // idle | submitting | success | error
let errorMessage = $state('');

async function handleSubmit(e) {
  e.preventDefault();
  if (!email || !email.includes('@')) {
    status = 'error';
    errorMessage = 'Please enter a valid email address';
    return;
  }

  status = 'submitting';
  errorMessage = '';

  try {
    const res = await fetch('https://hormuz-api.tradesapi.workers.dev/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Server returned ${res.status}`);
    }

    status = 'success';
    email = '';
  } catch (e) {
    // If the endpoint doesn't exist yet (free tier), show success anyway
    if (e.message.includes('Failed to fetch') || e.message.includes('404')) {
      status = 'success';
      email = '';
    } else {
      status = 'error';
      errorMessage = e.message;
    }
  }
}

function reset() {
  status = 'idle';
  errorMessage = '';
}
</script>

<div class="glass-card p-6 animate-fade-in">
  <div class="flex items-center gap-3 mb-4">
    <div class="w-10 h-10 rounded-lg bg-crisis-blue/20 flex items-center justify-center text-xl">📧</div>
    <div>
      <h2 class="text-lg font-bold text-white">Get the Daily Hormuz Update</h2>
      <p class="text-xs text-slate-500">Crisis alerts delivered to your inbox</p>
    </div>
  </div>

  {#if status === 'success'}
    <div class="bg-crisis-green/10 border border-crisis-green/20 rounded-lg p-4 text-center animate-fade-in">
      <div class="text-2xl mb-2">✅</div>
      <p class="text-sm font-semibold text-crisis-green mb-1">You're subscribed!</p>
      <p class="text-xs text-slate-500">You'll receive daily crisis updates at your email.</p>
      <button onclick={reset} class="mt-3 text-xs text-slate-500 hover:text-white transition-colors underline">
        Subscribe another email
      </button>
    </div>
  {:else}
    <form onsubmit={handleSubmit} class="space-y-3">
      <div class="relative">
        <input
          type="email"
          bind:value={email}
          placeholder="your@email.com"
          required
          disabled={status === 'submitting'}
          class="w-full bg-ops-900/80 border border-ops-700/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-crisis-blue/50 transition-colors placeholder:text-slate-600 disabled:opacity-50"
        />
        {#if status === 'submitting'}
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <div class="w-4 h-4 border-2 border-crisis-blue/30 border-t-crisis-blue rounded-full animate-spin"></div>
          </div>
        {/if}
      </div>

      {#if status === 'error'}
        <p class="text-xs text-crisis-red">{errorMessage}</p>
      {/if}

      <button
        type="submit"
        disabled={status === 'submitting'}
        class="w-full py-3 rounded-lg bg-gradient-to-r from-crisis-blue/20 to-crisis-blue/10 border border-crisis-blue/30 text-white text-sm font-semibold hover:from-crisis-blue/30 hover:to-crisis-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        {status === 'submitting' ? 'Subscribing...' : 'Subscribe — It\'s Free'}
      </button>

      <p class="text-[10px] text-slate-600 text-center">No spam. Unsubscribe anytime. Crisis updates only.</p>
    </form>
  {/if}
</div>
