// materials
import LinearProgress from '@mui/material/LinearProgress'
// vendors
import { Activity, useEffect, useEffectEvent, useRef, useState } from 'react'
// utils
import sendToBgScript from '@/utils/send-to-bg-script'

interface LoadingIndicatorProps {
    tabId?: number
}

export default function LoadingIndicator({ tabId }: LoadingIndicatorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const intervalId = useRef<NodeJS.Timeout | null>(null)

    const pollLoadingStatus = () => {
        if (!tabId) return

        sendToBgScript('getTabLoadingStatus', { tabId }, response => {
            setIsLoading(response.loading)

            // Stop polling when loading finished
            if (!response.loading && intervalId.current) {
                clearInterval(intervalId.current)
                intervalId.current = null
            }
        })
    }

    const checkLoadingStatus = useEffectEvent(() => {
        if (!tabId) return

        sendToBgScript('getTabLoadingStatus', { tabId }, response => {
            setIsLoading(response.loading)

            // If loading started, start polling
            if (response.loading && !intervalId.current) {
                intervalId.current = setInterval(pollLoadingStatus, 100)
            }
        })
    })

    // Listen for navigation events
    const handleBeforeUnload = useEffectEvent(() => {
        setIsLoading(true)
        checkLoadingStatus()
    })

    // Listen for popstate (back/forward navigation)
    const handlePopState = useEffectEvent(() => {
        setIsLoading(true)
        checkLoadingStatus()
    })

    useEffect(() => {
        if (!tabId) return

        // Check initial status
        checkLoadingStatus()

        window.addEventListener('beforeunload', handleBeforeUnload)
        window.addEventListener('popstate', handlePopState)

        // Also check on visibility change (tab switch back)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkLoadingStatus()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            if (intervalId.current) clearInterval(intervalId.current)
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('popstate', handlePopState)
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            )
        }
    }, [tabId])

    return (
        <Activity mode={isLoading ? 'visible' : 'hidden'}>
            <LinearProgress
                sx={{
                    height: '2px',
                    left: 0,
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    zIndex: 1,
                }}
            />
        </Activity>
    )
}
