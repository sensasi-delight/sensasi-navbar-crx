import React from 'react'

import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// TODO: start addortment change to search icon when user try to search (not start with http:// or https://)
// import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'

export default function AddressBar (): JSX.Element {
  return (
    <TextField size='small' placeholder='Search or type a URL' fullWidth InputProps={{
      startAdornment: <InputAdornment position='start'><LanguageIcon /></InputAdornment>
    }} />
  )
}
