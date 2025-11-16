import {
  ThemeProvider as MuiThemeProvider,
  type ThemeProviderProps,
} from '@mui/material/styles'
import getTheme from '../utils/get-theme'
import { useAppContext } from './app-provider'

export default function ThemeProvider({
  children,
  containerElement,
  ...rest
}: Omit<ThemeProviderProps, 'theme'> & {
  containerElement?: HTMLDivElement
}) {
  const { settings } = useAppContext()

  return (
    <MuiThemeProvider
      theme={getTheme(settings.theme, containerElement)}
      {...rest}>
      {children}
    </MuiThemeProvider>
  )
}
