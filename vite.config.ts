import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import manifest from './public/manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: '.build',
  },
  plugins: [
    react(),
    crx({ manifest }),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
    dedupe: ['@emotion/react']
  },
  server: {
    hmr: {
      port: 5173,
    },
    port: 5173,
    strictPort: true,
  },
})
