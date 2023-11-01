const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const SRC_DIR = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    popup: path.join(SRC_DIR, 'popup.tsx'),
    options: path.join(SRC_DIR, 'options.tsx'),
    background: path.join(SRC_DIR, 'background.ts'),
    content_script: path.join(SRC_DIR, 'content_script.tsx')
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks (chunk) {
        return chunk.name !== 'background'
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
      options: {}
    })
  ]
}
