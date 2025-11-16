// icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
// materials
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
// vendors
import { type MouseEvent, useState } from 'react'
// components
import OptionsForm from '@/components/options-page-components/form'

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
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
        disablePortal
        onClose={handleClose}
        open={open}
        slotProps={{
          list: {
            component: 'div',
            sx: {
              padding: '1rem 1.5rem',
            },
          },
        }}>
        <OptionsForm />
      </Menu>
    </div>
  )
}
