import { defineConfig } from 'vite';
import 'dotenv/config';
import react from '@vitejs/plugin-react';
import path from 'path'

const SERVER_URL = 'http://localhost:3000'

export default defineConfig({
  publicDir: "./src/assets",
  server: {
    sourcemap: true,
    port: 5000,
    proxy: {
      '/api': SERVER_URL,
      '/auth': SERVER_URL
    }
  },
  optimizeDeps: {
    include: ['@mail\/common'],
  },
  build: {
    outDir: "./dist",
    assetsDir: "",
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/common/, /node_modules/]
    }
  },
  resolve: {
    alias: {
      '@mail/common': path.resolve(__dirname, "../common")
    }
  },
  plugins: [react()]
});