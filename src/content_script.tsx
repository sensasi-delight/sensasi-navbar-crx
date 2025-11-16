// vendors
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
// hooks
import AppProvider from './components/app-provider'
// component
import Navbar from './components/navbar'
import ThemeProvider from './components/theme-provider'

function initializeApp(): void {
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
