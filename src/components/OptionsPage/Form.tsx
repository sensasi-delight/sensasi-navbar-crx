// vendors
import React from 'react'
// materials
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Switch from '@mui/material/Switch'
// etc
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

        {settings.isAutoHide && (
          <FormHelperText>
            *Move your mouse to the top of the window to show the navbar.
          </FormHelperText>
        )}
      </FormGroup>
    </form>
  )
}
