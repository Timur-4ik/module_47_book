var path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: path.resolve(__dirname, 'src/JS/main.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js'
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template:  path.resolve(__dirname, 'src/templates/index.pug'), 
            filename: "index.html",
            minify: false,

        }
        ),
         new MiniCssExtractPlugin()
    ],
    module:{
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"], 
            }, 

            {
                test: /\.pug$/,
                use: 'pug-loader',
            }
        ]
    },
    mode: "production"
}

//production development