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
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
        ]
    }
};
