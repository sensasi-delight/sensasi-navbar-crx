/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const SRC_DIR = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    popup: path.join(SRC_DIR, 'popup.tsx'),
    options: path.join(SRC_DIR, 'options.tsx'),
    background: path.join(SRC_DIR, 'background.ts'),
    content_script: path.join(SRC_DIR, 'content_script.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../.build/js'),
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background'
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '.',
          to: '../',
          context: 'public',
          transform: (content, path) => {
            if (!path.includes('manifest')) {
              return content
            }

            const manifest = JSON.parse(content.toString())
            const packageJson = require('../package.json')

            if (this.mode === 'development') {
              manifest.name += ' (dev)'
            }

            manifest.version = packageJson.version
            manifest.description = packageJson.description

            manifest_JSON = JSON.stringify(manifest, null, 2)
            return manifest_JSON
          },
        },
      ],
    }),
  ],
}
