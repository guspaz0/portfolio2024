// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: {
    global: true,
    dirs: ['~/components'],
  },
  devtools: { enabled: false },
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
    'nuxt-auth-utils',
    '@nuxt/icon',
    'nuxt-toast',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    preference: 'system', // default theme: 'light', 'dark' or 'system'
    fallback: 'dark',     // dark-first design
    classSuffix: '',      // no suffix, so classes are 'dark' or 'light'
    storageKey: 'nuxt-color-mode' // localStorage key
  },
  icon: {
    serverBundle: {
      collections: ['line-md', 'logos']
    }
  },
  runtimeConfig:{
    session: {
      password: '',
      name: 'portfolio-session',
      cookie: {
        maxAge: 60 * 24 * 7, // 7 days
      }
    }
  },
  experimental: {
    componentIslands: true,
  },
  prisma: {
    autoSetupPrisma: true,
    writeToSchema: false,
    formatSchema: true,
    prismaSchemaPath: path.join(process.cwd(),'prisma', 'schema.prisma')
  },
  // Nitro configuration
  nitro: {
    prerender: {
      routes: []
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
  // GitHub Pages configuration — the site lives under /portfolio
  app: {
    baseURL: '/portfolio',
    buildAssetsDir: '_nuxt',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Portfolio',
      meta: [
        { name: 'description', content: 'Portfolio Web Full stack Developer' }
      ],
      script: [
        {
          src: 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js',
          type: 'module',
          defer: true,
        }
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
      Inter: [400, 500, 600, 700],
      'Space Grotesk': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500]
    }
  }
})