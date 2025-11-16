// materials
import Stack from '@mui/material/Stack'
// components
import AddressBar from '@/components/navbar-components/address-bar'
import NavbarAutoHideWrapper from '@/components/navbar-components/auto-hide-wrapper'
import NavButtons from '@/components/navbar-components/nav-buttons'
import OptionsMenu from '@/components/navbar-components/options-menu'
import TabsBar from '@/components/navbar-components/tabs-bar'

export default function Navbar() {
  return (
    <NavbarAutoHideWrapper>
      <TabsBar />

      <Stack alignItems="center" direction="row" whiteSpace="nowrap">
        <NavButtons />
        <AddressBar />
        <OptionsMenu />
      </Stack>
    </NavbarAutoHideWrapper>
  )
}
