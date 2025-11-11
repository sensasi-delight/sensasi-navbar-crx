/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge')
const { transformManifest } = require('./utils.js')
const common = require('./webpack.common.js')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
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

            return transformManifest(content, false)
          },
        },
      ],
    }),
  ],
})
