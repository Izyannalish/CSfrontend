import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // Make sure the plugin is installed

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
});
