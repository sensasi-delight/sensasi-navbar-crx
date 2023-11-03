// types
import type { ReactElement, ReactNode } from 'react'
// vendors
import React from 'react'
// materials
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
// components
import AddressBar from './Navbar/AddressBar'
import NavButtons from './Navbar/NavButtons'
import TabsBar from './Navbar/TabsBar'
// etc
import { useAppContext } from '../hooks/AppProvider'
import NavbarAutoHideWrapper from './Navbar/AutoHideWrapper'

function NavbarWrapper({ children }: { children: ReactNode }): ReactElement {
  const { settings } = useAppContext()
  const { isAutoHide } = settings

  if (isAutoHide) {
    return <NavbarAutoHideWrapper>{children}</NavbarAutoHideWrapper>
  }

  return (
    <Paper
      style={{
        padding: '1rem',
        boxShadow: 'none',
      }}
      square={true}>
      <Container maxWidth="sm">{children}</Container>
    </Paper>
  )
}

export default function Navbar(): ReactElement {
  return (
    <NavbarWrapper>
      <TabsBar />

      <div
        style={{
          display: 'flex',
        }}>
        <NavButtons />
        <AddressBar />
      </div>
    </NavbarWrapper>
  )
}
