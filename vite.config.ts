import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config
/// <reference types="vitest/config" />/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/testSetup.ts'],
  },
});
