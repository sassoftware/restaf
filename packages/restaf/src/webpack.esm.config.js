import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);

let library = 'restaf';

const esmConfig = (env) => {
    let APP_PATH = path.resolve(__dirname, 'src');
    let plugins = [];
    let outputFile = (env.p === 'y') ? library + '.esm.min.js' : library + '.esm.js';

    if (env.p === 'y') {
        plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'global': {}
            })
        );
    }

    plugins.push(
        new webpack.DefinePlugin({
            __IS_NODE__: 'false',
        })
    );

    return {
        target: 'web',
        context: APP_PATH,
        mode: (env.p === 'y') ? 'production' : 'development',
        optimization: {
            usedExports: true
        },
        entry: [
            APP_PATH + '/index'
        ],
        output: {
            path: path.join(__dirname, 'esm'),
            filename: outputFile,
            library: {
                type: 'module',
            },
            chunkFormat: false,
        },
        experiments: {
            outputModule: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [{ loader: "babel-loader" }],
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
};

export default esmConfig;