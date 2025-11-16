// icons
import KeyboardIcon from '@mui/icons-material/Keyboard'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// materials
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
// vendors
import { type MouseEvent, useState } from 'react'
// components
import OptionsForm from '@/components/options-page-components/form'

export default function OptionsMenu({
  onShowHotkeys,
}: {
  onShowHotkeys: () => void
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleShowHotkeys = (): void => {
    handleClose()
    onShowHotkeys()
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

        <Box
          sx={{
            borderTop: '1px solid',
            borderTopColor: 'divider',
            mt: 2,
            pt: 2,
          }}>
          <Button
            fullWidth
            onClick={handleShowHotkeys}
            size="small"
            startIcon={<KeyboardIcon />}
            variant="outlined">
            Keyboard Shortcuts
          </Button>
        </Box>
      </Menu>
    </div>
  )
}
