// types
import type { CSSProperties, ReactElement } from 'react'
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
// vendors
import React from 'react'
// materials
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
// icons
import GoogleIcon from '@mui/icons-material/Google'
import LanguageIcon from '@mui/icons-material/Language'
// components
// import BookmarkButton from './BookmarkButton'
// utils
import isHrefable from '../../../utils/isHrefable'

const ADDORNMENT_ICON_SYTLE: CSSProperties = {
  fontSize: '1em',
}

export default function AddressBarTextfield(
  props: AutocompleteRenderInputParams & { value: string; loading: boolean },
): ReactElement {
  const { loading, ...rest } = props

  return (
    <TextField
      {...rest}
      InputProps={{
        ...rest.InputProps,
        startAdornment: (
          <InputAdornment
            position="start"
            style={{
              marginLeft: '0.2em',
              opacity: 0.5,
            }}>
            {isHrefable(rest.value) ? (
              <LanguageIcon style={ADDORNMENT_ICON_SYTLE} />
            ) : (
              <GoogleIcon style={ADDORNMENT_ICON_SYTLE} />
            )}
          </InputAdornment>
        ),

        // TODO: fix bookmark button, disabled for now
        // endAdornment: (
        //   <InputAdornment position="end">
        //     <BookmarkButton />
        //   </InputAdornment>
        // ),

        endAdornment: (
          <InputAdornment position="end">
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
          </InputAdornment>
        ),
        inputProps: {
          ...rest.inputProps,
          style: {
            padding: '.2em 0',
            fontSize: '.85em',
          },
        },
        style: {
          borderRadius: '2rem',
        },
      }}
    />
  )
}
