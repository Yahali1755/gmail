import { defineConfig } from 'vite';
import 'dotenv/config';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  outDir: 'dist',
  plugins: [react(), reactRefresh(), commonjs({
    include: [/@mail\/common/, /node_modules/],
  })],
  envDir: resolve(__dirname, ".env"),
  envPrefix: "ENV_",
  server: {
    sourcemap: true,
    port: 5000,
    proxy: {
      '/api': process.env.ENV_SERVER_URL,
      '/auth': process.env.ENV_SERVER_URL
    }
  },
  optimizeDeps: {
    include: ['@mail/common'],
  },
  build: {
    sourcemap: true
  }
});