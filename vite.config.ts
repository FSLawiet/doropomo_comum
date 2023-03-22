/// <reference types="histoire" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  plugins: [vue(), quasar()],

  histoire: {
    setupFile: 'src/histoire.setup.ts',
  },
});
