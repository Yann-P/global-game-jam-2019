var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var definePlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
	mode: 'development',
	entry: {
		app: [
			'babel-polyfill',
			path.resolve(__dirname, 'src/main.js')
		],
		vendor: ['phaser', 'webfontloader']
	},
	devtool: 'cheap-source-map',
	output: {
		pathinfo: true,
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/',
		filename: '[name].bundle.js'
	},
	watch: true,
	plugins: [
		definePlugin,
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './src/index.html',
			chunks: ['vendor', 'app'],
			chunksSortMode: 'manual',
			minify: {
				removeAttributeQuotes: false,
				collapseWhitespace: false,
				html5: false,
				minifyCSS: false,
				minifyJS: false,
				minifyURLs: false,
				removeComments: false,
				removeEmptyAttributes: false
			},
			hash: false
		}),
		new BrowserSyncPlugin({
			host: process.env.IP || 'localhost',
			port: process.env.PORT || 3000,
			server: {
				baseDir: ['./', './build']
			}
		})
	],
	module: {
		rules: [
			{ test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') }
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}
