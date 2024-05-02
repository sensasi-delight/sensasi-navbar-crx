/* eslint-disable @typescript-eslint/no-var-requires */

const DESC_MAX_LENGTH = 132

module.exports = {
  transformManifest(content, isDevelopment = true) {
    const manifest = JSON.parse(content.toString())
    const packageJson = require('../package.json')

    manifest.version = packageJson.version

    manifest.description =
      packageJson.description.length > DESC_MAX_LENGTH
        ? packageJson.description.substring(0, DESC_MAX_LENGTH - 3) + '...'
        : packageJson.description

    if (isDevelopment) {
      manifest.name += ' (dev)'
    }

    return JSON.stringify(manifest, null, 2)
  },
}
