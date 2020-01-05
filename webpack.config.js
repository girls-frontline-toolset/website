let path = require('path');
let webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let PrerenderSpaPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;
let fs = require("fs");

let indexText = fs.readFileSync('index.html', 'utf8');
let bodyString = indexText.match(new RegExp(/<body class="glScrollbar">[\w\W]*<\/body>/gi))[0];

let urlList = ["/make/hGirl","/en/make/hGirl","/ja/make/hGirl","/tw/make/hGirl","/tw/make/girl","/make/girl","/ja/make/girl","/cn/make/girl","/en/make/girl"];

let runSAPPrerender = false;
// let urlList = ["/time/", "/list/","/tool/","/bot/","/more/","/fb/","/log/","/like/","/make/","/image/","/event/", "/magical-tool/",
//   "/tw/time/", "/tw/list/","/tw/tool/","/tw/bot/","/tw/more/","/tw/fb/","/tw/log/","/tw/like/","/tw/make/","/tw/image/","/tw/event/", "/tw/magical-tool/",
//   "/cn/time/", "/cn/list/","/cn/tool/","/cn/bot/","/cn/more/","/cn/fb/","/cn/log/","/cn/like/","/cn/make/","/cn/image/","/cn/event/", "/cn/magical-tool/",
//   "/ja/time/", "/ja/list/","/ja/tool/","/ja/bot/","/ja/more/","/ja/fb/","/ja/log/","/ja/like/","/ja/make/","/ja/image/","/ja/event/", "/ja/magical-tool/",
// ];
//let urlList = require('./urlList/url.json');
//let urlList = require('./urlList/url-tw.json');
//let urlList = require('./urlList/url-cn.json');
//let urlList = require('./urlList/url-ja.json');
//let urlList = require('./urlList/url-en.json');
//let urlList = require('./urlList/url-image.json');
//let urlList = require('./urlList/url-image-tw.json');
//let urlList = require('./urlList/url-image-cn.json');
//let urlList = require('./urlList/url-image-ja.json');
//let urlList = require('./urlList/url-image-en.json');
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
        rules: [
            {
                test: /\.css$/,
                use: [
                  process.env.NODE_ENV !== 'production'
                   ? 'vue-style-loader'
                  : MiniCssExtractPlugin.loader,
                  'css-loader'
              ]
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                          process.env.NODE_ENV !== 'production'
                            ? 'vue-style-loader'
                            : MiniCssExtractPlugin.loader,
                          'css-loader'
                        ]
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
            },
          {
            test: /\.styl(us)?$/,
            use: [
              'css-loader',
              'stylus-loader'
            ]
          }
        ]
    },
    plugins: getPlugin(),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    host: '192.168.10.235',
    //host: 'localhost',
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


  module.exports.optimization ={
    minimizer: [
      new UglifyJsPlugin()
      ],
  };

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProvidePlugin({
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
  ])
}

function getPlugin(){
  let array = [new BundleAnalyzerPlugin(),
    new VuetifyLoaderPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'lib/lib.css'
    })];

  if(runSAPPrerender){
    let sapPrerender = new PrerenderSpaPlugin({
            staticDir:path.join(__dirname, 'page'),
            indexPath: path.join(__dirname, 'index.html'),
            routes: urlList,
            // routes: ["/image/all/"],
            //routes: ["/magical-tool/so-appetizing/","/ja/magical-tool/so-appetizing/","/tw/magical-tool/so-appetizing/","/cn/magical-tool/so-appetizing/"],

           server: {
           proxy: {
             '/**': {
               target: 'http://192.168.10.235:8080',
               secure: false
             }
           }
         },

         postProcess(renderedRoute) {
           //console.log(renderedRoute.route);
           renderedRoute.html = renderedRoute.html.replace(/<body class="glScrollbar">[\w\W]*<\/body>/gi, bodyString);
           renderedRoute.html = renderedRoute.html.replace(/<style type="text\/css" id="vuetify-theme-stylesheet">[\w\W]*<\/style>/gmi, "");
           return renderedRoute
         },
         renderer: new Renderer({
           headless: false,
           maxConcurrentRoutes: 15,
           skipThirdPartyRequests: true,
           renderAfterDocumentEvent: 'render-event',
         }),
       }
     );

    array.push(sapPrerender);
  }

  return array;
}
