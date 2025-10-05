import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// This configuration builds the Vue micro‑frontend as an ES module that can be loaded
// by the root shell via import maps.  The single-spa-vue adapter is used at runtime
// (see src/main.ts) to register lifecycle methods.
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
      output: {
        format: 'esm',
        entryFileNames: 'maintenance/[name].js',
        chunkFileNames: 'maintenance/[name].js',
      },
    },
  },
});