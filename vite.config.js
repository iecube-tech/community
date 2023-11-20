import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ElementPlus自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          // directives: true,
          // version: "2.1.5",
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      '@kangc/v-md-editor/lib/theme/vuepress.js',
      'ckeditor5-custom-build/build/ckeditor',
    ],
  },
  build: {
    commonjsOptions: {
      include: [
        "ckeditor5-custom-build/build/ckeditor",
      ],
    },
  },
  server: {
    // host: '0.0.0.0',
    // port: 8991,
    // 是否开启 https
    https: false,
    // 设置反向代理，跨域
    proxy: {
      '/dev-api': {
        // 后台地址
        // target: 'http://192.168.1.23:8088/',
        target: 'http://43.139.68.165:8088',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, '')
      },
      '/local-resource': {
        // target: 'http://192.168.1.23:8088/files/',
        target: 'http://43.139.68.165:8088/files/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/local-resource/, '')
      }
    }
  },

})
