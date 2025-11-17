'use client'

import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import { useDebounce } from '@uidotdev/usehooks'
import type { HTMLAttributes } from 'react'
import { useEffect, useEffectEvent, useState } from 'react'
import AddressBarTextfield from '@/components/navbar-components/address-bar-components/text-field'
import isValidUrl from '@/utils/is-valid-url'
import sendToBgScript from '@/utils/send-to-bg-script'

export default function AddressBar() {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<
        chrome.history.HistoryItem[]
    >([])

    const updateSuggestions = useEffectEvent((query: string): void => {
        sendToBgScript(
            'getHistorySuggestions',
            {
                text: location.href === query ? '' : query,
            },
            (response: chrome.history.HistoryItem[]) => {
                setSuggestions(response)
            },
        )
    })

    const debouncedSearchTerm = useDebounce(value, 300)

    useEffect(() => {
        updateSuggestions(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <Autocomplete
            defaultValue={{
                id: '',
                url: location.href,
            }}
            disableClearable
            freeSolo
            getOptionLabel={option =>
                typeof option === 'string' ? option : (option.url as string)
            }
            onChange={HANDLE_AUTOCOMPLETE_CHANGE}
            onInputChange={(_, newValue) => {
                setValue(newValue)
            }}
            openOnFocus={true}
            options={suggestions}
            renderInput={params => (
                <AddressBarTextfield {...params} value={value} />
            )}
            renderOption={HANDLE_RENDER_OPTION}
            size="small"
            slotProps={{
                popper: {
                    sx: {
                        zIndex: 99999,
                    },
                },
            }}
            sx={{
                '& .MuiInputBase-root': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                },
                flexGrow: 1,
            }}
        />
    )
}

const HANDLE_AUTOCOMPLETE_CHANGE = (
    _: unknown,
    newValue: string | chrome.history.HistoryItem,
): void => {
    if (typeof newValue === 'string') {
        if (isValidUrl(newValue)) {
            location.href = newValue
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
) => (
    <li
        {...props}
        key={option.id}
        style={{
            whiteSpace: 'nowrap',
        }}>
        <div>
            <Typography component="span" variant="body2">
                {option.title}
            </Typography>
            <Typography component="span" variant="caption">
                {' - '}
            </Typography>
            <Typography color="info.main" component="span" variant="caption">
                {option.url}
            </Typography>
        </div>
    </li>
)
