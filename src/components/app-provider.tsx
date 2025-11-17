import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type Settings from '@/types/settings'

const DEFAULT_VALUE: Settings = {
    iconOpacity: 0.5,
    theme: 'dark',
}

const AppContext = createContext<AppContextType>({
    setSettings: () => {},
    settings: DEFAULT_VALUE,
})

export default function AppProvider({
    children,
}: {
    children: ReactNode
}): ReactNode {
    const [settings, setSettingsState] = useState<Settings>(DEFAULT_VALUE)

    useEffect(() => {
        chrome.storage.sync.get<{
            settings?: Settings
        }>('settings', ({ settings }) => {
            if (settings) {
                setSettingsState(settings)
            }
        })

        function handleChanges(
            changes: {
                [key: string]: chrome.storage.StorageChange
            },
            area: chrome.storage.AreaName,
        ): void {
            if (area === 'sync' && changes.settings?.newValue !== undefined) {
                setSettingsState(changes.settings.newValue as Settings)
            }
        }

        chrome.storage.onChanged.addListener(handleChanges)

        return () => {
            chrome.storage.onChanged.removeListener(handleChanges)
        }
    }, [])

    const setSettings = (newSettings: Settings): void => {
        chrome.storage.sync.set(
            {
                settings: newSettings,
            },
            () => {},
        )
    }

    return (
        <AppContext.Provider value={{ setSettings, settings }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextType => useContext(AppContext)

interface AppContextType {
    settings: Settings
    setSettings: (settings: Settings) => void
}
