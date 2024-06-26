import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (mode === 'prod') {
    // 放準備部署到server的設定
    return {
      base: '/cid101/g2/front/',
      build: {
        outDir: 'front'
      },
      plugins: [vue(), VueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  } else {
    // 放原本的設定
    return {
      plugins: [vue(), VueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    }
  }
})

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [
//     vue(),
//     VueDevTools(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })