import React, { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

// utils
import { convertToHttps } from '../../utils/convertToHttps'
// materials
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
// icons
import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
// components
import BookmarkButton from './BookmarkButton'
import { Autocomplete } from '@mui/material'

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

interface Suggestions {
  url: string
  title: string
}

export default function AddressBar(): React.ReactElement {
  const [value, setValue] = useState('')
  const debouncedSearchTerm = useDebounce(value, 300)
  const [suggestions, setSuggestions] = useState<Suggestions[] | null>(null)

  const isUrl = URL_REGEX.test(value)

  useEffect(() => {
    if (typeof debouncedSearchTerm === 'string') {
      chrome.runtime.sendMessage(
        { action: 'getHistorySuggestions', query: debouncedSearchTerm },
        (historyItems: any[]) => {
          if (typeof historyItems === 'undefined') return

          const newSuggestions = historyItems.map((item: Suggestions) => {
            return {
              url: item.url,
              title: item.title,
            }
          })

          setSuggestions(newSuggestions)
        },
      )
    }
  }, [debouncedSearchTerm])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        if (isUrl) {
          location.href = convertToHttps(value)
        } else {
          location.href = `https://www.google.com/search?q=${value}`
        }
      }}>
      <Autocomplete
        fullWidth
        options={suggestions ?? []}
        onChange={(e: any, newValue: Suggestions | null) => {
          if (newValue?.url == null) return
          location.href = newValue.url
        }}
        getOptionLabel={option => {
          return `${option.title} - ${option.url}`
        }}
        renderInput={(params: any) => {
          return (
            <TextField
              {...params}
              value={value}
              onChange={handleInputChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    {isUrl ? <LanguageIcon /> : <SearchIcon />}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <BookmarkButton />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: '2rem',
                },
              }}
            />
          )
        }}
      />
    </form>
  )
}
