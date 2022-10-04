import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/lib/main.ts',
      formats: ['es'],
    },
  },
  plugins: [
    svelte(),
  ],
})

