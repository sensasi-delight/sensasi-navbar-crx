import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useAppContext } from '@/components/app-provider'
import OptionsForm from '@/components/options-page-components/form'
import getTheme from '@/utils/get-theme'

export default function OptionsPage() {
  const { settings } = useAppContext()

  return (
    <div style={{ padding: '1rem' }}>
      <ThemeProvider theme={getTheme(settings.theme)}>
        <CssBaseline />
        <OptionsForm />
      </ThemeProvider>
    </div>
  )
}
