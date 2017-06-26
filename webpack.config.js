const pkg = require('./package.json');

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: pkg.vars.cssName
});

var CopyPlugin = new CopyPlugin([
    {
        from: pkg.paths.src.templates + 'main.php',
        to: pkg.vars.phpName
    }
]);

var ManifestPlugin = new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'webpackManifest'
});

module.exports = {
    entry: pkg.paths.src.js + pkg.vars.entry,
    output: {
        path: path.resolve(__dirname, pkg.paths.build.base),
        filename: pkg.vars.output
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader', options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader', options: { sourceMap: true }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        extractPlugin, CopyPlugin, ManifestPlugin
    ]
};
