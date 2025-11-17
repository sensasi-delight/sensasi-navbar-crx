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
        default_title: 'Sensasi Navbar',
    },
    author: packageJson.author,
    background: {
        service_worker: 'src/service-worker.ts',
    },
    content_scripts: [
        {
            js: ['src/inject-navbar.tsx'],
            matches: ['<all_urls>'],
        },
    ],
    description: packageJson.description,
    host_permissions: ['<all_urls>'],
    manifest_version: 3,
    name: 'Sensasi Navbar',
    permissions: ['storage', 'history'],
    version: packageJson.version,
})
