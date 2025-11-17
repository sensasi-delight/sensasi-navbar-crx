import type Hotkey from '@/types/hotkey'

const HOTKEYS_DATA: Hotkey[] = [
    {
        category: 'general',
        description: 'Show or focus navigation bar',
        keys: 'F6',
    },
    {
        category: 'general',
        description: 'Show hotkeys reference',
        keys: 'ctrl + /',
    },
    {
        category: 'tabs',
        description: 'Open new tab',
        keys: 'ctrl + T',
    },
    {
        category: 'tabs',
        description: 'Close current tab',
        keys: 'ctrl + W',
    },
    {
        category: 'tabs',
        description: 'Reopen closed tab',
        keys: 'ctrl + shift + T',
    },
    {
        category: 'tabs',
        description: 'Next tab',
        keys: 'ctrl + tab',
    },
    {
        category: 'tabs',
        description: 'Previous tab',
        keys: 'ctrl + shift + tab',
    },
    {
        category: 'tabs',
        description: 'Jump to specific tab',
        keys: 'ctrl + 1-8',
    },
    {
        category: 'tabs',
        description: 'Jump to last tab',
        keys: 'ctrl + 9',
    },
]

export default HOTKEYS_DATA
