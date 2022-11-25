const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode : "production",
  entry : './src/index.tsx',
  module :{
    rules :[
      {
        test : /\.(ts|tsx|js|jsx)$/,
        use : "babel-loader",
        exclude : /node_modules/,
      },     
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              publicPath : './dist/',
              name: "[name].[ext]?[hash]",              
            }
          }
        ]
      } 
    ],
  },
  plugins : [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  output : {
    path : path.resolve(__dirname,"dist"),
    filename:"./src/index.bundle.js"
  },
  resolve :{
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
}