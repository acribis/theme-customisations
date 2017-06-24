var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: './style.css'
});

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'custom'),
        filename: 'bundle.js'
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
        extractPlugin
    ]
};
