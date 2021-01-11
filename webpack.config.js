const path = require('path')
const webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: () => [require('autoprefixer')]
                    //     }
                    // }
                ]
            }
        ]
    },

    resolve: { extensions: ["*", ".js", ".jsx"] },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "/dist/",
        filename: 'main.js'
    },

    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
        // overlay: true,
        // open: true        
    },

    plugins: [new webpack.HotModuleReplacementPlugin()]
};