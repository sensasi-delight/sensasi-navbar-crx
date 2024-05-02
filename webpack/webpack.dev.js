/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const common = require('./webpack.common.js')

common.plugins = [
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
          manifest.name += ' (dev)'
          manifest_JSON = JSON.stringify(manifest, null, 2)
          return manifest_JSON
        },
      },
    ],
  }),
]

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
})
