import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Enable ESLint on save
      include: ['src/**/*.+(js|jsx|ts|tsx)'],
      // You can exclude specific folders/files if needed
      exclude: ['node_modules', 'dist', 'tmp'],
      // Enable ESLint autofix
      mode: 'poll', // Use 'poll' mode if needed for certain file systems
    },
  },
});
