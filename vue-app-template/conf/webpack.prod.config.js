var path = require('path');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __vueCssLoaders(preProcessorName) {
  let loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
  ];
  if (preProcessorName === 'scss') {
    loaders.push('sass-loader');
  } else if (preProcessorName === 'sass') {
    loaders.push({
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
      }
    });
  } else if (preProcessorName === 'less') {
    loaders.push('less-loader');
  }
  return loaders;
}

let config = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:7].js',
    chunkFilename: 'static/js/[name].[chunkhash:7].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
			{
				resource: {
					test: /\.css$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders()
			},
			{
				resource: {
					test: /\.scss$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders('scss')
			},
			{
				resource: {
					test: /\.sass$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders('sass')
			},
			{
				resource: {
					test: /\.less$/,
					include: [
						__path_src()
					]
				},
				use: __vueCssLoaders('less')
			}
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        common: {
          priority: -10,
          test: /node_modules\/(.*)\.js/,
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.(scss|sass|less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:7].css',
      chunkFilename: 'static/css/[name].[chunkhash:7].css',
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      title: '${XXXX}',
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'conf/index.html',
      favicon: path.resolve(__dirname, '../favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    })
  ]
};

module.exports = merge(baseConfig, config);
