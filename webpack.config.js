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
    devtool: 'eval',
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
                semicolons: false,
            },
            sourceMap: true,
        }),
    ],
}

