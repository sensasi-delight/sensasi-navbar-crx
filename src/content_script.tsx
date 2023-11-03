// types
import type { ReactElement } from 'react'
// vendors
import React from 'react'
import { createRoot } from 'react-dom/client'
// materials
import { ThemeProvider } from '@mui/material/styles'
// etc
import AppProvider, { useAppContext } from './hooks/AppProvider'
import getTheme from './utils/getTheme'
import Navbar from './components/Navbar'

function Main(): ReactElement {
  const { settings } = useAppContext()

  return (
    <ThemeProvider theme={getTheme(settings.theme)}>
      <Navbar />
    </ThemeProvider>
  )
}

const rootEl = document.createElement('div')
rootEl.id = 'sensasi-navbar-root'
document.body.prepend(rootEl)

createRoot(rootEl).render(
  <React.StrictMode>
    <AppProvider>
      <Main />
    </AppProvider>
  </React.StrictMode>,
)
