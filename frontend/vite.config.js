import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      port: 5173,         // dev port
      strictPort: true,   // fail if port is taken
      proxy: {
        "/api": "http://localhost:3000"
      }
    },
    build: {
      outDir: '../backend/public', // build goes to backend/public
      sourcemap: !isProduction,
    },
    base: isProduction ? '/' : '/', // base path for production
  };
});
