

import nodeExternals  from  'webpack-node-externals' ;
import webpack from 'webpack'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);

let library = 'restaf';

const umdConfigSpecs = ( env ) => {
    let APP_PATH = path.resolve( __dirname, 'src' );
    let plugins = [];
    let outputFile;

        console.log( ` production build: ${env.p} ` );
        console.log( ` target          : ${env.target}` );
        let libraryu = (env.target === 'node') ? library : library + '.umd' ;
        outputFile = ( env.p === 'y' ) ? libraryu + '.min.js' : libraryu + '.js';

        if ( env.p === 'y' ) {
            plugins.push( new webpack.DefinePlugin( {
                'process.env.NODE_ENV': '"production"',
                'global'              : {}
            } ) );
        }

        if (env.target === 'node') {
            plugins.push(
                new webpack.DefinePlugin({
                    __IS_NODE__: 'true',
                })
            );
        } else {
            plugins.push(
                new webpack.DefinePlugin({
                    __IS_NODE__: 'false',
                })
            );
        }
        
        let config = {
            target: ( env.target === 'node' ) ? 'node' : 'web',
            context     : APP_PATH,
            mode        : ( env.p === 'y' ) ? 'production' : 'development',
            optimization: {
                usedExports: true
            },
            entry: [
                APP_PATH + '/index'
            ],

            output: {
                path          :  (env.target === 'node') ? path.join( __dirname, 'lib' ) : path.join( __dirname, 'dist' ),
                library       : library,
                libraryTarget : 'umd',
                filename      : outputFile,
                umdNamedDefine: true,
                chunkFormat: false,
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

        if ( env.target  === 'node' ) {
            config.externals = [ nodeExternals() ];
            //config.target    =  'node';
        }
        return config;
    }

const createConfigs = (env) => {
    const umdConfig = umdConfigSpecs(env);

    return [umdConfig];
};

export default createConfigs;