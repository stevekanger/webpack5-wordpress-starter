const path = require('path')
const rootDir = path.join(__dirname, '')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: path.join(rootDir, 'src/js', 'app'),
  },

  output: {
    filename: '[name].js',
    path: path.join(rootDir, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost/wordpress/',
      files: ['**/*.php'],
    }),
  ],

  devServer: {
    compress: true,
    port: 3000,
    open: true,
  },
}
