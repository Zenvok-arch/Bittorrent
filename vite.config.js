import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/CJS globals.
    // This is needed to make webtorrent work.
    global: {},
  },
  resolve: {
    alias: {
      // Force webtorrent to use the browser-compatible bundle.
      webtorrent: path.resolve(__dirname, 'node_modules/webtorrent/dist/webtorrent.min.js'),
    },
  },
});