import {
  ThemeProvider as MuiThemeProvider,
  type ThemeProviderProps,
} from '@mui/material/styles'
import { useAppContext } from '@/components/app-provider'
import getTheme from '@/utils/get-theme'

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
