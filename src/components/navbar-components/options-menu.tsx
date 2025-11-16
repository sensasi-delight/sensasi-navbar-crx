// vendors

// icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
// materials
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import React from 'react'
// hooks
import { useAppContext } from '../app-provider'

export default function OptionsMenu() {
  const { settings, setSettings } = useAppContext()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        disablePortal
        onClose={handleClose}
        sx={{
          minWidth: '10em',
          '& li': {
            justifyContent: 'space-between',
          },
        }}>
        <MenuItem
          dense
          onClick={() => {
            setSettings({
              ...settings,
              theme: settings.theme === 'dark' ? 'light' : 'dark',
            })
          }}>
          <ListItemText>Dark Mode</ListItemText>
          <Switch checked={settings.theme === 'dark'} size="small" />
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            setSettings({
              ...settings,
              isAutoHide: !settings.isAutoHide,
            })
          }}>
          <ListItemText>Auto Hide</ListItemText>
          <Switch checked={settings.isAutoHide} size="small" />
        </MenuItem>
        <Divider />
        <MenuItem
          dense
          href="https://support.google.com/chrome/answer/157179"
          target="_blank"
          component="a">
          <ListItemText>HotKeys</ListItemText>
          <OpenInNewIcon fontSize="small" />
        </MenuItem>
      </Menu>
    </div>
  )
}
