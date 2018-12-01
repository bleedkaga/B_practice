const path = require("path");
var publicPath = '/'
var manifestPlugin = require('webpack-manifest-plugin');


module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './index.js',
	output: {
		path: path.join(__dirname, '/../dist/assets'),
		filename: '[name].[chunkhash:5].bundle.js',
		publicPath: publicPath,
		sourceMapFilename: '[name].map'
	},

	devServer: {
		port: 7777,
		host: 'localhost',
		historyApiFallback: true,
		noInfo: false,
		stats: 'mininal',
		publicPath: publicPath
	},

	plugins: [
		new manifestPlugin()
	]
}