// vendors

// materials
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Switch from '@mui/material/Switch'
import type React from 'react'
// etc
import { useAppContext } from '@/components/app-provider'

export default function OptionsForm(): React.ReactElement {
  const { settings, setSettings } = useAppContext()

  return (
    <form>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={settings.theme === 'dark'} />}
          label="Dark Mode"
          onClick={event => {
            event.preventDefault()
            setSettings({
              ...settings,
              theme: settings.theme === 'dark' ? 'light' : 'dark',
            })
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={settings.isAutoHide} />}
          label="Auto Hide"
          onClick={event => {
            event.preventDefault()

            setSettings({
              ...settings,
              isAutoHide: !settings.isAutoHide,
            })
          }}
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
