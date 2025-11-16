import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type Settings from '@/types/settings'

const DEFAULT_VALUE: Settings = {
  isAutoHide: true,
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
    chrome.storage.sync.get('settings', ({ settings }) => {
      if (settings !== undefined) {
        setSettingsState(settings)
      }
    })

    function handleChanges(
      changes: Record<string, chrome.storage.StorageChange>,
      area: 'sync' | 'local' | 'managed' | 'session',
    ): void {
      if (area === 'sync' && changes.settings?.newValue !== undefined) {
        setSettingsState(changes.settings.newValue)
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
        settings: {
          isAutoHide: newSettings.isAutoHide,
          theme: newSettings.theme,
        },
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
