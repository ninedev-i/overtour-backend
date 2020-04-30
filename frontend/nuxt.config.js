// require('dotenv').config();

export default {
   server: {
      port: 8000, // default: 3000
   },
   mode: 'universal',
   /*
   ** Headers of the page
   */
   head: {
      title: process.env.npm_package_name || '',
      meta: [
         {charset: 'utf-8'},
         {name: 'viewport', content: 'width=device-width, initial-scale=1'},
         {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
      ],
      link: [
         {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
   },
   /*
   ** Customize the progress-bar color
   */
   loading: {color: '#fff'},
   /*
   ** Global CSS
   */
   css: [
      'element-ui/lib/theme-chalk/index.css'
   ],
   /*
   ** Plugins to load before mounting the App
   */
   plugins: [
      '@/plugins/element-ui',
      '@/plugins/axios'
   ],
   /*
   ** Nuxt.js dev-modules
   */
   buildModules: [
      '@nuxt/typescript-build',
      '@nuxtjs/dotenv',
   ],
   dotenv: {
      // path: './'
   },
   /*
   ** Nuxt.js modules
   */
   modules: [
      '@nuxtjs/axios',
   ],
   axios: {
      // baseURL: `${process.env.APP_URL}/api`,
      // baseURL: process.env.SERVICE_URL,
      baseURL: 'http://localhost:3333/api',
      proxy: false,
      proxyHeaders: false,
      credentials: false
   },
   /*
   ** Build configuration
   */
   build: {
      transpile: [/^element-ui/],
      /*
      ** You can extend webpack config here
      */
      extend(config, ctx) {
      }
   }
}
