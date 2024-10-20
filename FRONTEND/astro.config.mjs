import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  integrations: [tailwind(), vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('uc-'),
      },
    },
  })]
});