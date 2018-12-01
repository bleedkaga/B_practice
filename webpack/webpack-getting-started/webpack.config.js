const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    //module
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader:  'file-loader'
            }
        ]
    },


    //插件··
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
}