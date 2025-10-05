# Maintenance App (Vue)

This repository contains the maintenance application built with **Vue 3** and integrated into the ABC Aviation platform via **single-spa-vue**.  It exposes work orders, MEL/deferrals and alerts as a micro‑frontend that can be loaded via an import map.

The `src/main.ts` file registers the Vue app with single-spa.  The root component (`App.vue`) currently displays a list of work orders as a placeholder; extend it to implement full CRUD workflows, status filters and tenant theming.

To run this app independently:

```bash
yarn install
yarn dev
```

This will start a Vite dev server at `http://localhost:5173`.  In production, build the app and serve the files from an S3/CloudFront origin mapped in the shell’s import map.