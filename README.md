# 🚀 Sensasi Navbar

![build](https://github.com/sensasi-delight/sensasi-navbar-crx/workflows/build/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A modern Chrome extension that brings back your navigation bar in fullscreen mode (F11)** 🧭

Experience seamless browsing in fullscreen mode with a beautiful, auto-hiding navigation bar. Built with React 19, TypeScript, and Material-UI for a smooth and modern interface.

![2024-05-0304-40-04-ezgif com-optimize](https://github.com/sensasi-delight/sensasi-navbar-crx/assets/19289785/ee0ebe90-5f53-449b-8bb4-6c3aaba1c4d0)

---

## ✨ Features

- 🎨 **Modern UI** - Clean design with Material-UI components
- 🔄 **Auto-Hide** - Appears when you need it, hides when you don't
- ⌨️ **Keyboard Shortcuts** - Quick access with hotkeys
- 📑 **Tab Management** - Easy switching between open tabs
- 🔍 **Smart Address Bar** - Quick navigation and history search
- 🎯 **Fullscreen Optimized** - Perfect for F11 browsing mode
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

---

## 📦 Installation

### From Release (Recommended)

1. **Download** the latest `sensasi-navbar-crx-v*.zip` release from the [releases page](https://github.com/sensasi-delight/sensasi-navbar-crx/releases)
2. **Create** a new folder for the extension (e.g., `sensasi-navbar`)
3. **Extract** the contents of `sensasi-navbar-crx-v*.zip` file into that folder
4. **Open** Chrome Extensions page:
   - Type `chrome://extensions/` in the address bar and press Enter, OR
   - Click the three-dot menu (⋮) → Extensions → Manage Extensions
5. **Enable** Developer mode (toggle in top-right corner)
6. **Click** "Load unpacked" button
7. **Select** the folder where you extracted the files

### Build from Source

See the [Development](#️-development) section below.

---

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh) - Fast JavaScript runtime (instead of Node.js)
- Google Chrome browser

### Tech Stack

- ⚛️ **React 19** with TypeScript
- 🎨 **Material-UI v7** for components
- ⚡ **Vite** for blazing fast builds
- 🔧 **@crxjs/vite-plugin** for Chrome extension support
- 🧹 **Biome** for linting and formatting

### Project Structure

```text
sensasi-navbar-crx/
├── src/
│   ├── background.ts           # Background service worker
│   ├── content_script.tsx      # Navbar injection (Shadow DOM)
│   ├── popup.tsx               # Extension popup
│   ├── options.tsx             # Settings page
│   ├── components/             # React components
│   ├── types/                  # TypeScript types
│   └── utils/                  # Helper functions
├── public/
│   ├── manifest.json           # Extension manifest
│   └── icons/                  # Extension icons
└── .build/                     # Build output (auto-generated)
```

### Quick Start

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Start development server**

   ```bash
   bun run dev
   ```

   This will create a `.build/` folder with hot-reload enabled.

3. **Load extension in Chrome**

   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `.build/` folder

4. **Make changes**
   - Edit files in `src/`
   - Extension auto-reloads on save ⚡

### Build Commands

```bash
bun run dev        # 🔥 Development build with HMR
bun run build      # 📦 Production build
bun run lint       # 🔍 Check code quality
bun run lint:fix   # ✨ Auto-fix formatting issues
```

### Code Guidelines

- Use **kebab-case** for file names: `my-component.tsx`
- Use **path alias** `@/` for imports: `import Navbar from '@/components/navbar'`
- Follow **Biome** formatting rules (enforced automatically)
- Write **functional components** with TypeScript
- Use **React hooks** for state management

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes
4. **Commit** your changes: `git commit -m 'Add amazing feature'`
5. **Push** to the branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### Reporting Issues

Found a bug? Have a feature request? Please open an issue on our [GitHub Issues](https://github.com/sensasi-delight/sensasi-navbar-crx/issues) page.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Need help or have questions?

- 🐛 Issues: [GitHub Issues](https://github.com/sensasi-delight/sensasi-navbar-crx/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/sensasi-delight/sensasi-navbar-crx/discussions)

---

**Made with ❤️ by [🍕](https://github.com/sensasi-delight)**

⭐ Star this repo if you find it helpful!
