import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from '@/components/app-provider'
import OptionsPage from '@/components/options-page'

const rootEl = document.getElementById('root')

if (rootEl === null) {
    throw new Error('root element not found')
}

createRoot(rootEl).render(
    <StrictMode>
        <AppProvider>
            <OptionsPage />
        </AppProvider>
    </StrictMode>,
)
