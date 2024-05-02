/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  transformManifest(content, isDevelopment = true) {
    const manifest = JSON.parse(content.toString())
    const packageJson = require('../package.json')

    manifest.version = packageJson.version
    manifest.description = packageJson.description

    if (isDevelopment) {
      manifest.name += ' (dev)'
    }

    return JSON.stringify(manifest, null, 2)
  },
}
