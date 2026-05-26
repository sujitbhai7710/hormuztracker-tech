import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://hormuztracker-tech.pages.dev',
  integrations: [svelte(), sitemap({
    filter: (page) => !page.includes('/embed/'),
    changefreq: 'hourly',
    priority: 1.0,
  })],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['chart.js']
    }
  }
});
