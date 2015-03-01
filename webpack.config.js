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
            { test: /\.css$/, loader: "style!css?importLoaders=1" },
            { test: /\.(sass|scss)$/, loader: "style!css!sass?outputStyle=expanded" },
            { test: /\.jsx$/, loaders: ['react-hot', "jsx?harmony"], exclude: /node_modules/},
            { test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=100000' },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
