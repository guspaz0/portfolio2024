// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: {
    global: true,
    dirs: ['~/components'],
  },
  devtools: { enabled: true },
  ssr: true,
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js"
      },
    }
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@prisma/nuxt',
    '@pinia/nuxt',
    'nuxt-file-storage'
  ],
  experimental: {
    componentIslands: true,
  },
  prisma: {
    autoSetupPrisma: true,
    runMigration: true,
    writeToSchema: false,
    formatSchema: true,
    prismaSchemaPath: process.env.NODE_ENV == 'development'
      ? path.join(process.cwd(),'prisma', 'schema.prisma.dev')
      : path.join(process.cwd(),'prisma', 'schema.prisma')
  },
  // Nitro configuration
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    },
    hooks: {
      'rollup:before': (nitro) =>{
        nitro.options.moduleSideEffects.push('reflect-metadata')
      }
    },
    rollupConfig:{
      output: {
        banner: 'import "reflect-metadata";',
      }
    },
    esbuild: {
      options: {
        target: 'esnext',
        tsconfigRaw: JSON.stringify({
          compilerOptions: {
            experimentalDecorators: true, 
            target: 'esnext',
            emitDecoratorMetadata: true
          }
        })
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          strictPropertyInitialization: false,
          experimentalDecorators: true,
          emitDecoratorMetadata: true
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