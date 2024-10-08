import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@test": path.resolve(__dirname, "./test"),
    }
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  }
})
