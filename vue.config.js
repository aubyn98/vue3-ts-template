const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~styles/variables.scss"
        `,
      },
      scss: {
        prependData: `
        @import "~styles/variables.scss";
        `,
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('comp', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('router', resolve('./src/router'))
      .set('store', resolve('./src/store'))
      .set('styles', resolve('./src/common/styles'))
      .set('utils', resolve('./src/common/utils'))
      .set('apis', resolve('./src/common/apis'))
      .set('plugins', resolve('./src/common/plugins'))
      .set('mixins', resolve('./src/common/mixins'))
      .set('config', resolve('./src/common/config'))
    config.module.rule('svg').exclude.add(resolve('./src/common/styles/svg'))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/common/styles/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icons-[name]',
      })
  },
}
