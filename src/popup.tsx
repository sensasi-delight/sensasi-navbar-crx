import React from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from './components/app-provider'
import OptionsPage from './components/options-page'

const rootEl = document.getElementById('root')
rootEl?.style.setProperty('width', '15rem')

if (rootEl === null) {
  throw new Error('root element not found')
}

createRoot(rootEl).render(
  <React.StrictMode>
    <AppProvider>
      <OptionsPage />
    </AppProvider>
  </React.StrictMode>,
)
