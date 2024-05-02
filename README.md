# Sensasi Navbar

![build](https://github.com/sensasi-delight/sensasi-navbar-crx/workflows/build/badge.svg)

Sensasi Navbar is a Chrome extension designed to enhance navigation within the browser, particularly when Chrome is in full-screen mode (F11). It provides a navigation bar that assists in navigating through tabs, offering convenience and ease of use.

![2024-05-0304-40-04-ezgif com-optimize](https://github.com/sensasi-delight/sensasi-navbar-crx/assets/19289785/ee0ebe90-5f53-449b-8bb4-6c3aaba1c4d0)

> **Contents:**
>
> - [Installation](#installation)
> - [Development](#development)
>   - [Directory Structure](#directory-structure)
>   - [Setup](#setup)
>   - [Build](#build)
>   - [Load Extension to Chrome](#load-extension-to-chrome)
>   - [Test](#test)
> - [Contributing](#contributing)
> - [License](#license)
> - [Support](#support)

## Installation

Sensasi Navbar is not yet available on the Chrome Web Store. To install the extension, follow the steps below:

1. Download the latest release from the [releases page](releases) and extract the `dist` directory from the `.zip` file.
2. Open [Chrome Extensions page (`chrome://extensions/`)](chrome://extensions/).
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Choose the `dist` directory from step 1.

## Development

### Directory Structure

- `./src/typescript`: TypeScript source files
- `./src/assets`: static files
- `./.build`: Unpacked version of Chrome Extension directory
- `./.build/js`: Generated JavaScript files

### Setup

```bash
npm install
```

### Build

```bash
# production build
npm run build

# development build
npm run dev
```

### Load Extension to Chrome

<!-- markdownlint-disable-next-line MD033 -->
1. Open <a href="chrome://extensions/" target="_blank">Chrome Extensions page (`chrome://extensions/`)</a>
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Load `.build` directory

### Test

`npx jest` or `npm run test`

## Contributing

Contributions are welcome! Feel free to [fork the repository](fork), make your changes, and submit a pull request. Any suggestions, bug reports, or feature requests can also be submitted through the GitHub [issues page](issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For any inquiries or support requests, please contact [zainadam.id@gmail.com](mailto:zainadam.id@gmail.com).
