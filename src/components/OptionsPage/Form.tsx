import React from 'react'
// materials
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import { useAppContext } from '../../hooks/AppProvider'

export default function OptionsForm(): React.ReactElement {
  const { settings, setSettings } = useAppContext()

  return (
    <form>
      <FormGroup>
        <FormControlLabel
          onClick={event => {
            event.preventDefault()
            setSettings({
              ...settings,
              theme: settings.theme === 'dark' ? 'light' : 'dark',
            })
          }}
          control={<Switch checked={settings.theme === 'dark'} />}
          label="Dark Mode"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          onClick={event => {
            event.preventDefault()

            setSettings({
              ...settings,
              isAutoHide: !settings.isAutoHide,
            })
          }}
          control={<Switch checked={settings.isAutoHide} />}
          label="Auto Hide"
        />
      </FormGroup>
    </form>
  )
}
