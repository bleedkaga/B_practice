// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
// 	entry : './index.js',

// 	plugins: [
// 		new webpack.HotModuleReplacementPlugin(),   //启用HMR
// 		new webpack.optimize.UglifyJsPlugin({				//根据选项是否进行压缩。因此，通过设置devtool options可以生成Source Maps。
// 			sourceMap: options.devtool && (options.devtool.indexOf('sourcemap') >= 0 || options.devtoll.indexOf('source-map') >= 0)
// 		})
// 	],

// 	output: {
// 		filename: 'bundle.js',
// 		path: path.resolve(__dirname, 'dist'),
// 		publicPath: '/'
// 	},

// 	devServer: {
// 		hot: true, 			//告诉dev-server 我们正在使用HMR
// 		contentBase: path.resolve(__dirname, 'dist'),
// 		publicPath: '/'
// 	}
// }

//将基本配置转换为函数， 接收env参数，并在两个配置之间切换（通过 --env 设置）
// module.exports = (env) => {
// 	return require(`./config/webpack.${env}.js`)
// }

var  path = require('path'), 
			webpack = require('webpack'),
			ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
			WebpackChunkHash = require('webpack-chunk-hash');

module.exports = {
	entry : {
		vendor : './src/vendor.js',
		main: './src/index.js'
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendor', 'manifest'],
			minChunks: Infinity
		}),
		new webpack.HashedModuleIdsPlugin(),
		new WebpackChunkHash(),
		new ChunkManifestPlugin({
			filename: "chunk-manifest.json",
			manifestVariable: "webpackManifest",
			inlineManifest: true
		})
	]
}