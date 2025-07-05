// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  // Static site generation
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  
  // GitHub Pages configuration
  app: {
    baseURL: '/portfolio2024/', // Replace with your repo name
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
  
  // CSS framework (optional)
  css: [ 
    '~/assets/css/main.css' 
  ],
  
  // Modules
  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],
  
  // Google Fonts configuration
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      // Add your preferred fonts
    }
  },
})
