import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://hormuztracker.tech',
  integrations: [svelte(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['chart.js']
    }
  }
});
