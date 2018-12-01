module.exports = {
	output: {
		path: path.join(__dirname, '/../dist/assets'),
		filename: '[name].bundle.js',
		publicPath: publicPath,
		sourceMapFilename: '[name].map'
	},

	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),

		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				scrw_ie8: true,
				keep_fnames: true
			},
			compress: {
				scrw_ie8: true
			},
			comments: false
		})
	]
}