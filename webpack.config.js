
const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),  
      filename: 'index.js',
      libraryTarget: "umd",
      library: "Demo",     
      publicPath: '/dist/',      
      umdNamedDefine: true  
    },
    resolve: {      
      alias: {          
          'react': path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
          'assets': path.resolve(__dirname, 'assets')
        }  
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
            use : [ 'style-loader','css-loader']
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
        })
    ]
}
