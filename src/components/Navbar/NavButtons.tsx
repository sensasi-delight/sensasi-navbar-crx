// types
import type { ReactElement } from 'react'
// vendors
import React from 'react'
import IconButton from '@mui/material/IconButton'
// icons
import RefreshIcon from '@mui/icons-material/Refresh'
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
