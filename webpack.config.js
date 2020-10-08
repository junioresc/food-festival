const path = require(`path`);
const webpack = require("webpack");
const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`).BundleAnalyzerPlugin;
const WebpackPwaManifest = require(`webpack-pwa-manifest`);

module.exports = {
    entry: {
        app: `./assets/js/script.js`,
        events: `./assets/js/events.js`,
        schedule: `./assets/js/schedule.js`,
        tickets: `./assets/js/tickets.js`
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].bundle.js`
    },
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: `file-loader`,
                        options: {
                            name (file) {
                                return `[path][name].[ext]`
                            },
                            publicPath: function(url) {
                                return url.replace(`../`, `/assets/`)
                            }
                        }
                    },
                    {
                        loader: `image-webpack-loader`
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: `jquery`,
            jQuery: `jquery`
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: `static`,
        }),
        new WebpackPwaManifest({
            name: `Food Event`,
            short_name: `Foodies`,
            description: `An app that allows you to view upcoming food events.`,
            background_color: `#01579b`,
            theme_color: `#ffffff`,
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve(`assets/img/icons/icon-512x512.png`),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join(`assets`, `icons`)
            }]
        })
    ],
    mode: `development`
};