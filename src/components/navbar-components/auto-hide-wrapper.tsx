'use client'

// materials
import Dialog from '@mui/material/Dialog'
import Grow from '@mui/material/Grow'
// vendors
import type { ReactNode } from 'react'
import { useEffect, useEffectEvent, useState } from 'react'
// components
import CompassIconTrigger from '../navbar-icon-trigger'

export default function NavbarAutoHideWrapper({
  children,
}: {
  children: ReactNode
}) {
  const [isShow, setIsShow] = useState(false)

  const handleF6Press = useEffectEvent((event: KeyboardEvent): void => {
    if (event.key === 'F6' && !isShow) {
      event.preventDefault()
      setIsShow(true)
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', handleF6Press)

    return () => {
      window.removeEventListener('keydown', handleF6Press)
    }
  }, [])

  return (
    <>
      <CompassIconTrigger
        onTrigger={() => {
          if (!isShow) {
            setIsShow(true)
          }
        }}
      />

      <Dialog
        fullWidth
        keepMounted
        maxWidth="sm"
        onClose={() => {
          setIsShow(false)
        }}
        open={isShow}
        slotProps={{
          paper: {
            sx: {
              m: 2,
              p: '1rem',
            },
          },
          transition: {
            style: {
              transformOrigin: 'center -5rem',
            },
          },
        }}
        slots={{
          transition: Grow,
        }}
        sx={theme => ({
          '& .MuiDialog-container': {
            alignItems: 'flex-start',
          },
          minWidth: '20em',
          zIndex: theme.zIndex.appBar + 1,
        })}>
        {children}
      </Dialog>
    </>
  )
}
