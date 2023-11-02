import type { Theme } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

const DARK_THEME = createTheme({
  palette: {
    mode: 'dark',
  },
})

const LIGHT_THEME = createTheme({})

export default function getTheme(theme: 'dark' | 'light'): Theme {
  return theme === 'dark' ? DARK_THEME : LIGHT_THEME
}
