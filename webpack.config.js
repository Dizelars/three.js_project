const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
// const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
// const autoprefixer = require('autoprefixer');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    mode,
    // target,
    devtool,
    devServer: {
        open: true,
    },
    entry: {
        index: './src/index.js',
        'index-style': './src/style/main_page.css',
        amarok: './src/js/pages/oneScriptVectary.js',
        'amarok-style': './src/style/style.css',
        solaris: './src/js/pages/oneScriptVectary.js',
        'solaris-style': './src/style/style.css',
        bus: './src/js/pages/oneScriptVectary.js',
        'bus-style': './src/style/style.css',
        ford: './src/js/pages/oneScriptVectary.js',
        'ford-style': './src/style/style.css',
        kater: './src/js/pages/oneScriptVectary.js',
        'kater-style': './src/style/style.css',
        velo: './src/js/layout/script.js',
        'velo-style': './src/style/style.css',
        moskvich: './src/js/pages/oneScriptVectary.js',
        'moskvich-style': './src/style/style.css',
        kamaz: './src/js/pages/oneScriptVectary.js',
        'kamaz-style': './src/style/style.css',
        moto: './src/js/three/scene_moto.js',
        'moto-style': './src/style/style.css',
        // test: './src/js/test.js',
        // 'test-style': './src/style/test.css',
        // amarok_t3: './src/js/three/my_three.js',
        // 'amarok_t3-style': './src/style/style.css',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'javascript/[name].[contenthash].js',
        // assetModuleFilename: "images/[name][hash][ext][query]",
        filename: 'javascript/[name].js',
        assetModuleFilename: "images/[name][ext]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            chunks: ['index', 'index-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'amarok.html'),
            filename: 'amarok.html',
            chunks: ['amarok', 'amarok-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'solaris.html'),
            filename: 'solaris.html',
            chunks: ['solaris', 'solaris-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'bus.html'),
            filename: 'bus.html',
            chunks: ['bus', 'bus-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'ford.html'),
            filename: 'ford.html',
            chunks: ['ford', 'ford-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'kater.html'),
            filename: 'kater.html',
            chunks: ['kater', 'kater-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'velo.html'),
            filename: 'velo.html',
            chunks: ['velo', 'velo-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'moskvich.html'),
            filename: 'moskvich.html',
            chunks: ['moskvich', 'moskvich-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'kamaz.html'),
            filename: 'kamaz.html',
            chunks: ['kamaz', 'kamaz-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'moto.html'),
            filename: 'moto.html',
            chunks: ['moto', 'moto-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/pages', 'test.html'),
        //     filename: 'test.html',
        //     chunks: ['test', 'test-style'],
        //     minify: {
        //                 collapseWhitespace: true,
        //                 removeComments: true,
        //                 removeRedundantAttributes: true,
        //                 removeScriptTypeAttributes: true,
        //                 removeStyleLinkTypeAttributes: true,
        //                 useShortDoctype: true,
        //             },
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/pages', 'amarok_t3.html'),
        //     filename: 'amarok_t3.html',
        //     chunks: ['amarok_t3', 'amarok_t3-style'],
        //     minify: {
        //         collapseWhitespace: true,
        //         removeComments: true,
        //         removeRedundantAttributes: true,
        //         removeScriptTypeAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         useShortDoctype: true,
        //     },
        // }),
        new MiniCssExtractPlugin({
            // filename: 'style/[name].[contenthash].css',
            // chunkFilename: 'style/[id].[contenthash].css',
            filename: 'style/[name].css',
            chunkFilename: 'style/[id].css',
            ignoreOrder: false,
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


                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             config: path.resolve(__dirname, "postcss.config.js")
                    //         },
                    //     }
                    // },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg)$/i,
                type: "asset/resource",
                generator: {
                    // filename: 'images/[name][hash][ext][query]',
                    filename: 'images/[name][ext]',
                },
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
                // test: /\.otf?$/i,
                test: /\.(woff2?|otf|ttf)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(), // Минификация JS
            // new CssMinimizerPlugin(), // Минификация CSS
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                styles: {
                    name: 'styles',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
};