import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import zip from 'vite-plugin-zip-pack'
import manifest from './manifest.config'
import { name, version } from './package.json'

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
    zip({
      inDir: '.build',
      outDir: '.dist',
      outFileName: `${name}-v${version}.zip`,
    }),
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
