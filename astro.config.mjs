import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from "@astrojs/react";
import fs from 'fs/promises';
import { renderTrpcPanel } from 'trpc-panel';
import {appRouter} from './src/ts/trpc';

function generateIndexHtml() {
  return {
    name: 'generate-index-html',
    async generateBundle(options, bundle) {
      // Generate the HTML for the TRPC panel
      const trpcPanelHtml = renderTrpcPanel(appRouter, { url: 'http://127.0.0.1:8788/trpc/api' });

      const folderPath = 'src/pages/trpc';
      fs.mkdir(folderPath, { recursive: true });

      // Write the HTML to a file called index.html
      await fs.writeFile(folderPath + '/index.html', trpcPanelHtml);

      console.log('index.html written successfully!');
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
  vite: {
    plugins: [
      // This doesn't work (Astro checks for the index.html, and it hasn't been built, so it errors)
      // run `pnpm prebuild` instead.
      // generateIndexHtml()
    ]
  }
});