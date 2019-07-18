/* eslint-disable no-undef */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function init() {
    let config = {};
    config.entry = {
        app: ['./src/index.js', './src/main.scss'],
        vendor: ['./src/vendor.js', './src/vendor.scss']
    };
    config.output = {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    };
    config.resolve = {
        extensions: ['.js', '.css', '.scss', '.html', '.json']
    };
    config.devtool = 'inline-source-map';
    config.devServer = {
        inline: true,
        contentBase: './dist'
    };
    config.watch = true;
    config.plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/', 'index.html'),
            filename: './index.html',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            // chunkFilename: "[id].css"
        })
    ];
    config.module = {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            options: {
                presets: ['@babel/preset-env']
            }
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: true,
                    reloadAll: true,
                },
            },
            'css-loader', 'postcss-loader', {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
            ],
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url-loader'
        }
        ]
    };
    return config;
};

// Helper functions
// eslint-disable-next-line no-unused-vars
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
