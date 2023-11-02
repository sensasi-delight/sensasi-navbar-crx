import React, { useState } from 'react'
// materials
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
// icons
import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
// components
// import BookmarkButton from './BookmarkButton'

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export default function AddressBar(): React.ReactElement {
  const [value, setValue] = useState('')

  const isUrl = URL_REGEX.test(value)

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        if (isUrl) {
          location.href = value
        } else {
          location.href = `https://www.google.com/search?q=${value}`
        }
      }}>
      <TextField
        size="small"
        placeholder="Search or type a URL"
        fullWidth
        onChange={e => {
          // TODO: add suggestion
          setValue(e.target.value)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isUrl ? <LanguageIcon /> : <SearchIcon />}
            </InputAdornment>
          ),
          // TODO: add bookmark button (WIP)
          // endAdornment: (
          //   <InputAdornment position="end">
          //     <BookmarkButton />
          //   </InputAdornment>
          // ),
          style: {
            borderRadius: '2rem',
          },
        }}
      />
    </form>
  )
}
