module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    css: {
		loaderOptions: {
			sass: {
				prependData: 
					`@import "@/styles/_variables.scss";`
			}
		}
	},
	chainWebpack: config => {
		config
		.plugin('html')
		.tap(args => {
			args[0].title = 'Chat'
			return args
		})
	}
};
