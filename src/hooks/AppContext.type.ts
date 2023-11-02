import type { Settings } from '../types/Settings'

export interface AppContextType {
  settings: Settings
  setSettings: (settings: Settings) => void
}
