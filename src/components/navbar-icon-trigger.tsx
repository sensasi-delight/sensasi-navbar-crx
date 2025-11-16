'use client'

import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import Box from '@mui/material/Box'
import { useAppContext } from '@/components/app-provider'

export default function NavbarIconTrigger({
  onTrigger,
}: {
  onTrigger: () => void
}) {
  const { settings } = useAppContext()

  const handleOnMouseEnter = (): void => {
    onTrigger()
  }

  return (
    <Box
      onMouseEnter={handleOnMouseEnter}
      padding={1}
      sx={theme => ({
        opacity: settings.iconOpacity,
        position: 'fixed',
        zIndex: theme.zIndex.appBar + 1,
      })}>
      <ExploreTwoToneIcon color="inherit" />
    </Box>
  )
}
