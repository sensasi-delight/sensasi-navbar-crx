// materials
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { ReactNode } from 'react'
// components
import { useAppContext } from '@/components/app-provider'
import AddressBar from '@/components/navbar-components/address-bar'
import NavbarAutoHideWrapper from '@/components/navbar-components/auto-hide-wrapper'
import NavButtons from '@/components/navbar-components/nav-buttons'
import OptionsMenu from '@/components/navbar-components/options-menu'
import TabsBar from '@/components/navbar-components/tabs-bar'

function NavbarWrapper({ children }: { children: ReactNode }) {
  const { settings } = useAppContext()
  const { isAutoHide } = settings

  if (isAutoHide) {
    return <NavbarAutoHideWrapper>{children}</NavbarAutoHideWrapper>
  }

  return (
    <Paper
      square={true}
      style={{
        boxShadow: 'none',
        minWidth: '20em',
        padding: '1rem',
        zIndex: 99999,
      }}>
      <Container maxWidth="sm">{children}</Container>
    </Paper>
  )
}

export default function Navbar() {
  return (
    <NavbarWrapper>
      <TabsBar />

      <Stack alignItems="center" direction="row" whiteSpace="nowrap">
        <NavButtons />
        <AddressBar />
        <OptionsMenu />
      </Stack>
    </NavbarWrapper>
  )
}
