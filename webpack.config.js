const path = require('path');

module.exports = {
  entry: './src/js/engine.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
         test: /\.(png|jpg)$/,
         use: [
          'file-loader'
         ]
      },
      {
        test: /\.css$/,
        use: [
         'style-loader',
         'css-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
  },
};