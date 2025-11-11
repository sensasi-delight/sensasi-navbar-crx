// types

// materials
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { ReactElement, ReactNode } from 'react'
// etc
import { useAppContext } from '../../hooks/AppProvider'
// components
import AddressBar from './AddressBar'
import NavbarAutoHideWrapper from './AutoHideWrapper'
import NavButtons from './NavButtons'
import OptionsMenu from './OptionsMenu'
import TabsBar from './TabsBar'

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
