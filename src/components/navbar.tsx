// types

// materials
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { ReactNode } from 'react'
// etc
import { useAppContext } from './app-provider'
// components
import AddressBar from './navbar-components/address-bar'
import NavbarAutoHideWrapper from './navbar-components/auto-hide-wrapper'
import NavButtons from './navbar-components/nav-buttons'
import OptionsMenu from './navbar-components/options-menu'
import TabsBar from './navbar-components/tabs-bar'

function NavbarWrapper({ children }: { children: ReactNode }) {
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

export default function Navbar() {
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
