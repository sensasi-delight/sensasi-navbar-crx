/* eslint-disable @typescript-eslint/no-var-requires */

const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // Source map generation must be turned on
  plugins: [
    sentryWebpackPlugin({
      org: 'sensasi-apps',
      project: 'sensasi-navbar-crx',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
})
