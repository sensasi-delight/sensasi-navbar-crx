// materials
import Stack from '@mui/material/Stack'
// vendors
import { useEffect, useEffectEvent, useState } from 'react'
// components
import AddressBar from '@/components/navbar-components/address-bar'
import NavbarAutoHideWrapper from '@/components/navbar-components/auto-hide-wrapper'
import HotkeysDialog from '@/components/navbar-components/hotkeys-dialog'
import LoadingIndicator from '@/components/navbar-components/loading-indicator'
import NavButtons from '@/components/navbar-components/nav-buttons'
import OptionsMenu from '@/components/navbar-components/options-menu'
import TabsBar from '@/components/navbar-components/tabs-bar'
// utils
import sendToBgScript from '@/utils/send-to-bg-script'

export default function Navbar() {
    const [isHotkeysOpen, setIsHotkeysOpen] = useState(false)
    const [thisTabId, setThisTabId] = useState<number>()

    const handleKeyPress = useEffectEvent((event: KeyboardEvent): void => {
        if (event.ctrlKey && event.key === '/') {
            event.preventDefault()
            setIsHotkeysOpen(true)
        }
    })

    useEffect(() => {
        sendToBgScript(
            'getSelfInfo',
            undefined,
            (response: chrome.runtime.MessageSender) => {
                setThisTabId(response.tab?.id)
            },
        )
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    return (
        <>
            <LoadingIndicator tabId={thisTabId} />
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
