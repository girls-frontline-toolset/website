var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLibStyle = new ExtractTextPlugin("lib/lib.css");
const extractProjectStyle = new ExtractTextPlugin("css/styles.css");
var PrerenderSpaPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;
var fs = require("fs");

var indexText = fs.readFileSync('index.html', 'utf8');

let bodyString = indexText.match(new RegExp(/<body class="glScrollbar">[\w\W]*<\/body>/gi))[0];

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
        extractProjectStyle,
      //    new PrerenderSpaPlugin({
      //      staticDir:path.join(__dirname, 'page'),
      //      indexPath: path.join(__dirname, 'index.html'),
      //      routes: [ "/","/time/girl",
      //                "/time/fairy",
      //                "/time/device",
      //                "/list/girl",
      //                "/list/fairy",
      //                "/list/wafer",
      //                "/list/support_unit",
      //                "/list/doc",
      //                "/list/doc/search",
      //                "/list/doc/add",
      //                "/tool/android",
      //                "/tool/chrome",
      //                "/bot/line",
      //                "/bot/line/img",
      //                "/more/line",
      //                "/more/about",
      //                "/more/link",
      //                "/more/feedback",
      //                "/more/privacy_policy",
      //                "/fb/list",
      //                "/log/update",
      //                "/like/list",
      //                "/make/girl",
      //                "/make/device",
      //                "/make/hGirl",
      //                "/make/hDevice",
      //                "/make/wafer",
      //                "/image/add",
      //                "/image/all",
      //                "/event/schedule",
      //                "/magical-tool/so-appetizing"],
      //
      //        server: {
      //         proxy: {
      //           '/**': {
      //             target: 'http://192.168.10.235:8080',
      //             secure: false
      //           }
      //         }
      //       },
      //
      //       postProcess (renderedRoute) {
      //         renderedRoute.html = renderedRoute.html.replace(/<body class="glScrollbar">[\w\W]*<\/body>/gi, bodyString);
      //         renderedRoute.html = renderedRoute.html.replace(/<style type="text\/css" id="vuetify-theme-stylesheet">[\w\W]*<\/style>/gmi,"");
      //         return renderedRoute
      //       },
      //
      //       renderer: new Renderer({
      //         headless: false,
      //         skipThirdPartyRequests : true,
      //         renderAfterDocumentEvent: 'render-event',
      //       }),
      //   }
      // )
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
                {from: '/api/ *', to: 'http://127.0.0.1'},
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
