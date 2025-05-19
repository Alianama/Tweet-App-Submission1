import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  test: {
    environment: 'jsdom', // ⬅️ ini penting agar bisa akses `document`
    globals: true, // ⬅️ opsional tapi disarankan
    setupFiles: './src/setupTests.js', // ⬅️ kalau pakai jest-dom
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
