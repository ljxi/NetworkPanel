import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from "rollup-plugin-visualizer";
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      prodUrl: 'https://cdn.staticfile.org/{name}/{version}/{path}',
      modules: [
        {
          name: "echarts",
          var: "echarts",
          path: "echarts.min.js",
        },
        {
          name: 'vue',
          var: 'Vue',
          path: `vue.runtime.global.prod.min.js`,
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: `index.full.min.js`,
          css: 'index.min.css'
        },
      ],
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "visualizer.html",
      template :"sunburst",
      open:false
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build:{
  //   rollupOptions:{
  //     manualChunks(id){
  //       if(id.includes('node_modules')){
  //         return "vendor"
  //       }
  //     }
  //   }
  // },
  server: {
    open: true,
    port: 3005,
    host: '0.0.0.0'
  },
  base: './'
})
