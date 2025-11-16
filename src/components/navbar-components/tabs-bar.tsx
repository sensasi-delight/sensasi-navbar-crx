// icons
import AddIcon from '@mui/icons-material/Add'
import PublicIcon from '@mui/icons-material/Public'
// materials
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
// vendors
import type React from 'react'
import { useEffect, useState } from 'react'
// utils
import sendToBgScript from '@/utils/send-to-bg-script'

export default function TabsBar(): React.ReactElement {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[] | undefined>()
  const [thisTabId, setThisTabId] = useState<number>()

  function getAndSetTabs(): void {
    sendToBgScript('getTabs', undefined, (response: chrome.tabs.Tab[]) => {
      setTabs(response)
    })
  }

  useEffect(() => {
    sendToBgScript(
      'getSelfInfo',
      undefined,
      (response: chrome.runtime.MessageSender) => {
        setThisTabId(response.tab?.id)
      },
    )
  }, [])

  useEffect(() => {
    getAndSetTabs()
  })

  return (
    <Stack
      alignItems="center"
      direction="row"
      gap={0.5}
      mb={1}
      mr={2}
      pr={2}
      sx={TABS_ROOT_SX}
      whiteSpace="nowrap">
      {tabs?.map(tab => {
        if (tab.title === undefined) return undefined

        return (
          <Chip
            avatar={
              <Avatar alt={tab.title} src={tab.favIconUrl}>
                <PublicIcon />
              </Avatar>
            }
            color={tab.id === thisTabId ? 'primary' : undefined}
            key={tab.id}
            label={tab.title}
            onClick={() => {
              sendToBgScript('setActiveTab', { tabId: tab.id ?? 0 })
            }}
            onDelete={() => {
              sendToBgScript('removeTab', { tabId: tab.id ?? 0 }, () => {
                setTabs(prev => prev?.filter(prevTab => prevTab.id !== tab.id))
              })
            }}
            size="small"
            sx={{
              minWidth: '8em',
              textOverflow: 'ellipsis',
            }}
          />
        )
      })}
      <Box
        sx={{
          backgroundColor: theme => theme.palette.background.default,
          backgroundImage: theme =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))'
              : undefined,
          borderBottomLeftRadius: '50%',
          borderTopLeftRadius: '50%',
          position: 'absolute',
          right: 16,
        }}>
        <IconButton
          onClick={() => {
            sendToBgScript('newTab')
          }}
          size="small"
          sx={{
            p: '1px',
          }}>
          <AddIcon />
        </IconButton>
      </Box>
    </Stack>
  )
}

const TABS_ROOT_SX = {
  '::-webkit-scrollbar': {
    height: '5px',
    width: '5px',
  },

  '::-webkit-scrollbar-thumb': {
    '&:hover': {
      backgroundColor: 'rgba(128,128,128,0.7)',
    },
    backgroundColor: 'rgba(128,128,128,0.5)',
    borderRadius: '5px',
  },

  '::-webkit-scrollbar-track': {
    '&:hover': {
      backgroundColor: 'rgba(128,128,128,0.2)',
    },
    backgroundColor: 'rgba(128,128,128,0.1)',
  },
  overflowX: 'auto',

  scrollbarColor: 'initial',
} as const
