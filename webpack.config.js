const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  // mode: 'development',
  // context: path.resolve(__dirname, 'src'), папка с исходным кодом, при включении нужно править поля entry и template
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.js',
      './src/sass/main.scss',
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : '',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      favicon: 'favicon.ico',
    }),
    new CopyWebpackPlugin([
      { from: './src/assets', to: 'assets' },
    ]),
    new MiniCssExtractPlugin({
      filename: isDev ? 'style.css' : 'style.[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[folder]/[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
};
