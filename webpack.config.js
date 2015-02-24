var path = require('path');
var webpack = require('webpack');

var jsPath = path.join(__dirname, 'public', 'js');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        path.join(jsPath, "entry.jsx")
    ],
    output: {
        path: jsPath,
        filename: "bundle.js",
        publicPath: 'http://localhost:3000/_assets/'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.sass$/, loader: "style!css!sass?outputStyle=expanded" },
            { test: /\.jsx$/, loaders: ['react-hot', "jsx?harmony"], exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
