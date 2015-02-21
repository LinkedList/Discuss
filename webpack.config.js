var path = require('path');
var webpack = require('webpack');

var jsPath = path.join(__dirname, 'public', 'js');

module.exports = {
    entry: path.join(jsPath, "entry.jsx"),
    output: {
        path: jsPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/, loader: "jsx-loader?harmony"}
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
    ]
};
