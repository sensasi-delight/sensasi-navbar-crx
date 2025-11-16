// icons
import GoogleIcon from '@mui/icons-material/Google'
import LanguageIcon from '@mui/icons-material/Language'
// materials
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
// vendors
import { useEffect, useEffectEvent } from 'react'
// utils
import isValidUrl from '@/utils/is-valid-url'

const ADORNMENT_ICON_STYLE = {
  fontSize: '1em',
} as const

export default function AddressBarTextfield(
  props: AutocompleteRenderInputParams & { value: string },
) {
  const handleF6Press = useEffectEvent((event: KeyboardEvent): void => {
    if (event.key === 'F6') {
      event.preventDefault()

      if (
        props.inputProps.ref !== null &&
        'current' in props.inputProps.ref &&
        props.inputProps.ref.current !== null
      ) {
        const inputEl = props.inputProps.ref.current

        setTimeout(() => {
          inputEl.focus()
        }, 200)
      }
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', handleF6Press)

    return () => {
      window.removeEventListener('keydown', handleF6Press)
    }
  })

  return (
    <TextField
      {...props}
      slotProps={{
        htmlInput: {
          ...props.inputProps,
          style: {
            fontSize: '.85em',
            padding: 0,
          },
        },
        input: {
          ...props.InputProps,

          // TODO: fix bookmark button, disabled for now
          // endAdornment: (
          //   <InputAdornment position="end">
          //     <BookmarkButton />
          //   </InputAdornment>
          // ),

          onFocus: event => {
            event.target.select()
          },
          startAdornment: (
            <InputAdornment
              position="start"
              style={{
                marginLeft: '0.2em',
                opacity: 0.5,
              }}>
              {isValidUrl(props.value) ? (
                <LanguageIcon style={ADORNMENT_ICON_STYLE} />
              ) : (
                <GoogleIcon style={ADORNMENT_ICON_STYLE} />
              )}
            </InputAdornment>
          ),
          style: {
            borderRadius: '2rem',
          },
        },
      }}
    />
  )
}
