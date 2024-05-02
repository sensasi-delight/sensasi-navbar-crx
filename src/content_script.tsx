// vendors
import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import React from 'react'
// component
import Navbar from './components/Navbar'
import ThemeProvider from './components/ThemeProvider'
// hooks
import AppProvider from './hooks/AppProvider'

function initializeSentry(): void {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: 'https://f02bd0f29c0c6074f76bf383da2f6b2c@o1289319.ingest.us.sentry.io/4507187102613504',
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
    })
  }
}

function initializeApp(): void {
  initializeSentry()

  const rootElement = document.createElement('div')
  rootElement.id = 'sensasi-navbar-root'
  document.body.insertAdjacentElement('beforebegin', rootElement)

  const shadowContainer = rootElement.attachShadow({ mode: 'open' })
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
          <ThemeProvider containerElement={shadowRootElement}>
            <Navbar />
          </ThemeProvider>
        </CacheProvider>
      </AppProvider>
    </React.StrictMode>,
  )
}

initializeApp()
