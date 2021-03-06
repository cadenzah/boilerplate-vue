const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoader = require('vue-loader');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env) => {
  // load environment variables to use
  const envKeys = require('./env')(env)

  // file paths
  const configPath = path.resolve(__dirname);
  const buildPath = path.resolve(configPath, '..', 'build');
  const srcPath = path.resolve(__dirname, '..', 'src')

  const config = {
    entry: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      './src/main.js'
    ],
    output: {
      publicPath: '/',
      filename: 'js/[name].js',
      path: buildPath,
    },
    mode: 'development',
    resolve: {
      alias: {
        '@': srcPath,
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules',
          use: 'babel-loader',
        },
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader', {
              loader: 'css-loader',
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                esModule: false,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    devServer: {
      publicPath: '/',
      contentBase: buildPath,
      compress: true,
      port: 3000,
      historyApiFallback: true,
      
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin(envKeys.stringified),
    ],
  };

  return config;
}
