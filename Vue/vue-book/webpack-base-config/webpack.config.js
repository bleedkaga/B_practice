var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var config = {
	entry: {
		main: './main'
	},
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*/,
				loader: 'url-loader?limit=1024'
			},
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextWebpackPlugin.extract({
							use: 'css-loader',
							fallback: 'vue-style-loader'
						})
					}
				}
			}
		]
	},
	plugins: [
		//重命名提取后的CSS文件
		new ExtractTextWebpackPlugin('main.css')
	]
}

module.exports = config