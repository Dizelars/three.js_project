const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
// const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
// const autoprefixer = require('autoprefixer');

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
        // '404': './src/js/pages/404.js',
        // '404-style': './src/style/pages/404.css',
        amarok: './src/js/pages/oneScriptVectary.js',
        'amarok-style': './src/style/style.css',
        // solaris: './src/js/pages/solaris.js',
        // // 'solaris-style': './src/style/pages/solaris.css',
        // 'solaris-style': './src/style/style.css',
        solaris_two: './src/js/pages/oneScriptVectary.js',
        'solaris_two-style': './src/style/style.css',
        bus: './src/js/pages/oneScriptVectary.js',
        'bus-style': './src/style/style.css',
        ford: './src/js/pages/oneScriptVectary.js',
        'ford-style': './src/style/style.css',
        kater: './src/js/pages/oneScriptVectary.js',
        'kater-style': './src/style/style.css',
        velo: './src/js/pages/oneScriptVectary.js',
        'velo-style': './src/style/style.css',
        moskvich: './src/js/pages/oneScriptVectary.js',
        'moskvich-style': './src/style/style.css',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'javascript/[name].[contenthash].js',
    },
    optimization: {
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            chunks: ['index', 'index-style'],
            minify: false,
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/pages', '404.html'),
        //     filename: 'pages/404.html',
        //     chunks: ['404', '404-style'],
        //     minify: false,
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'amarok.html'),
            filename: 'pages/amarok.html',
            chunks: ['amarok', 'amarok-style'],
            // chunks: ['amarok'],
            minify: false,
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/pages', 'solaris.html'),
        //     filename: 'pages/solaris.html',
        //     chunks: ['solaris', 'solaris-style'],
        //     // chunks: ['solaris'],
        //     minify: false,
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'solaris_two.html'),
            filename: 'pages/solaris_two.html',
            chunks: ['solaris_two', 'solaris_two-style'],
            // chunks: ['solaris_two'],
            minify: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'bus.html'),
            filename: 'pages/bus.html',
            chunks: ['bus', 'bus-style'],
            // chunks: ['bus'],
            minify: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'ford.html'),
            filename: 'pages/ford.html',
            chunks: ['ford', 'ford-style'],
            // chunks: ['ford'],
            minify: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'kater.html'),
            filename: 'pages/kater.html',
            chunks: ['kater', 'kater-style'],
            // chunks: ['kater'],
            minify: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'velo.html'),
            filename: 'pages/velo.html',
            chunks: ['velo', 'velo-style'],
            // chunks: ['velo'],
            minify: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages', 'moskvich.html'),
            filename: 'pages/moskvich.html',
            chunks: ['moskvich', 'moskvich-style'],
            // chunks: ['moskvich'],
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash].css',
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
                                config: path.resolve(__dirname, "postcss.config.js")
                            },
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
        ]
    }
};