const path = require('path')
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
		compress: true,
		disableHostCheck: true,
	},
  css: {
    requireModuleExtension:true
  }
}
