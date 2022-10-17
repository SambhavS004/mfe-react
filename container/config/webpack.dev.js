const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin ({
            name: 'ui_mfe_container',
            remotes: {
                marketing: 'ui-mfe-marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);