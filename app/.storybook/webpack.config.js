const path = require('path');

module.exports = ({ config }) => {
	config.resolve.modules = [
		...(config.resolve.modules || []),
		path.resolve('./src'),
	];

	config.module.rules.push({
		test: /\.(scss)$/,
		include: path.resolve(__dirname, './../'),
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					importLoaders: 1,
				},
			},
			// {
			// 	loader: 'postcss-loader',
			// 	options: {
			// 		sourceMap: true,
			// 		ident: 'postcss',
			// 		plugins: () => [ autoprefixer ],
			// 	},
			// },
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
					implementation: require('node-sass'),
				},
			},
		],
	});

	return config;
};
