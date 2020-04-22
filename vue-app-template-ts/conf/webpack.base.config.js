var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_test() {
  return path.resolve(__dirname, '../test/unit');
}

function __path_modules(dir) {
  return path.join(__dirname, '..', dir)
}

function __module_js_includes() {
	if (process.env.NODE_ENV === 'production') {
    return [
      __path_src(),
      __path_test(),
      __path_modules('node_modules/vue-router'),
      __path_modules('node_modules/vuex')
    ];
  } else {
    return [
      __path_src(),
      __path_test(),
      __path_modules('node_modules/vue-router'),
      __path_modules('node_modules/vuex')
    ];
  }
}

module.exports = {
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
		alias: {
			'@': __path_src()
		}
	},
	module: {
		rules: [
      {
        parser: {
          system: false
        }
      },
			{
				enforce: 'pre',
				test: /\.(ts|js|html|vue)$/,
				include: [
					__path_src()
				],
				use: [
					{
						loader: 'eslint-loader',
						options: {
              formatter: require('eslint-friendly-formatter'),
              fix: true,
              extensions: ['.ts', '.js', '.html', '.vue'],
              failOnError: true
						}
					}
				]
			},
			{
				test: /\.vue$/,
				include: [
					__path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'vue-loader',
						options: {
							transformAssetUrls: {
								'~': __path_src()
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				include: __module_js_includes(),
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.ts$/,
				include: __module_js_includes(),
				use: [
					{
						loader: 'babel-loader'
					},
					{
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              configFile: __path_modules(process.env.BABEL_ENV === 'test' ? 'test/tsconfig.json' : 'tsconfig.json'),
              allowTsInNodeModules: true
            }
					}
				]
			},
			{
				test: /\.html$/,
				include: [
					__path_src(),
          __path_test()
				],
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				resource: {
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					include: [
						__path_src(),
            __path_test()
					]
				},
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'static/img/[name].[hash:7].[ext]'
						}
					}
				]
			},
      {
				resource: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					include: [
						__path_src(),
            __path_test()
					]
				},
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'static/fonts/[name].[hash:7].[ext]'
						}
					}
				]
      }
		]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
