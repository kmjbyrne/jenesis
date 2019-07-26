/* eslint-disable no-undef */
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function init() {
    let config = {};
    config.entry = {
        app: ['./src/index.ts', './src/main.scss'],
        vendor: ['./src/vendor.js', './src/vendor.scss']
    };
    config.output = {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    };
    config.resolve = {
        extensions: ['.ts', '.js', '.css', '.scss', '.html', '.json']
    };
    config.optimization = {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    };
    config.plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.scss',
            chunkFilename: '[id].scss'
        })
    ];
    config.watch = true;
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
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: path.resolve(__dirname, 'node_modules')
        },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: './postcss.config.js'
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
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
