// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');
var libName = 'vx';
var outputFile = libName + '.min';

var env = process.env.NODE_ENV;
var autoprefixer = require('autoprefixer');
var UglifyJs = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function init() {
    let config = {};

    config.entry = {
        'dist': './src/index.js'
    };

    config.output = {
        path: root('dist/'),
        filename: outputFile + '.js',
        library: 'Vx',
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
                exclude: path.resolve(__dirname, 'node_modules')
            },
            // copy those assets to output
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'base64-inline-loader?limit=500000&name=[name].[ext]'
                // loader: ExtractTextPlugin.extract('base64-inline-loader', 'style-loader', 'css-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                options: {
                    presets: ['es2015']
                }
            }
        ]
    };

    config.watch = true;
    config.plugins = [
        new ExtractTextPlugin({ filename: outputFile + '.css' }),
        new HtmlWebpackPlugin()
    ];

    config.devServer = {
        proxy: {
            '/app': 'http://127.0.0.1:5000',
            secure: false
        }
    };

    return config;
};

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}