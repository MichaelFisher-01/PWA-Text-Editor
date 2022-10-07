const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
	return {
		mode: 'development',
		entry: {
			main: './src/js/index.js',
			install: './src/js/install.js',
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			// Bundles our index.html file.
			new HtmlWebpackPlugin({
				template: './index.html',
				title: 'JATE',
			}),
			new WebpackPwaManifest({
				filename: 'manifest.json',
				name: 'Just Another Text Editor ',
				short_name: 'J.A.T.E',
				description: 'A PWA for saving code snippets.',
				start_url: './',
				publicPath: './',
				background_color: '#ffffff',
				theme_color: '#ffffff',
				fingerprints: false,
				inject: true,
				includeDirectory: true,
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 384, 512],
						destination: path.join('assests', 'icons'),
					},
				],
			}),
		],

		module: {
			rules: [
				//CSS loader so the CSS file takes effect
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					// babel-loader to enable ES6
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/transform-runtime',
							],
						},
					},
				},
			],
		},
	};
};
