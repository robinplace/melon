var webpack = require ('webpack')

module.exports = {
    entry: './app.js',
    output: {
        path: __dirname,
        filename: './bundle.js',
        sourceMapFilename: '[file].map',
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'raw', },
        ],
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
    ],
}

