import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import type { ThemeProviderProps } from '@mui/material/styles/ThemeProvider'
// hooks
import { useAppContext } from '../../hooks/AppProvider'
// utils
import getTheme from '../../utils/getTheme'

export default function ThemeProvider({
  children,
  containerElement,
  ...rest
}: Omit<ThemeProviderProps, 'theme'> & {
  containerElement?: HTMLDivElement
}): JSX.Element {
  const { settings } = useAppContext()

  return (
    <MuiThemeProvider
      theme={getTheme(settings.theme, containerElement)}
      {...rest}>
      {children}
    </MuiThemeProvider>
  )
}
