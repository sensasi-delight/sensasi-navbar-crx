// types
import type { ReactElement } from 'react'
// vendors
import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import React from 'react'
// materials
import { ThemeProvider } from '@mui/material/styles'
// component
import Navbar from './components/Navbar'
// hooks
import AppProvider, { useAppContext } from './hooks/AppProvider'
// utils
import getTheme from './utils/getTheme'

function Main(): ReactElement {
  const { settings } = useAppContext()

  return (
    <ThemeProvider theme={getTheme(settings.theme, shadowRootElement)}>
      <Navbar />
    </ThemeProvider>
  )
}

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://f02bd0f29c0c6074f76bf383da2f6b2c@o1289319.ingest.us.sentry.io/4507187102613504',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  })
}

const rootEl = document.createElement('div')
rootEl.id = 'sensasi-navbar-root'
document.body.insertAdjacentElement('beforebegin', rootEl)

const shadowContainer = rootEl.attachShadow({ mode: 'open' })
const shadowRootElement = document.createElement('div')
shadowContainer.appendChild(shadowRootElement)

createRoot(shadowRootElement).render(
  <React.StrictMode>
    <AppProvider>
      <CacheProvider
        value={createCache({
          key: 'sensasi-navbar-css',
          prepend: true,
          container: shadowContainer,
        })}>
        <Main />
      </CacheProvider>
    </AppProvider>
  </React.StrictMode>,
)
