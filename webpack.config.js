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
            { test: /\.js?$/, exclude: /(node_modules|bower_components)/,
                loader: 'babel', query: { presets: ['es2015'] } }
        ],
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
    ],
}

