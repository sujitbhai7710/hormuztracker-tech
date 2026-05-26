<script lang="ts">
  import { onMount } from 'svelte';
  
  export let data: number[] = [];
  export let color: string = '#ef4444';
  export let width: number = 120;
  export let height: number = 32;
  
  let canvas: HTMLCanvasElement;
  
  $: {
    if (canvas && data.length > 0) {
      drawSparkline();
    }
  }
  
  function drawSparkline() {
    if (!canvas || data.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const w = canvas.width;
    const h = canvas.height;
    const padding = 2;
    
    ctx.clearRect(0, 0, w, h);
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const stepX = (w - padding * 2) / (data.length - 1);
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '05');
    
    ctx.beginPath();
    ctx.moveTo(padding, h - padding);
    
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * stepX;
      const y = h - padding - ((data[i] - min) / range) * (h - padding * 2);
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.lineTo(padding + (data.length - 1) * stepX, h - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * stepX;
      const y = h - padding - ((data[i] - min) / range) * (h - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Draw last point dot
    const lastX = padding + (data.length - 1) * stepX;
    const lastY = h - padding - ((data[data.length - 1] - min) / range) * (h - padding * 2);
    ctx.beginPath();
    ctx.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  onMount(() => {
    if (data.length > 0) drawSparkline();
  });
</script>

<canvas 
  bind:this={canvas}
  {width}
  {height}
  class="sparkline-canvas"
  style="width: {width}px; height: {height}px;"
></canvas>
