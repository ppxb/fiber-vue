import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import purgeIcons from 'vite-plugin-purge-icons'
import unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    unocss(),
    vueJsx(),
    purgeIcons(),
    Components({
      dirs: ['src/components', 'src/layouts'],
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, './src/assets')
      }
    ]
  }
})
