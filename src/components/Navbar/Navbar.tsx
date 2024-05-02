// types
import type { ReactElement, ReactNode } from 'react'
// vendors
import React from 'react'
// materials
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
// components
import AddressBar from './AddressBar'
import NavButtons from './NavButtons'
import OptionsMenu from './OptionsMenu'
import TabsBar from './TabsBar'
// etc
import { useAppContext } from '../../hooks/AppProvider'
import NavbarAutoHideWrapper from './AutoHideWrapper'

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
        minWidth: '20em',
        zIndex: 99999,
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

      <Stack direction="row" whiteSpace="nowrap" alignItems="center">
        <NavButtons />
        <AddressBar />
        <OptionsMenu />
      </Stack>
    </NavbarWrapper>
  )
}
