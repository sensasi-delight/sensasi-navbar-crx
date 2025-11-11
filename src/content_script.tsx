// vendors
import { createRoot } from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import React from 'react'
// component
import Navbar from './components/Navbar'
import ThemeProvider from './components/ThemeProvider'
// hooks
import AppProvider from './hooks/AppProvider'

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
