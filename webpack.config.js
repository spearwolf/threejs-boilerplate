// webpack.config.js
//
const path                   = require('path');
const webpack                = require('webpack');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

const PUBLIC       = __dirname + "/public";
const PACKAGE_JSON = require('./package.json');
const CONFIG       = require('./config.json');
const BUILD_DEV    = !! JSON.parse(process.env.BUILD_DEV || 'true');

var plugins = [
    new HtmlWebpackPlugin({
        title    : PACKAGE_JSON.name,
        //minify : !BUILD_DEV, <= got errors here : -(
        hash     : !BUILD_DEV,
        config   : CONFIG,
        template : 'src/index.html',
        inject   : 'body'
    }),
    new ModernizrWebpackPlugin({
                 filename: 'lib/modernizr-bundle.js',
        'feature-detects': CONFIG.modernizr.featureDetects,
                   minify: true,
    }),
    new webpack.DefinePlugin({
                         'DEBUG': JSON.stringify(BUILD_DEV),
              '__PACKAGE_NAME__': PACKAGE_JSON.name,
           '__PACKAGE_VERSION__': PACKAGE_JSON.version,
                     '__STATS__': CONFIG.enableStats,
                    '__DATGUI__': CONFIG.enableDatGui,
    })
];

if (!BUILD_DEV) {

    console.log('!!!!! RELEASE BUILD !!!!!\n');

    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false,
        },
    }));

}

module.exports = {
    entry: "./src/bundle.js",
    resolve: {
        root: [
            path.resolve('./src/js'),
            path.resolve('./src/css'),
        ],
        modulesDirectories: [
            "lib",
            "bower_components",
            "node_modules",
        ]
    },
    output: {
        path: PUBLIC,
        filename: "bundle.js"
    },
    plugins: plugins,
    devtool: "#inline-source-map",
    devServer: {
        contentBase: PUBLIC,
        host: "0.0.0.0"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
        ]
    },
};

