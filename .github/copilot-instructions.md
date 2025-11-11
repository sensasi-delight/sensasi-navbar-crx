# Sensasi Navbar - Copilot Instructions

## Project Overview
Chrome extension that provides a navigation bar for fullscreen browsing (F11 mode). Built with React + TypeScript + Material-UI, uses Shadow DOM for isolation, and communicates via Chrome extension APIs.

## Architecture

### Extension Entry Points (Webpack bundles)
- `content_script.tsx` - Injected into all pages, renders navbar via Shadow DOM
- `background.ts` - Service worker handling Chrome API calls (tabs, history)
- `popup.tsx` - Extension popup UI
- `options.tsx` - Extension settings page

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
npm run dev    # Watch mode, builds to .build/, appends "(dev)" to extension name
npm run build  # Production build, strips "(dev)"
npm run test   # Jest with ts-jest
npm run style  # Prettier format
```

### Loading Extension
1. `npm run dev` → generates `.build/` directory
2. Chrome Extensions → Developer mode → Load unpacked → select `.build/`
3. Changes auto-rebuild, manually reload extension in Chrome

**Note**: Build output is `.build/` NOT `dist/` (README mentions dist for releases only)

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
- Jest configured with `ts-jest` transform
- Test files in `src/__tests__/`
- No E2E tests currently - consider Puppeteer for extension testing

## Common Pitfalls
- Don't import from `/index` files directly - use folder paths (barrel exports handle it)
- Background script can't access DOM - all UI logic in content/popup/options scripts
- Chrome storage is async - always use callbacks or wrap in Promises
- MUI styles won't apply without Shadow DOM configuration in `ThemeProvider`
