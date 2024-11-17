const path = require('path');

module.exports = (env) => {
  const APP_PATH = path.resolve(__dirname, 'src');
  const config = {
    context: APP_PATH,
    mode: 'production',
    optimization: {
      usedExports: true
    },
    entry: [APP_PATH + '/index'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.esm.js',
      libraryTarget: 'module' // Use commonjs2 as a fallback
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }] // Ensure Babel outputs ESM
              ]
            }
          }
        }
      ]
    }
  };

  return config;
};