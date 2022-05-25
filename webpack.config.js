/* eslint-env node */
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname),
    },
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
    },
    resolve: {
        alias: {
            /* eslint-disable key-spacing */
            js:      path.resolve(__dirname, 'js'),
            classes: path.resolve(__dirname, 'js', 'classes'),
            utility: path.resolve(__dirname, 'js', 'utility'),
            /* eslint-enable key-spacing */
        },
    },
    module: {
        rules: [],
    },
};