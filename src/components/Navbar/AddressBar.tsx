// types
import type { HTMLAttributes, ReactElement } from 'react'
// vendors
import React, { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
// materials
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
// components
import AddressBarTextfield from './AddressBar/TextField'
// utils
import { convertToHttps } from '../../utils/convertToHttps'
import isHrefable from '../../utils/isHrefable'
import sendToBgScript from '../../utils/sendToBgScript'

export default function AddressBar(): ReactElement {
  const [value, setValue] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<chrome.history.HistoryItem[]>(
    [],
  )

  const debouncedSearchTerm = useDebounce(value, 300)

  useEffect(() => {
    updateSuggestions(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true)
    }
  }, [value])

  const updateSuggestions = useCallback((query = ''): void => {
    sendToBgScript(
      'getHistorySuggestions',
      {
        text: location.href === query ? '' : query,
      },
      (response: chrome.history.HistoryItem[]) => {
        setSuggestions(response)
        setIsLoading(false)
      },
    )
  }, [])

  return (
    <Autocomplete
      slotProps={{
        popper: {
          sx: {
            zIndex: 99999,
          },
        },
      }}
      sx={{
        flexGrow: 1,
        '& .MuiInputBase-root': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      }}
      freeSolo
      disableClearable
      size="small"
      onChange={HANDLE_AUTOCOMPLETE_CHANGE}
      renderOption={HANDLE_RENDER_OPTION}
      options={suggestions}
      openOnFocus={true}
      defaultValue={{
        id: '',
        url: location.href,
      }}
      onInputChange={(event, newValue) => {
        setValue(newValue)
      }}
      getOptionLabel={option =>
        typeof option === 'string' ? option : (option.url as string)
      }
      renderInput={params => (
        <AddressBarTextfield {...params} value={value} loading={isLoading} />
      )}
    />
  )
}

const HANDLE_AUTOCOMPLETE_CHANGE = (
  _: any,
  newValue: NonNullable<string | chrome.history.HistoryItem>,
): void => {
  if (typeof newValue === 'string') {
    if (isHrefable(newValue)) {
      location.href = convertToHttps(newValue)
    } else {
      location.href = `https://google.com/search?q=${newValue}`
    }
  } else {
    if (newValue.url !== undefined) {
      location.href = newValue.url
    }
  }
}

const HANDLE_RENDER_OPTION = (
  props: HTMLAttributes<HTMLLIElement>,
  option: chrome.history.HistoryItem,
): ReactElement => (
  <li
    {...props}
    style={{
      whiteSpace: 'nowrap',
    }}>
    <div>
      <Typography component="span" variant="body2">
        {option.title}
      </Typography>
      <Typography variant="caption" component="span">
        {' - '}
      </Typography>
      <Typography color="info.main" variant="caption" component="span">
        {option.url}
      </Typography>
    </div>
  </li>
)
