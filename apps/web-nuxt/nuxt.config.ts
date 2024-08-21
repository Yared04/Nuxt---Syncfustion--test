// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'
import federation from '@originjs/vite-plugin-federation'

// import { resolve } from 'node:path'

export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/_nuxt/', handler(req, res, next) {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
      res.setHeader('Access-Control-Allow-Credentials', true)

      // Pass to next middleware
      next()
    } },
  ],
  vite: {
    build: {
      target: ['esnext', 'es2022'],
    },
    esbuild: {
      target: 'es2022',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },
    plugins: [
      federation({
        name: 'mainApp',
        filename: 'remoteEntry.js',
        exposes: {
          './templateData': './src/components/template/TemplateDataView.vue',
        },
        shared: [],
      }),
    ],
    // plugins: [
    //   federation({
    //     name: 'mainApp',
    //     filename: 'remoteEntry.js',
    //     exposes: {
    //       './templateData': './src/components/Template/TemplateDataView.vue', // Path to the component you want to expose
    //     },
    //     shared: ['vue'],
    //   }),
    // ],

  },
  srcDir: './src',
  modules: [
    'nuxt-primevue',
    'nuxt-gtag',
    '@nuxtjs/i18n',
  ],
  head: {
    script: [
      {
        hid: 'outseta-options',
        innerHTML: `
          var o_options = {
            domain: 'docspawn.outseta.com'
          };
        `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        'src': 'https://cdn.outseta.com/outseta.min.js',
        'data-options': 'o_options',
        'type': 'text/javascript',
        'charset': 'utf-8',
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'outseta-options': ['innerHTML'],
    },
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' },
    ],
    lazy: true,
    langDir: '../lang/', // Simplified path
    defaultLocale: 'en',
    vueI18n: '../i18n.config.js',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },

  primevue: {
    options: {
      unstyled: false,
    },
    importPT: {
      // from: path.resolve(__dirname, './src/presets/lara/'),
      from: '../src/presets/lara/',
      as: 'TailwindLara',
    },
    components: {
      include: '*',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/fontawesome.js',
  ],
  app: {
    head: {
      script: [
        {
          hid: 'outseta-options',
          innerHTML: `
            var o_options = {
              domain: 'docspawn.outseta.com'
            };
          `,
          type: 'text/javascript',
          charset: 'utf-8',
        },
        {
          'src': 'https://cdn.outseta.com/outseta.min.js',
          'data-options': 'o_options',
          'type': 'text/javascript',
          'charset': 'utf-8',
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'outseta-options': ['innerHTML'],
      },
    },
    layoutTransition: {
      name: 'slide-right',
      mode: 'out-in',
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/main.scss',
  ],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_API_BASE_URL,
      ADMIN_PASSWORD: process.env.NUXT_APP_ADMIN_PASSWORD,
      OUTSETA_API_KEY: process.env.OUTSETA_API_KEY,

    },
  },

})
