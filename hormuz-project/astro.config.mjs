import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  site: 'https://hormuz-watch.tradesapi.workers.dev',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    compatibilityFlags: ['nodejs_compat']
  }),
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['chart.js']
    }
  }
});
