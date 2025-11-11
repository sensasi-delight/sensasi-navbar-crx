import React from 'react'
import { createRoot } from 'react-dom/client'
import OptionsPage from './components/OptionsPage'
import AppProvider from './hooks/AppProvider'

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
