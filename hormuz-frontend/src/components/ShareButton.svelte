<script>
let isOpen = $state(false);
let copied = $state(false);

let pageUrl = $state('');
let pageTitle = $state('');

$effect(() => {
  if (typeof window !== 'undefined') {
    pageUrl = window.location.href;
    pageTitle = document.title;
  }
});

function toggleModal() {
  isOpen = !isOpen;
  copied = false;
}

function closeOnBackdrop(e) {
  if (e.target === e.currentTarget) {
    isOpen = false;
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(pageUrl);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  } catch {
    const input = document.createElement('input');
    input.value = pageUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }
}

function shareTwitter() {
  const text = encodeURIComponent(`Strait of Hormuz Crisis Monitor — Live tracking of the global energy disruption. ${pageUrl}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400');
}

function shareLinkedIn() {
  const url = encodeURIComponent(pageUrl);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function shareFacebook() {
  const url = encodeURIComponent(pageUrl);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

async function nativeShare() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: pageTitle || 'Hormuz Crisis Monitor',
        text: 'Track the Strait of Hormuz crisis in real-time',
        url: pageUrl,
      });
    } catch {
      // User cancelled or share failed
    }
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    isOpen = false;
  }
}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Share Button -->
<button
  onclick={toggleModal}
  class="p-2 rounded-lg bg-ops-800/80 border border-ops-700/30 text-slate-400 hover:text-white hover:border-ops-600 transition-all"
  aria-label="Share"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
  </svg>
</button>

<!-- Modal -->
{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" onclick={closeOnBackdrop}>
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    <div class="relative glass-card p-6 w-full max-w-md animate-fade-in">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-lg font-bold text-white">Share This Page</h3>
        <button onclick={() => { isOpen = false; }} class="p-1 rounded-lg hover:bg-ops-800 text-slate-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Copy Link -->
      <div class="mb-4">
        <div class="flex items-center gap-2 bg-ops-900/80 rounded-lg border border-ops-700/30 p-2">
          <input
            type="text"
            value={pageUrl}
            readonly
            class="flex-1 bg-transparent text-sm text-slate-400 outline-none font-mono truncate"
          />
          <button
            onclick={copyLink}
            class="px-3 py-1.5 rounded-md text-xs font-semibold transition-all {copied ? 'bg-crisis-green/20 text-crisis-green' : 'bg-ops-700/80 text-white hover:bg-ops-600'}"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <!-- Social Buttons -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <!-- X / Twitter -->
        <button onclick={shareTwitter} class="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-ops-900/80 border border-ops-700/30 hover:border-ops-600 transition-colors group">
          <svg class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span class="text-sm text-slate-300 group-hover:text-white transition-colors">Share on X</span>
        </button>

        <!-- LinkedIn -->
        <button onclick={shareLinkedIn} class="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-ops-900/80 border border-ops-700/30 hover:border-ops-600 transition-colors group">
          <svg class="w-5 h-5 text-[#0A66C2] group-hover:text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span class="text-sm text-slate-300 group-hover:text-white transition-colors">LinkedIn</span>
        </button>

        <!-- Facebook -->
        <button onclick={shareFacebook} class="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-ops-900/80 border border-ops-700/30 hover:border-ops-600 transition-colors group">
          <svg class="w-5 h-5 text-[#1877F2] group-hover:text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span class="text-sm text-slate-300 group-hover:text-white transition-colors">Facebook</span>
        </button>

        <!-- Native Share / Share as Image -->
        {#if typeof navigator !== 'undefined' && navigator.share}
          <button onclick={nativeShare} class="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-ops-900/80 border border-ops-700/30 hover:border-ops-600 transition-colors group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <span class="text-sm text-slate-300 group-hover:text-white transition-colors">More Options</span>
          </button>
        {:else}
          <button
            onclick={() => {
              copyLink();
            }}
            class="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-ops-900/80 border border-ops-700/30 hover:border-ops-600 transition-colors group"
          >
            <svg class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span class="text-sm text-slate-300 group-hover:text-white transition-colors">Share as Image</span>
          </button>
        {/if}
      </div>

      <p class="text-[10px] text-slate-600 text-center">Help others stay informed about the Hormuz crisis</p>
    </div>
  </div>
{/if}
