'use strict' ;

let nodeExternals  = require('webpack-node-externals');
let webpack = require('webpack');
let  path    = require('path');
let library = '@restaf/commons';
let argv    = require('yargs').argv;
let prod    = (argv.p === true) ;
let env     =  argv.env;
let asNode  = false;

if (env != null) {
    asNode = (env.node === true);
}

let APP_PATH = path.resolve(__dirname, 'src');
let plugins = [];
let outputFile;

    console.log(` ProductionMode: ${prod} `);
    console.log(` nodejs module : ${asNode}`);

    outputFile = (argv.p === true) ? library + '.min.js' : library + '.js';

    if (asNode === false) {
        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'global'              : {}
        }));
    }

    
    let config = {
        context: APP_PATH,
        mode   : (prod === true) ? 'production' : 'development',
        entry  : [
            APP_PATH + '/index'
         ],

        output: {
            path          : (asNode === true) ? path.join(__dirname, 'lib') : path.join(__dirname, 'dist'),
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
                    use    : [ { loader: "babel-loader" } ],
                    include: APP_PATH,
                    exclude: /node_modules/
                }
            ]
        },

        plugins: plugins,

        resolve: {
            extensions: [ '.js' ]
        }
    };

    if (asNode === true) {
       // config.externals = [ nodeExternals() ];
        config.target    =  'node';
    }

module.exports = config;

