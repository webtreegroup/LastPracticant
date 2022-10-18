const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { IS_DEV } = require('./env');
const babelLoader = require('./webpack.babel.loader');

module.exports = {
    mode: IS_DEV ? 'development' : 'production',
    target: 'node',
    externals: [nodeExternals()],
    entry: './server/start.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            babelLoader,
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                    {
                        loader: 'null-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|mp3)$/i,
                use: [
                    {
                        loader: 'null-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
    ],
};
