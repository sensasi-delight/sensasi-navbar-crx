# Sensasi Navbar

![build](https://github.com/sensasi-delight/sensasi-navbar-crx/workflows/build/badge.svg)

Chrome extension.

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```bash
npm install
```

## Build

```bash
npm run build
```

## Build in watch mode

### terminal

```bash
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

<!-- markdownlint-disable-next-line MD033 -->
1. Open <a href="chrome://extensions/" target="_blank">Chrome Extensions page (`chrome://extensions/`)</a>
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Load `dist` directory

## Test

`npx jest` or `npm run test`
