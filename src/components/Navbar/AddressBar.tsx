import React, { useState } from 'react'

import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// TODO: start addortment change to search icon when user try to search (not start with http:// or https://)
// TODO: is posible add bookmark button

import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { IconButton, Stack } from '@mui/material'

export default function AddressBar(): React.ReactElement {
  const [value, setValue] = useState('')
  const isSearchInput =
    !value.startsWith('http://') && !value.startsWith('https://')

  return (
    <Stack direction="row" useFlexGap style={{ gap: '.5rem' }}>
      <TextField
        size="small"
        placeholder="Search or type a URL"
        fullWidth
        onChange={e => {
          setValue(e.target.value)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isSearchInput ? <SearchIcon /> : <LanguageIcon />}
            </InputAdornment>
          ),
          style: {
            colorScheme: 'inherit',
            borderRadius: '2rem',
          },
        }}
      />
      <IconButton aria-label="delete">
        <BookmarkBorderIcon />
      </IconButton>
    </Stack>
  )
}
