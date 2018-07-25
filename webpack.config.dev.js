
const path = require('path');
// const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.join(__dirname,'/example/index.js'),
    output: {
      path: path.join(__dirname, 'example/dist'),  
      filename: 'index.js',
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx|mjs)$/,
            loader: require.resolve('babel-loader'),
            exclude: /node_modules/,
          },
          {
            test: /\.*css$/,
            use : [ 'style-loader',
            {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  minimize: true,
                  importLoaders: 1,
                  localIdentName: `${path.basename(__dirname)}_[local]`
                },
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options:{
                        fallback: "file-loader",
                        name: "[name][md5:hash].[ext]",
                        outputPath: 'assets/',
                        publicPath: '/assets/'
                    }
                }
            ]
          },
          ]
      },
    plugins:[
      new HtmlWebpackPlugin({
        inject:true,
        template:path.join(__dirname,"example/index.html")
      })
    ],
    devServer: {
      contentBase:  path.join(__dirname, "example/dist"),
      inline: true,
      port: 8000
    }
}
