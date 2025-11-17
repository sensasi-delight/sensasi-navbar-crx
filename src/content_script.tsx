// vendors
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// component
import AppProvider from '@/components/app-provider'
import Navbar from '@/components/navbar'
import ThemeProvider from '@/components/theme-provider'

const rootElement = document.createElement('div')
rootElement.id = 'sensasi-navbar-root'
document.body.insertAdjacentElement('beforebegin', rootElement)

const shadowContainer = rootElement.attachShadow({ mode: 'open' })
const shadowRootElement = document.createElement('div')

shadowContainer.appendChild(shadowRootElement)

createRoot(shadowRootElement).render(
    <StrictMode>
        <CacheProvider
            value={createCache({
                container: shadowContainer,
                key: 'sensasi-navbar-css',
                prepend: true,
            })}>
            <ThemeProvider containerElement={shadowRootElement}>
                <AppProvider>
                    <Navbar />
                </AppProvider>
            </ThemeProvider>
        </CacheProvider>
    </StrictMode>,
)
