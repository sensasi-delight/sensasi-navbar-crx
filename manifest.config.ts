import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest({
    action: {
        default_icon: {
            16: 'icons/icon16.png',
            32: 'icons/icon32.png',
            48: 'icons/icon48.png',
            128: 'icons/icon128.png',
        },
        default_popup: 'src/popup.html',
    },
    background: {
        service_worker: 'src/background.ts',
    },
    content_scripts: [
        {
            js: ['src/content_script.tsx'],
            matches: ['<all_urls>'],
        },
    ],
    description: packageJson.description,
    host_permissions: ['<all_urls>'],
    manifest_version: 3,
    name: 'Sensasi Navbar',
    options_ui: {
        page: 'src/options.html',
    },
    permissions: ['storage', 'history'],
    version: packageJson.version,
})
