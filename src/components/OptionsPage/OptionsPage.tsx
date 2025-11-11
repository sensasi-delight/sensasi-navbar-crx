import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { useAppContext } from '../../hooks/AppProvider'
import getTheme from '../../utils/getTheme'
import OptionsForm from './Form'

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

export default function OptionsPage(): ReactNode {
  const { settings } = useAppContext()

  return (
    <ThemeProvider theme={getTheme(settings.theme)}>
      {mainContent}
    </ThemeProvider>
  )
}
