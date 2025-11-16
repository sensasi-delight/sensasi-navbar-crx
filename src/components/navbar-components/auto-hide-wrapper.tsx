'use client'

// materials
import Dialog from '@mui/material/Dialog'
import Grow from '@mui/material/Grow'
// vendors
import type { ReactNode } from 'react'
import { useEffect, useEffectEvent, useState } from 'react'

let timeout: NodeJS.Timeout

export default function NavbarAutoHideWrapper({
  children,
}: {
  children: ReactNode
}) {
  const [isShow, setIsShow] = useState(false)

  const handleMouseMove = useEffectEvent((event: MouseEvent): void => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      if (event.clientY === 0 && !isShow) {
        setIsShow(true)
      }
    }, 50)
  })

  const handleF6Press = useEffectEvent((event: KeyboardEvent): void => {
    if (event.key === 'F6' && !isShow) {
      event.preventDefault()
      setIsShow(true)
    }
  })

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleF6Press)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleF6Press)
    }
  }, [])

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="sm"
      onClose={() => {
        setIsShow(false)
      }}
      open={isShow}
      PaperProps={{
        sx: {
          m: 2,
          p: '1rem',
        },
      }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
        },
        minWidth: '20em',
        zIndex: 99999,
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
