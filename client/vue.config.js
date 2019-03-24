const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// Project deployment basis
// By default, we assume that your app will be deployed in the root of the domain.
// For example: https://www.my-app.com/
// default: '/'
// If your application is deployed in a subpath, you need to specify a subpath here
// For example: https://www.foobar.com/my-app/
// need to change it to '/my-app/'
// iview-admin online demo package path: https://file.iviewui.com/admin-dist/

const BASE_URL = process.env.NODE_ENV === 'production' ?
  '/' :
  '/'

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // If you don't need to use eslint, set lintOnSave to false

  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,Value is defined by itself, such as .set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))

    // set to false does not generate a .map file when packaged
    productionSourceMap: false
    // Write the base path of the interface you are calling to solve the cross-domain. If the proxy is set, then the baseUrl of your local development environment axios should be written as '', ie an empty string.
    // devServer: {
    //   proxy: 'localhost:3000'
    // }
  },

  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "themify-icons-scss/scss/themify-icons.scss";`
      },
      // pass Less.js Options to less-loader
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: ''
        }
      }
    }
  }
}
