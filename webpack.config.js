const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        background: './src/backgroundScript/index.js',
        content: './src/pageScript/index.js',
        popup: './src/popup/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: 'babel-loader' } // options 在 .babelrc 定义
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['popup'],
            inject: true,
            template: path.resolve(__dirname, './src/popup/index.html')
        })
    ]
}
