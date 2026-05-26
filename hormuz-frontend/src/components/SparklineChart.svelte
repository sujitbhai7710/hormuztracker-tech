<script>
let props = $props();
let data = $derived(props.data || []);
let color = $derived(props.color || '#3b82f6');
let width = $derived(props.width || 200);
let height = $derived(props.height || 50);
let showFill = $derived(props.showFill !== false);
let strokeWidth = $derived(props.strokeWidth || 2);

let hoverIndex = $state(-1);
let svgRef = $state(null);

let xScale = $derived(data.length > 1 ? (width - 10) / (data.length - 1) : 0);
let yMin = $derived(Math.min(...data));
let yMax = $derived(Math.max(...data));
let yRange = $derived(yMax - yMin || 1);

function getX(i) {
  return 5 + i * xScale;
}

function getY(val) {
  const padding = 4;
  return padding + ((yMax - val) / yRange) * (height - padding * 2);
}

let points = $derived(
  data.length < 2
    ? ''
    : data.map((val, i) => `${getX(i)},${getY(val)}`).join(' ')
);

let fillPath = $derived(() => {
  if (!showFill || data.length < 2) return '';
  const linePoints = data.map((val, i) => `${getX(i)},${getY(val)}`);
  return `M${linePoints[0]} ${linePoints.slice(1).map(p => `L${p}`).join(' ')} L${getX(data.length - 1)},${height} L${getX(0)},${height} Z`;
});

let gradientId = $derived(`spark-grad-${Math.random().toString(36).slice(2, 8)}`);

function handleMouse(e) {
  if (!svgRef || data.length < 2) return;
  const rect = svgRef.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const scaledX = (x / rect.width) * width;
  const closestIdx = Math.round((scaledX - 5) / xScale);
  if (closestIdx >= 0 && closestIdx < data.length) {
    hoverIndex = closestIdx;
  } else {
    hoverIndex = -1;
  }
}

function handleMouseLeave() {
  hoverIndex = -1;
}

let tooltipX = $derived(hoverIndex >= 0 ? getX(hoverIndex) : 0);
let tooltipY = $derived(hoverIndex >= 0 ? getY(data[hoverIndex]) : 0);
let tooltipVal = $derived(hoverIndex >= 0 ? data[hoverIndex] : null);
</script>

<div class="relative inline-block" style="width: {width}px; height: {height}px;">
  <svg
    bind:this={svgRef}
    viewBox="0 0 {width} {height}"
    style="width:100%;height:100%;"
    onmousemove={handleMouse}
    onmouseleave={handleMouseLeave}
    class="overflow-visible"
  >
    {#if showFill && data.length >= 2}
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color={color} stop-opacity="0.3" />
          <stop offset="100%" stop-color={color} stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath()} fill="url(#{gradientId})" />
    {/if}

    {#if data.length >= 2}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    {/if}

    {#if hoverIndex >= 0 && hoverIndex < data.length}
      <line
        x1={tooltipX}
        y1="0"
        x2={tooltipX}
        y2={height}
        stroke={color}
        stroke-width="1"
        stroke-opacity="0.3"
        stroke-dasharray="3,3"
      />
      <circle
        cx={tooltipX}
        cy={tooltipY}
        r="4"
        fill={color}
        stroke="#0a1628"
        stroke-width="2"
      />
    {/if}
  </svg>

  <!-- Tooltip -->
  {#if hoverIndex >= 0 && tooltipVal !== null}
    <div
      class="absolute pointer-events-none px-2 py-1 rounded text-xs font-mono font-bold text-white bg-ops-900/95 border border-ops-700/50 shadow-lg whitespace-nowrap z-10"
      style="left: {(tooltipX / width) * 100}%; top: {(tooltipY / height) * 100}%; transform: translate(-50%, -130%);"
    >
      {typeof tooltipVal === 'number' ? tooltipVal.toLocaleString('en-US', { maximumFractionDigits: 2 }) : tooltipVal}
    </div>
  {/if}
</div>
