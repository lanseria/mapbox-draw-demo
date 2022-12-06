/// <reference types="vite" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'

export default defineConfig({

  server: {
    proxy: {
      '^/gis/': {
        target: 'http://60.163.156.98:30080',
        changeOrigin: true,
        rewrite: (path) => {
          const replacePath = path.replace(/^\/gis/, '')
          return replacePath
        },
      },
      '^/interface/': {
        target: 'http://192.168.31.163:8099',
        changeOrigin: true,
        rewrite: (path) => {
          const replacePath = path.replace(/^\/interface/, '')
          return replacePath
        },
      },
    },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      resolvers: [ArcoResolver()],
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],

})
