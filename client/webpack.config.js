const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  devServer: {
    port: '5000',
    historyApiFallback: true
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
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.html')})
  ]
};