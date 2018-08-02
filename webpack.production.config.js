var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

var definePlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
})

module.exports = {
	mode: 'production',
	entry: {
		app: [
			'babel-polyfill',
			path.resolve(__dirname, 'src/main.js')
		],
		vendor: ['phaser', 'webfontloader']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: './',
		filename: 'js/[name].bundle.js'
	},
	optimization: {
		minimize: true
	},
	plugins: [
		definePlugin,
		new CleanWebpackPlugin(['build']),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new HtmlWebpackPlugin({
			filename: 'index.html', // path.resolve(__dirname, 'build', 'index.html'),
			template: './src/index.html',
			chunks: ['vendor', 'app'],
			chunksSortMode: 'manual',
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				html5: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true,
				removeComments: true,
				removeEmptyAttributes: true
			},
			hash: true
		}),
		new CopyWebpackPlugin([
			{ from: 'assets', to: 'assets' }
		])
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
