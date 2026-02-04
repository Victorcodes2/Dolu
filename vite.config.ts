import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/DoluLogistics/', // ✅ Important for GitHub Pages deployment
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
