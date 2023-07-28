import axios from 'axios';

module.exports = {
  target: 'static',
  /*
  ** Headers of the page
  */
  router: {
    base: '/',
    linkExactActiveClass: 'active',
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
  sitemap: {
    // Add your sitemap options here
    path: '/sitemap.xml',
    hostname: 'https://learn.blitzbudget.com',
    gzip: true, // Enable gzip compression for the sitemap.xml file
    exclude: [],
    routes: async () => {
      const apiUrl = 'https://learn.api.blitzbudget.com/fetch-blogs'; // Replace with your API endpoint URL

      try {
        // Replace 'postData' with the data you want to send in the POST request body
        const postData = {
          "url": "" // Sitemap Directory
        };

        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': 'g5orXkIHDW21X7iYOPxva6AyWWSBq77O9QNT4fNH',
        };

        // Make the POST request using Axios to fetch sitemap URLs
        const response = await axios.post(apiUrl, postData, { headers });

        if (!response?.data?.items?.length === 0) {
          console.log("No data found");
          return [];
        }

        // Log the response
        console.log("The length of the response is: ", response.data.items.length);
        // Fetch the "sk" values and remove the "content/" prefix
        const skList = response.data.items.map(item => item.sk.replace('content/', ''));


        // Assuming the API response contains an array of URLs, extract them
        const urls = skList;

        // Return the array of URLs for the sitemap generation
        return urls;
      } catch (error) {
        console.error('Error fetching sitemap URLs:', error);
        return []; // Return an empty array in case of error
      }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/now-ui-kit.scss',
    '~/assets/sass/demo.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/globalDirectives.js', ssr: false },
    { src: '~/plugins/element-ui.js' },
    { src: '~/plugins/now-ui-kit' }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
  ],
  axios: {
    baseURL: 'https://learn.api.blitzbudget.com',
    https: true,
  },
  /**
   * Create a 404 HTML when generating static resources.
   */
  generate: {
    fallback: '404.html'
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: process.env.NODE_ENV === 'production',
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
