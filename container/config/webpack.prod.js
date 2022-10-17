const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'ui_mfe_container',
            remotes: {
                marketing: `ui-mfe-marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);