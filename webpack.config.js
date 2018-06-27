var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLibStyle = new ExtractTextPlugin("lib/lib.css");
const extractProjectStyle = new ExtractTextPlugin("css/styles.css");

module.exports = {
    entry: {
        'app': './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './common'),
        publicPath: '/common/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.json$/,
            loader: 'json-loader'
        },
            {
                test: /\.css$/,
                loader: extractLibStyle.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                })
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractProjectStyle.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        }),
                        json: 'json-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    useRelativePath: true
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        extractLibStyle,
        extractProjectStyle
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        host: '192.168.10.235',
        port: 8080,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1/',
                changeOrigin: true,
                secure: false
            },
        },
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                {from: '/time/girl.html', to: '/index.html'},
                {from: '/time/device.html', to: '/index.html'},
                {from: '/time/fairy.html', to: '/index.html'},
                {from: '/time/make.html', to: '/index.html'},
                {from: '/time/make_device.html', to: '/index.html'},
                {from: '/time/list.html', to: '/index.html'},
                {from: '/fb/list.html', to: '/index.html'},
                {from: '/fb/add.html', to: '/index.html'},
                {from: '/like/list.html', to: '/index.html'},
                {from: '/like/list_fairy', to: '/index.html'},
                {from: '/time/make_device', to: '/index.html'},
                {from: '/more/line', to: '/index.html'},
                {from: '/bot/line', to: '/index.html'},
                {from: '/more/feedback', to: '/index.html'},
                {from: '/more/link', to: '/index.html'},
                {from: '/more/about', to: '/index.html'},
                {from: '/time/h_make', to: '/index.html'},
                {from: '/api/*', to: 'http://127.0.0.1'},
                {from: '/.*', to: '/index.html'},
            ]
        },
        noInfo: true,
        overlay: true
    },

    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
    ])
}
