// types

// icons
import RefreshIcon from '@mui/icons-material/Refresh'
import IconButton from '@mui/material/IconButton'
import type { ReactElement } from 'react'
// components
import NavButton from './NavButton'

export default function NavButtons(): ReactElement {
  return (
    <div
      style={{
        marginRight: '1em',
      }}>
      <NavButton variant="back" />
      <NavButton variant="forward" />

      <IconButton
        size="small"
        onClick={() => {
          location.reload()
        }}>
        <RefreshIcon />
      </IconButton>
    </div>
  )
}
