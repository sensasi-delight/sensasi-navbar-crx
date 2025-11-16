import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import getTheme from '../utils/get-theme'
import { useAppContext } from './app-provider'
import OptionsForm from './options-page-components/form'

const mainContent = (
  <>
    <CssBaseline />
    <div
      style={{
        margin: '1rem 1.5rem',
      }}>
      <CssBaseline />
      <OptionsForm />
    </div>
  </>
)

export default function OptionsPage() {
  const { settings } = useAppContext()

  return (
    <ThemeProvider theme={getTheme(settings.theme)}>
      {mainContent}
    </ThemeProvider>
  )
}
