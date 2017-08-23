// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    port: 9000,
    index: path.resolve(__dirname, '../server/public/index.html'),
    assetsRoot: path.resolve(__dirname, '../server/public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: 'http://SSnewbie.coding.me/Test',
  },
  dev: {
    env: require('./dev.env'),
    port: 8082,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
  }
}
