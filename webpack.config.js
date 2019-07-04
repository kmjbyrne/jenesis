/* eslint-disable no-undef */
const path = require('path');
// const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function init() {
    let config = {};

    config.entry = {
        'app': './src/index.js'
    };

    config.output = {
        path: root('dist/'),
        filename: '[name].[hash].js',
        library: 'Snap UI',
        libraryTarget: 'umd',
        umdNamedDefine: true
    };

    config.devtool = 'source-map';
    config.resolve = {
        extensions: ['.js', '.css', '.scss', '.html', '.json']
    };

    config.module = {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'base64-inline-loader?limit=500000&name=[name].[ext]'
            // loader: ExtractTextPlugin.extract('base64-inline-loader', 'style-loader', 'css-loader')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:
                    {
                        hmr: true,
                        reloadAll: true,
                    },
                    },
                    'css-loader', 'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options:
                    {
                        sourceMap: true
                    }
                    }
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                options:
            {
                presets: ['@babel/preset-env']
            }
            }]
    };

    config.watch = true;
    config.plugins = [
        new MiniCssExtractPlugin(
            {
                filename: '[name].[hash].bundle.css',
                chunkFilename: '[id].css'
            }),
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, 'src/template', 'index.html'),
                filename: './index.html',
                hash: true
            }),
    ];

    config.devServer = {
        inline: true,
        contentBase: './dist'
    };

    return config;
};

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
