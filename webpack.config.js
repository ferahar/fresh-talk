const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isProd ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  resolve: {
    extensions: ['.ts', '.js', '.njk']
  },

  devtool: isDev ? 'source-map': false,

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebPackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      }
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],

  module: {
    rules: [

      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },

      {
        test: /\.(njk|html)$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {}
          }
        ]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            }
          },
        ]
      },
    ]
  }
}
