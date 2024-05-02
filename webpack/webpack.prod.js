/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge')
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')
const { transformManifest } = require('./utils.js')
const common = require('./webpack.common.js')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // Source map generation must be turned on
  plugins: [
    sentryWebpackPlugin({
      org: 'sensasi-apps',
      project: 'sensasi-navbar-crx',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
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
