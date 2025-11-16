# Sensasi Navbar - Copilot Instructions

## Project Overview
Chrome extension that provides a navigation bar for fullscreen browsing (F11 mode). Built with React 19 + TypeScript + Material-UI v7, uses Shadow DOM for isolation, and communicates via Chrome extension APIs.

**Package Manager**: This project uses [Bun](https://bun.sh) instead of npm/yarn. All commands must use `bun`.

## Architecture

### Extension Entry Points (Vite + @crxjs/vite-plugin)
- `content_script.tsx` - Injected into all pages, renders navbar via Shadow DOM
- `background.ts` - Service worker handling Chrome API calls (tabs, history)
- `popup.tsx` - Extension popup UI (loaded via `src/popup.html`)
- `options.tsx` - Extension settings page (loaded via `src/options.html`)

**Build System**: Vite with `@crxjs/vite-plugin` for fast HMR and optimized builds. Includes React Compiler (`babel-plugin-react-compiler`) for automatic optimizations. Plugin handles manifest processing, code splitting, and Chrome extension requirements.

### Key Communication Pattern
Content script → Background script communication uses **typed message passing**:
```typescript
// Always use sendToBgScript() utility (src/utils/sendToBgScript.ts)
sendToBgScript('getTabs', undefined, (tabs) => { /* ... */ })

// Action types defined in src/types/ActionPayload.ts (union discriminated type)
// Background script handles in src/background.ts switch statement
```

**Critical**: When adding new actions:
1. Add to `ActionPayload` union type in `src/types/action-payload.ts`
2. Add handler in `background.ts` switch case
3. Use `sendToBgScript` helper from `@/utils/send-to-bg-script` - never call `chrome.runtime.sendMessage` directly

### Shadow DOM Architecture
Navbar renders in Shadow DOM (`content_script.tsx:14-17`) for CSS isolation:
- `@emotion/cache` configured with `container: shadowContainer` 
- MUI theme uses `containerElement` prop (see `theme-provider.tsx`)
- All styles scoped to shadow root automatically
- Nesting order: `CacheProvider` → `ThemeProvider` → `AppProvider` → `Navbar`

### State Management
- **App-wide settings**: `AppProvider` (React Context) + `chrome.storage.sync`
- Settings auto-sync across extension pages via `chrome.storage.onChanged` listener
- No Redux/Zustand - Chrome storage API is the source of truth

## Development Workflow

### Build Commands
```bash
bun run dev      # Vite dev mode with HMR - auto-reloads extension on changes
bun run build    # Production build optimized for Chrome extension
bun run lint     # Biome check + TypeScript type check (no emit)
bun run lint:fix # Biome format with auto-fix only
```

**Important**: Use `bun` commands, not `npm`. Bun is significantly faster for install and script execution.

### Package Management
```bash
bun install           # Install dependencies
bun add <package>     # Add dependency
bun add -d <package>  # Add dev dependency
bun remove <package>  # Remove dependency
bun outdated          # Check for outdated packages
```

### Loading Extension
1. `bun run dev` → generates `.build/` directory with HMR enabled
2. Chrome Extensions → Developer mode → Load unpacked → select `.build/`
3. Changes auto-rebuild and **auto-reload** extension (thanks to Vite HMR)

**Note**: 
- Build output is `.build/` NOT `dist/`
- Vite's HMR automatically reloads the extension during development
- No manual reload needed in most cases (except manifest changes)

## Code Quality

### Biome (Formatter & Linter)
- Uses Biome v2.3.5 for formatting and linting (replaces ESLint + Prettier)
- Config in `biome.json` with recommended rules + React recommended
- Single quotes, semicolons as needed, LF line endings, bracket same line
- Auto-sorts: imports, attributes, keys, properties (via assist actions)
- `bun run lint` includes TypeScript check (`tsc --noEmit`)
- `bun run lint:fix` applies auto-fixes with Biome

## Code Conventions

### Import Ordering & Path Aliases
```typescript
// Always use kebab-case for file names: app-provider.tsx, send-to-bg-script.ts
// Use path alias @/ for src/ imports (configured in vite.config.ts)

// vendors (React, third-party, MUI)
import Button from '@mui/material/Button'
// local imports with @/ alias
import Navbar from '@/components/navbar'
import { useAppContext } from '@/components/app-provider'
import sendToBgScript from '@/utils/send-to-bg-script'
```

### Component Patterns
- **Functional components only** - React 19 with automatic optimizations via React Compiler
- **Named exports** for utilities, **default export** for main components
- Memoization handled by React Compiler - only add manual `memo()` for expensive components
- File naming: `kebab-case.tsx` for all files (components, utils, types)

### File Organization
- **Naming**: All files use `kebab-case.tsx` (e.g., `app-provider.tsx`, `auto-hide-wrapper.tsx`)
- **No index files**: Import directly from files, not via barrel exports
- **Component grouping**: Related components in subfolders (e.g., `navbar-components/`, `options-page-components/`)
- **Shared resources**: Types in `src/types/`, utilities in `src/utils/`
- **Path alias**: Always use `@/` for imports from `src/` (configured in Vite)

## Critical Implementation Details

### Auto-Hide Feature (`auto-hide-wrapper.tsx`)
- Triggered by mouse at `clientY === 0` (top edge) OR `F6` key
- Uses MUI `Dialog` + `Grow` transition with custom `transformOrigin`
- Debounced with 50ms timeout to prevent flicker
- Wrapped by memoization for performance optimization

### Chrome API Permissions
Manifest v3 requires:
- `"storage"` for settings sync
- `"history"` for address bar suggestions  
- `"host_permissions": ["<all_urls>"]` for content script injection

## Common Pitfalls
- Always use `@/` path alias for imports from `src/` - never use relative paths like `../..`
- File names must be `kebab-case.tsx` - enforced by Biome's noRestrictedImports rule
- Background script can't access DOM - all UI logic in content/popup/options scripts
- Chrome storage is async - always use callbacks or wrap in Promises
- MUI styles won't apply without Shadow DOM configuration in `theme-provider.tsx`
- React Compiler is active - avoid manual memoization unless necessary
