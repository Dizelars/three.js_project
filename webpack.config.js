const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

let htmlPageNames = ['404'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/pages/${name}.html`, // относительный путь к HTML-файлам
        filename: `${name}.html`, // выходные HTML-файлы
        chunks: [`${name}`] // соответствующие JS-файлы
    })
});

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        open: true,
    },
    // entry: {
    //     main: './js/direction.js',
    //     example1: './js/pages/404.js',
    //     //... repeat until example 4
    // },
    // entry: 'index.js',
    // output: {
    //     path: __dirname + '/dist',
    //     filename: 'direction.js'
    // },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    // entry: {
    //     index: './src/index.js',
    //     '404': './src/pages/404.js',
    // },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     clean: true,
    //     filename: 'script.js',
    // },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: "./src/index.html",
        //     chunks: ['main']
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        //
        // new HtmlWebpackPlugin({
        //     filename: '404.html',
        //     template: './src/pages/404.html',
        //     chunks: ['404']
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'aframe_interior.html',
        //     template: './src/pages/aframe_interior.html',
        //     // chunks: ['aframe_interior'],
        // }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    // ].concat(multipleHtmlPlugins),
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
            //     test: /\.html$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]'
            //             }
            //         }
            //     ],
            //     exclude: path.resolve(__dirname, 'src', 'index.html')
            // },
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