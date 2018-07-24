
const path = require('path');
const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),  
      filename: 'index.js',
    },
    externals: {
        react: {          
          commonjs: "react",          
          commonjs2: "react",          
          amd: "React",          
          root: "React"      
      },      
      "react-dom": {          
          commonjs: "react-dom",          
          commonjs2: "react-dom",          
          amd: "ReactDOM",          
          root: "ReactDOM"      
      }  ,
      "prop-types":{
        commonjs:"prop-types",
        commonjs2:"prop-types",
        amd:"PropTypes",
        root:"PropTypes"
      }
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx|mjs)$/,
            loader: require.resolve('babel-loader'),
            include: path.resolve(__dirname, "src"),
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
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new MinifyPlugin({}, {comments:false})
    ]
}
