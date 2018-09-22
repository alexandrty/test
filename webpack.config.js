const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
console.log(process.env.NODE_ENV)
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.join(__dirname, 'build')
    },
    resolve: {
        modules: ['scripts', 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.scss', '.png', '.jpg', '.jpeg', '.svg']
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebPackPlugin({ template: 'src/index.html' }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],
    devServer: {
        overlay: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', { modules: false, targets: { browsers: ['last 2 versions'] } }],
                        'react'
                    ],
                    cacheDirectory: true,
                    plugins: [
                        'transform-strict-mode',
                        'transform-object-rest-spread',
                        'transform-class-properties'
                    ]
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
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
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
};
