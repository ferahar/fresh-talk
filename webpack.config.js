const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = e => isDev ? 'bundle'+e: 'bundle[hash]'+e
// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash]${ext}`

module.exports = {
  context: path.resolve(__dirname, 'src2'),
  mode: "development",
  entry: "./index.ts",
  output: {
    filename: "build[hash].js",
    path: path.resolve(__dirname, 'dist2')
  },

  resolve: {
    extensions: [".ts", ".js", ".njk"]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebPackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ],

  module: {
    rules: [

      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },

      {
        test: /\.njk$/,
        use: [
          {
            loader: "simple-nunjucks-loader",
            options: {}
          }
        ]
      },

      {
        test: /\.styl/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'stylus-loader'
        ],
      },
    ]
  }
}