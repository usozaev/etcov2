import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // vendor-библиотеки — отдельными чанками, страницы грузятся лениво
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          gsap: ['gsap', '@gsap/react', 'lenis'],
        },
      },
    },
  },
});
