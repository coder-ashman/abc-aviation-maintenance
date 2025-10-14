import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// This configuration builds the Vue micro‑frontend as an ES module that can be loaded
// by the root shell via import maps.  The single-spa-vue adapter is used at runtime
// (see src/main.ts) to register lifecycle methods.
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  server: {
    port: 4202,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  },
  preview: {
    port: 4202,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    modulePreload: false,
    cssCodeSplit: false,  // Ensure CSS is bundled into JS
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      output: {
        format: 'esm',
        inlineDynamicImports: true,  // Keep everything in one file
        assetFileNames: '[name][extname]',  // Preserve asset names
      },
    },
  },
});
