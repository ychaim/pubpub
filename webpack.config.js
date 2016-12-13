const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: '#source-map',
	// devtool: 'cheap-module-eval-source-map', // Faster builds with less accurate source maps
	entry: [
		'webpack-hot-middleware/client',
		'./app/index.js',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js?/,
				loader: 'babel-loader',
				include: [
					path.resolve('app')
				],
				query: {
					plugins: [
						['react-transform', {
							transforms: [{
								transform: 'react-transform-hmr',
								// If you use React Native, pass 'react-native' instead:
								imports: ['react'],
								// This is important for Webpack HMR:
								locals: ['module']
							}]
						}],
						['transform-object-assign']
					]
				}
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader!sass-loader' },
			{ test: /\.svg$/, loader: 'file-loader' },
			{ test: /\.svg$/, loader: 'file-loader' },
			{ test: /\.png$/, loader: 'file-loader' },
			{ test: /\.jpg$/, loader: 'file-loader' },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.html$/, loader: 'html' }
		]
	},
	resolve: {
		modules: [path.resolve('app'), 'node_modules'],
		extensions: ['.json', '.js', '.jsx'],
	}
};