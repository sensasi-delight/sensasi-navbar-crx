// vendors
import React, { useEffect, useState } from 'react'
// materials
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
// icons
import PublicIcon from '@mui/icons-material/Public'
import AddIcon from '@mui/icons-material/Add'
// utils
import sendToBgScript from '../../utils/sendToBgScript'

export default function TabsBar(): React.ReactElement {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([])
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
      mb={1}
      mr={2}
      pr={2}
      gap={0.5}
      direction="row"
      whiteSpace="nowrap"
      alignItems="center"
      sx={TABS_ROOT_SX}>
      {tabs.map(tab => {
        if (tab.title === undefined) return undefined

        return (
          <Chip
            size="small"
            sx={{
              minWidth: '8em',
              textOverflow: 'ellipsis',
            }}
            key={tab.id}
            label={tab.title}
            color={tab.id === thisTabId ? 'primary' : undefined}
            avatar={
              <Avatar alt={tab.title} src={tab.favIconUrl}>
                <PublicIcon />
              </Avatar>
            }
            onClick={() => {
              sendToBgScript('setActiveTab', { tabId: tab.id ?? 0 })
            }}
            onDelete={() => {
              sendToBgScript('removeTab', { tabId: tab.id ?? 0 }, () => {
                setTabs(prev => prev.filter(prevTab => prevTab.id !== tab.id))
              })
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
          size="small"
          sx={{
            p: '1px',
          }}
          onClick={() => {
            sendToBgScript('newTab')
          }}>
          <AddIcon />
        </IconButton>
      </Box>
    </Stack>
  )
}

const TABS_ROOT_SX = {
  overflowX: 'auto',

  scrollbarColor: 'initial',

  '::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '5px',
    backgroundColor: 'rgba(128,128,128,0.5)',

    '&:hover': {
      backgroundColor: 'rgba(128,128,128,0.7)',
    },
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(128,128,128,0.1)',

    '&:hover': {
      backgroundColor: 'rgba(128,128,128,0.2)',
    },
  },
}
