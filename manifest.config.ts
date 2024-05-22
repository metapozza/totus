import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {},
  side_panel: {
    default_path: 'src/side-panel/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      js: ['src/content-script/index.ts'],
      matches: ["<all_urls>"],
      run_at: 'document_end',
    },
  ],
  host_permissions: ['*://*/*'],
  permissions: ['storage', 'sidePanel', 'contextMenus' , 'nativeMessaging'],
  web_accessible_resources: []
}))
