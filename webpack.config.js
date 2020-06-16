const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        login : "./src/index.js",
        main: "./src/main.js"
    },

    output: {
        path: __dirname + '/dist', //Önskar förklaring på denna
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
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ["login"]
        }),
        new HtmlWebPackPlugin({
            template: "./src/main.html",
            filename: "./main.html",
            chunks: ["main"]
        })

    ]
};