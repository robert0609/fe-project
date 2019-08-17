var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var babel = require("rollup-plugin-babel");
var { uglify } = require("rollup-plugin-uglify");
var externalDependencies = Object.keys(require('./package.json').dependencies);

var config = {
  input: 'src/index.js',
  output: {
    file: 'dist/${XXXX}.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ],
  external: function (moduleName) {
    return externalDependencies.some(item => moduleName.startsWith(item));
  }
};
if (process.env.NODE_ENV === 'production') {
  config.output.file = 'dist/${XXXX}.min.js';
  config.output.sourcemap = false;
  config.plugins.push(uglify());
}

module.exports = config;
