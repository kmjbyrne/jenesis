const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function init() {
    let config = {};
    config.entry = {
        app: ['./src/index.ts', './src/main.scss'],
        vendor: './src/vendor.js',
    };

    config.output = {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].bundle.js', // '[name].[hash].bundle.js',
        // publicPath: '/static/build'
    };

    config.resolve = {
        extensions: ['.ts', '.js', '.css', '.scss', '.html', '.json']
    };

    config.devtool = 'inline-source-map';

    config.devServer = {
        inline: true,
        port: 8080,
        contentBase: './dist'
    };

    config.plugins = [
        new CleanWebpackPlugin(),
    ];
    config.module = {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'base64-inline-loader?limit=500000&name=[name].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    };
    return config
};
// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}