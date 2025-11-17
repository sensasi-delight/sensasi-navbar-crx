import type ActionPayload from '@/types/action-payload'

export default function sendToBgScript<Action extends ActionPayload['action']>(
    action: Action,
    data: ActionPayload['data'] = undefined,
    callback: (response: CallbackResponse<Action>) => void = () => {},
): void {
    if (chrome.runtime.id !== undefined) {
        chrome.runtime.sendMessage(
            {
                action,
                data,
            },
            callback,
        )
    }
}

interface CallbackResponseMap {
    getSelfInfo: chrome.runtime.MessageSender
    getTabs: chrome.tabs.Tab[]
    newTab: chrome.tabs.Tab
    removeTab: undefined
    setActiveTab: chrome.tabs.Tab
    getHistorySuggestions: chrome.history.HistoryItem[]
    getTabLoadingStatus: { loading: boolean }
}

type CallbackResponse<T extends ActionPayload['action']> =
    T extends keyof CallbackResponseMap ? CallbackResponseMap[T] : never
