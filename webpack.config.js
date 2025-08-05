'use strict';

const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');
const path = require('path');
const library = 'restafedit';
const indexName = 'index';

module.exports = (env) => {
  const APP_PATH = path.resolve(__dirname, 'src');
  const plugins = [];
  const outputFile = env.p === 'y' ? indexName + '.min.js' : indexName + '.js';

  console.log(` production build: ${env.p} `);
  console.log(` target          : ${env.target}`);
  
  if (env.p === 'y') {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        global: {}
      })
    );
  }
    
  if (env.p === 'a') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  const config = {
    context: APP_PATH,
    mode   : env.p === 'y' ? 'production' : 'development',

    optimization: {
      usedExports: true
    },
    entry: [APP_PATH + '/index'],

    output: {
      path:
        env.target === 'node'
          ? path.join(__dirname, 'lib')
          : path.join(__dirname, 'dist'),

      library,

      libraryTarget : 'umd',
      filename      : outputFile,
      umdNamedDefine: true
      },
      /*
    node: {
      fs: 'empty'
    },
    */

    module: {
      rules: [
    {
          test   : /\.(js|jsx)$/,
          use    : [{ loader: 'babel-loader' }],
          include: APP_PATH,
          exclude: /node_modules/
        }
      ]
  },

    plugins,

    resolve: {
      extensions: ['.js'],
      
    }
};

  if (env.target === 'node') {
    config.externals = [nodeExternals()];
    config.target = 'node';
  }
  return config;
};
