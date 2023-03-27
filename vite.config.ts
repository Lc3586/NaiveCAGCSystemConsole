import { defineConfig } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createHtmlPlugin } from 'vite-plugin-html';
import Inspect from 'vite-plugin-inspect';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 解决不能通过ip访问
    proxy: {
      '/api': 'http://top.lctr.com',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自定义的主题色
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vueSetupExtend(),
    createHtmlPlugin({
      inject: {
        data: {
          title: '代码自动生成控制台',
        },
      },
      minify: true,
    }),
    Icons({
      autoInstall: true,
    }),
    svgLoader({
      defaultImport: 'raw', // or 'url'
    }),
    Inspect(),
    VueI18nPlugin({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // you need to set i18n resource including paths !
      include: [resolve(__dirname, './src/i18n/**')],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: ['vue', 'vue-router', 'vuex', 'vue-i18n'],
      dts: resolve('src/auto-imports.d.ts'),
    }),
    Components({
      extensions: ['vue', 'tsx'],
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
      dts: resolve('src/components.d.ts'),
    }),
    vue(),
    vueJsx(),
    eslintPlugin({
      fix: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
});
