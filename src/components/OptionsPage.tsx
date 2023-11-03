import type { ReactNode } from 'react'

import React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import OptionsForm from './OptionsPage/Form'
import { useAppContext } from '../hooks/AppProvider'
import getTheme from '../utils/getTheme'

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
