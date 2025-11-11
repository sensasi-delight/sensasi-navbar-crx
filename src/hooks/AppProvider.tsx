// types

import type { ReactNode } from 'react'
// vendors
import { createContext, useContext, useEffect, useState } from 'react'
import type { Settings } from '../types/Settings'
import type { AppContextType } from './AppContext.type'

const DEFAULT_VALUE: Settings = {
  theme: 'dark',
  isAutoHide: true,
}

const AppContext = createContext<AppContextType>({
  settings: DEFAULT_VALUE,
  setSettings: () => {},
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
          theme: newSettings.theme,
          isAutoHide: newSettings.isAutoHide,
        },
      },
      () => {},
    )
  }

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => useContext(AppContext)
