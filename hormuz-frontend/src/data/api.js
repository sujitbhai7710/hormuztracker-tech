// API Base URL — The Worker API that scrapes and caches data
export const API_BASE = 'https://hormuz-api.tradesapi.workers.dev';

// Fetch helper with error handling
export async function fetchData(endpoint, fallback = null) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`API fetch failed for ${endpoint}:`, e.message);
    return fallback;
  }
}

// Format number with commas
export function formatNum(n) {
  if (n == null) return '—';
  return Number(n).toLocaleString('en-US');
}

// Format currency
export function formatCurrency(n, prefix = '$') {
  if (n == null) return '—';
  return prefix + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format percentage
export function formatPct(n) {
  if (n == null) return '—';
  return Number(n).toFixed(1) + '%';
}

// Format date
export function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Format relative time
export function timeAgo(d) {
  if (!d) return '';
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Get day number since crisis start
export function getCrisisDay() {
  const crisisStart = new Date('2026-02-28T00:00:00Z');
  return Math.floor((Date.now() - crisisStart.getTime()) / 86400000);
}

// Severity color
export function severityColor(severity) {
  const colors = {
    'CRITICAL': 'text-crisis-red bg-crisis-red/10 border-crisis-red/30',
    'HIGH': 'text-crisis-orange bg-crisis-orange/10 border-crisis-orange/30',
    'MODERATE': 'text-crisis-amber bg-crisis-amber/10 border-crisis-amber/30',
    'LOW': 'text-crisis-green bg-crisis-green/10 border-crisis-green/30',
    'EXTREME': 'text-crisis-red bg-crisis-red/10 border-crisis-red/30',
  };
  return colors[severity] || 'text-slate-400 bg-slate-400/10 border-slate-400/30';
}

// Event type color
export function eventTypeColor(type) {
  const colors = {
    'ESCALATION': 'bg-crisis-red',
    'MILITARY': 'bg-red-700',
    'ECONOMIC': 'bg-crisis-amber',
    'DIPLOMATIC': 'bg-crisis-blue',
    'DE-ESCALATION': 'bg-crisis-green',
  };
  return colors[type] || 'bg-slate-500';
}
