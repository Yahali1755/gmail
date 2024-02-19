const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');

require('dotenv').config();

module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  devServer: {
    port: '5000',
    historyApiFallback: true,
    proxy: {
      '/api': process.env.SERVER_URL,
      '/auth': process.env.SERVER_URL
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, 
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.html')}),
    new EnvironmentPlugin(['SERVER_URL', 'STALE_TIME', 'REFETCH_INTERVAL'])
  ]
};