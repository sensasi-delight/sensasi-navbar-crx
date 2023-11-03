// types
import type { ReactElement, ReactNode } from 'react'
// vendors
import React, { useEffect, useState, memo } from 'react'
// materials
import Dialog from '@mui/material/Dialog'
import Grow from '@mui/material/Grow'

function NavbarAutoHideWrapper({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      if (event.clientY === 0 && !isShow) {
        setIsShow(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="sm"
      sx={{
        minWidth: '20em',
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
        },
      }}
      PaperProps={{
        sx: {
          m: 2,
          p: '1rem',
        },
      }}
      open={isShow}
      onClose={() => {
        setIsShow(false)
      }}
      TransitionComponent={Grow}
      TransitionProps={{
        style: {
          transformOrigin: 'center -5rem',
        },
      }}>
      {children}
    </Dialog>
  )
}

export default memo(NavbarAutoHideWrapper)
