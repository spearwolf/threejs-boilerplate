var PUBLIC = __dirname + "/public";

module.exports = {
    entry: "./src/app.js",
    output: {
        path: PUBLIC,
        filename: "bundle.js"
    },
    devtool: "#inline-source-map",
    devServer: {
        contentBase: PUBLIC,
        host: "0.0.0.0"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /(node_modules|src.js.lib)/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
        ]
    }
};
