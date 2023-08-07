// module.exports = {
//     plugins: [
//         require('postcss-preset-env'),
//         require('autoprefixer'),
//         // Здесь можно добавить другие плагины PostCSS, если они понадобятся в будущем
//     ],
// };

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        require('autoprefixer'),
        require('postcss-preset-env')
    ]
}

module.exports = config
