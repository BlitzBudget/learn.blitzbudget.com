module.exports = {
  target: 'static',
  router: {
    base: '/',
    linkExactActiveClass: 'active'
  },
  head: {
    titleTemplate: '%s - BlitzBudget',
    meta: [
      { charset: 'text/html; charset=utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: "author", content: "Nagarjun Nagesh" },
      { name: "robots", content: "index,follow" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700,200|Open+Sans+Condensed:700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css', crossorigin: 'anonymous' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  styleResources: {
    scss: [
      '~/assets/sass/now-ui-kit/variables.scss',
      // Other Sass files you want to import globally
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/now-ui-kit.scss',
    '~/assets/sass/demo.scss'
  ],
  modules: [
    '@element-plus/nuxt',
    'nuxt-lazy-load'
  ],
  buildModules: [
    '@nuxtjs/pwa',
  ],
  pwa: {
    manifest: {
      name: 'Learn BlitzBudget',
      short_name: 'BB',
      description: 'Learn BlitzBudget Blog for learning interesting concepts',
      lang: 'en',
      display: 'standalone',
    },
    icon: {
      fileName: '/favicon.ico',
    },
    meta: {
      theme_color: '#ffffff',
    },
  },
  lazyLoad: {
    // These are the default values
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false, 
    // Default image must be in the public folder
    defaultImage: '/img/bg14.jpg',
  },  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/globalDirectives.js', ssr: false }
  ],
  /**
   * Create a 404 HTML when generating static resources.
   */
  generate: {
    fallback: '404.html'
  },
  elementPlus: { /** Options */ },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel Loader to JavaScript files
        exclude: /node_modules/, // Exclude node_modules from transformation
        use: {
          loader: 'babel-loader',
          options: {
            // Babel configuration options
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
