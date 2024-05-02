import type { Theme, ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

export default function getTheme(
  theme: 'dark' | 'light',
  shadowRootElement?: HTMLDivElement,
): Theme {
  const opts: ThemeOptions = {
    palette:
      theme === 'dark'
        ? {
            mode: 'dark',
          }
        : undefined,
  }

  if (shadowRootElement !== undefined) {
    opts.components = {
      MuiPopover: {
        defaultProps: {
          container: shadowRootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: shadowRootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: shadowRootElement,
        },
      },
    }
  }

  return createTheme(opts)
}
