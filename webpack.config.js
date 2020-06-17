const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {

    /* Two entries, one bundle for each html-file*/
    entry: {
        login : "./src/index.js",
        main: "./src/main.js"
    },

    devtool: "none",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },


    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: "file-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        /* One html-webpac-plugin for each html-file
           Uses different chunks / entries / bundles */
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ["login"]
        }),
        new HtmlWebPackPlugin({
            template: "./src/main.html",
            filename: "./main.html",
            chunks: ["main"]
        }),
    ]
};