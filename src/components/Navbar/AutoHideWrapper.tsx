// types

// materials
import Dialog from '@mui/material/Dialog'
import Grow from '@mui/material/Grow'
import type { ReactElement, ReactNode } from 'react'
// vendors
import { memo, useEffect, useState } from 'react'

let timeout: NodeJS.Timeout

function NavbarAutoHideWrapper({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        if (event.clientY === 0 && !isShow) {
          setIsShow(true)
        }
      }, 50)
    }

    const handleF6Press = (event: KeyboardEvent): void => {
      if (event.key === 'F6' && !isShow) {
        event.preventDefault()
        setIsShow(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleF6Press)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleF6Press)
    }
  }, [isShow])

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="sm"
      sx={{
        zIndex: 99999,
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
