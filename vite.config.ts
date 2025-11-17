import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import manifest from './manifest.config'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '.build',
  },
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
    dedupe: ['@emotion/react'],
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
})
