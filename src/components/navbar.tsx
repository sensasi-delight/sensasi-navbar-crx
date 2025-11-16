// materials
import Stack from '@mui/material/Stack'
// vendors
import { useEffect, useEffectEvent, useState } from 'react'
// components
import AddressBar from '@/components/navbar-components/address-bar'
import NavbarAutoHideWrapper from '@/components/navbar-components/auto-hide-wrapper'
import HotkeysDialog from '@/components/navbar-components/hotkeys-dialog'
import NavButtons from '@/components/navbar-components/nav-buttons'
import OptionsMenu from '@/components/navbar-components/options-menu'
import TabsBar from '@/components/navbar-components/tabs-bar'

export default function Navbar() {
  const [isHotkeysOpen, setIsHotkeysOpen] = useState(false)

  const handleKeyPress = useEffectEvent((event: KeyboardEvent): void => {
    if (event.ctrlKey && event.key === '/') {
      event.preventDefault()
      setIsHotkeysOpen(true)
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      <NavbarAutoHideWrapper>
        <TabsBar />

        <Stack alignItems="center" direction="row" whiteSpace="nowrap">
          <NavButtons />
          <AddressBar />
          <OptionsMenu onShowHotkeys={() => setIsHotkeysOpen(true)} />
        </Stack>
      </NavbarAutoHideWrapper>

      <HotkeysDialog
        onClose={() => setIsHotkeysOpen(false)}
        open={isHotkeysOpen}
      />
    </>
  )
}
