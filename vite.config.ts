import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from "rollup-plugin-visualizer";
import importToCDN from 'vite-plugin-cdn-import'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import legacyPlugin from '@vitejs/plugin-legacy'

export default defineConfig(({ mode }) =>{
  return {
    plugins: [
      vue(),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "visualizer.html",
        template :"sunburst",
        open:false
      }),
      legacyPlugin({
        targets:['chrome 52'],  // 需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills:['regenerator-runtime/runtime'] // 面向IE11时需要此插件
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build:{
      assetsDir: '',
      assetsInlineLimit: 8 * 1024,
      rollupOptions:{
        manualChunks(id){
          if(id.includes('node_modules')){
            return "vendor"
          }
        }
      }
    },
    server: {
      open: true,
      port: 3005,
      host: '0.0.0.0'
    },
    base:"./"
  }
})