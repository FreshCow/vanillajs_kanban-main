const path = require('path');

module.exports = {
    "mode"   : "none",
    "entry"  : "./dist/src/app.js",
    "output" : {
        "path"    : __dirname + '/dist',
        "filename": "bundle.js"
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        static: path.join(__dirname, 'dist')
    },
    "module" : {
        "rules": [
            {
                "test": /\.s[ac]ss$/i,
                "use" : [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                "test"   : /\.js$/,
                "exclude": /node_modules/,
                "use"    : {
                    "loader" : "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                        ]
                    }
                }
            },
            {
                test   : /\.(png|jpe?g|gif)$/i,
                loader : 'file-loader',
                options: {
                    publicPath: './dist/',
                    name      : '[name].[ext]?[hash]',
                },
            },
        ]
    }
};
