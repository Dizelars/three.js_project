const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        open: true,
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'script.js',
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src', 'index.html')
        // }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
            // template: path.resolve(__dirname, 'src/pages', 'aframe_interior.html')
        }),
        new HtmlWebpackPlugin({
            filename: "aframe_interior.html",
            template: "./src/pages/aframe_interior.html"
            // template: path.resolve(__dirname, 'src/pages', 'aframe_interior.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')],
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.otf?$/i,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            // {
            //     test: /\.gltf$/,
            //     loader: '@vxna/gltf-loader',
            //     options: { inline: true }
            // },
            // {
            //     test: /\.(png|jpe?g|gif|glb|gltf)$/i,
            //     loader: 'file-loader',
            //     options: {
            //         publicPath: './',
            //         name: '[name].[ext]'
            //     },
            // },
        ]
    }
}