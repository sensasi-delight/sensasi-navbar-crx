import type { AppContextType } from './AppContext.type'
import type { Settings } from '../types/Settings'
import type { ReactNode } from 'react'

import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext<AppContextType>({
  settings: {
    theme: 'dark',
    isAutoHide: true,
  },
  setSettings: () => {},
})

export default function AppProvider({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const [settings, setSettingsState] = useState<Settings>({
    theme: 'dark',
    isAutoHide: true,
  })

  useEffect(() => {
    chrome.storage.sync.get('settings', ({ settings }) => {
      setSettingsState(settings)
    })

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.settings?.newValue !== undefined) {
        setSettingsState(changes.settings.newValue)
      }
    })

    return () => {
      chrome.storage.onChanged.removeListener(() => {})
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
      () => 1212,
    )
  }

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => useContext(AppContext)
