'use strict' ;

let nodeExternals  = require('webpack-node-externals');
let webpack = require('webpack');
let  path    = require('path');
let library = 'restaf';

module.exports = (env) => {
    let APP_PATH = path.resolve(__dirname, 'src');
    let plugins = [];
    let outputFile;

        console.log(` production build: ${env.p} `);
        console.log(` target          : ${env.target}`);

        outputFile = (env.p === 'y') ? library + '.min.js' : library + '.js';

        if (env.p === 'y') {
            plugins.push(new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'global'              : {}
            }));
        }

        
        let config = {
            context: APP_PATH,
            mode   : (env.p === 'y') ? 'production' : 'development',
            optimization: {
                usedExports: true
            },
            entry  : [
                APP_PATH + '/index'
            ],

            output: {
                path          : (env.target === 'node') ? path.join(__dirname, 'lib') : path.join(__dirname, 'dist'),
                library       : library,
                libraryTarget : 'umd',
                filename      : outputFile,
                umdNamedDefine: true
            },
            node: {
                fs: 'empty'
            },

            module: {
                rules: [
                    {
                        test   : /\.(js|jsx)$/,
                        use    : [{ loader: "babel-loader" }],
                        include: APP_PATH,
                        exclude: /node_modules/
                    }
                ]
            },

            plugins: plugins,

            resolve: {
                extensions: ['.js']
            }
        };

        if (env.target  === 'node') {
            config.externals = [nodeExternals()];
            config.target    =  'node';
        }
        return config;
    }

