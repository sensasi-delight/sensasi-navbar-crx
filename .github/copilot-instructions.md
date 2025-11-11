# Sensasi Navbar - Copilot Instructions

## Project Overview
Chrome extension that provides a navigation bar for fullscreen browsing (F11 mode). Built with React + TypeScript + Material-UI, uses Shadow DOM for isolation, and communicates via Chrome extension APIs.

**Package Manager**: This project uses [Bun](https://bun.sh) instead of npm/yarn. All commands should use `bun` instead of `npm`.

## Architecture

### Extension Entry Points (Vite + @crxjs/vite-plugin)
- `content_script.tsx` - Injected into all pages, renders navbar via Shadow DOM
- `background.ts` - Service worker handling Chrome API calls (tabs, history)
- `popup.tsx` - Extension popup UI (loaded via `src/popup.html`)
- `options.tsx` - Extension settings page (loaded via `src/options.html`)

**Build System**: Uses Vite with `@crxjs/vite-plugin` for fast HMR and optimized builds. Plugin automatically handles manifest processing, code splitting, and Chrome extension requirements.

### Key Communication Pattern
Content script → Background script communication uses **typed message passing**:
```typescript
// Always use sendToBgScript() utility (src/utils/sendToBgScript.ts)
sendToBgScript('getTabs', undefined, (tabs) => { /* ... */ })

// Action types defined in src/types/ActionPayload.ts (union discriminated type)
// Background script handles in src/background.ts switch statement
```

**Critical**: When adding new actions:
1. Add to `ActionPayload` union type
2. Add handler in `background.ts` switch case
3. Use `sendToBgScript` helper - never call `chrome.runtime.sendMessage` directly

### Shadow DOM Architecture
Navbar renders in Shadow DOM (`content_script.tsx:25-30`) for CSS isolation:
- `@emotion/cache` configured with `container: shadowContainer` 
- MUI theme uses `containerElement` prop (see `ThemeProvider.tsx`)
- All styles scoped to shadow root automatically

### State Management
- **App-wide settings**: `AppProvider` (React Context) + `chrome.storage.sync`
- Settings auto-sync across extension pages via `chrome.storage.onChanged` listener
- No Redux/Zustand - Chrome storage API is the source of truth

## Development Workflow

### Build Commands
```bash
bun run dev     # Vite dev mode with HMR - auto-reloads extension on changes
bun run build   # Production build optimized for Chrome extension
bun run test    # Jest with ts-jest via Bun
bun run lint    # Biome check (format + lint) with auto-fix
bun run lint:fix # Biome format with auto-fix
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
- Uses [Biome](https://biomejs.dev) for formatting and linting (replaces ESLint + Prettier)
- Config in `biome.json` with recommended rules
- Single quotes, semicolons as needed, trailing commas
- Run `bun run check` to format and lint with auto-fix
- Separate commands: `bun run format` (format only), `bun run lint` (lint only)

## Code Conventions

### Import Ordering (enforced pattern in codebase)
```typescript
// types (if needed)
import type { ReactElement } from 'react'
// vendors (React, third-party)
import React from 'react'
// materials (MUI components)
import Button from '@mui/material/Button'
// components (local)
import Navbar from './components/Navbar'
// hooks/utils/etc
import { useAppContext } from './hooks/AppProvider'
```

### Component Patterns
- **Functional components only** - no class components found
- **Named exports** for utilities, **default export** for main components
- Use `ReactElement` return type, not `JSX.Element`
- Memo optimization for expensive components (see `AutoHideWrapper.tsx`)

### File Organization
- Component folders have `index.ts` for clean re-exports
- Co-locate related components (e.g., `AddressBar/` subfolder in `Navbar/`)
- Shared types in `src/types/`, utilities in `src/utils/`

## Critical Implementation Details

### Auto-Hide Feature (`AutoHideWrapper.tsx`)
- Triggered by mouse at `clientY === 0` (top edge) OR `F6` key
- Uses MUI `Dialog` + `Grow` transition with custom `transformOrigin`
- Debounced with 50ms timeout to prevent flicker

### Chrome API Permissions
Manifest v3 requires:
- `"storage"` for settings sync
- `"history"` for address bar suggestions  
- `"host_permissions": ["<all_urls>"]` for content script injection

## Testing
- Jest configured with `ts-jest` transform, run via Bun
- Test files in `src/__tests__/`
- Run tests with `bun run test` or `bun test`
- No E2E tests currently - consider Puppeteer for extension testing

## Common Pitfalls
- Don't import from `/index` files directly - use folder paths (barrel exports handle it)
- Background script can't access DOM - all UI logic in content/popup/options scripts
- Chrome storage is async - always use callbacks or wrap in Promises
- MUI styles won't apply without Shadow DOM configuration in `ThemeProvider`
