module.exports = {
	pwa: {
		themeColor: '#fffff8',
		manifestOptions: {
			name: 'Memory @ absolutholz.de',
			short_name: 'Memory',
			description: 'A simple card memory game',
			display: 'fullscreen',
			background_color: '#fffff8',
			icons: [
				{
				  src: './favicon-32x32.png',
				  sizes: '32x32',
				  type: 'image/png',
				},
				{
				  src: './favicon-16x16.png',
				  sizes: '16x16',
				  type: 'image/png',
				},
				{
				  src: './apple-touch-icon-152x152.png',
				  sizes: '152x152',
				  type: 'image/png',
				},
				{
				  src: './safari-pinned-tab.svg',
				  sizes: '942x942',
				  type: 'image/svg+xml',
				},
				{
				  src: './mstile-144x144.png',
				  sizes: '144x144',
				  type: 'image/png',
				},
			],
		},
		iconPaths: {
			favicon32: 'favicon-32x32.png',
			favicon16: 'favicon-16x16.png',
			appleTouchIcon: 'apple-touch-icon-152x152.png',
			maskIcon: 'safari-pinned-tab.svg',
			msTileImage: 'mstile-144x144.png',
		},
	},
};
