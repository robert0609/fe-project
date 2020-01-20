var path = require('path');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var DeclarationBundlerPlugin = require('declaration-bundler-webpack4-plugin');

function __path_src() {
	return path.resolve(__dirname, '../src');
}

function __path_modules(dir) {
  return path.join(__dirname, '..', dir)
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
	devtool: false,
  entry: {
    index: path.resolve(__dirname, '../src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue_runtime.min.js',
    publicPath: 'http://localhost:8090/runtime/',
		libraryTarget: 'system',
    jsonpFunction: 'webpackJsonp_vue_runtime'
  },
  module: {
    rules: [
			{
				resource: {
					test: /\.css$/,
					include: [
            __path_src(),
            __path_modules('node_modules/element-ui')
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
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'vue_runtime.min.css'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new DeclarationBundlerPlugin({
      out: '../dist/vue_runtime.d.ts'
    })
  ]
};

module.exports = merge(baseConfig, config);
