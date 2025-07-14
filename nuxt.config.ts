// https://nuxt.com/docs/api/configuration/nuxt-config
//import typescript from '@rollup/plugin-typescript';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: {
    global: true,
    dirs: ['~/components'],
  },
  devtools: { enabled: true },
  //ssr: true,
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    "@prisma/nuxt"
  ],
  experimental: {
    componentIslands: true,
  },

  // Nitro configuration
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    },
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            //emitDecoratorMetadata: true,
            experimentalDecorators: true,
          },
        },
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          strictPropertyInitialization: false,
        },
      },
    },
  },
  // GitHub Pages configuration
  app: {
    baseURL: '/portfolio2024/',
    buildAssetsDir: 'assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Portfolio 2025',
      meta: [
        { name: 'description', content: 'Portfolio Web Full stack Developer' }
      ]
    }
  },
  // CSS framework
  css: [
    '~/assets/css/main.css'
  ],
  // Google Fonts configuration
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  }
})
