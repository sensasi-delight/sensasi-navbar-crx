// types
import type ActionPayload from './types/ActionPayload'

chrome.runtime.onMessage.addListener(
  (message: ActionPayload, sender, sendResponse) => {
    if (message.action === 'getHistorySuggestions') {
      chrome.history.search(
        { text: message.data.query ?? '', maxResults: 10 },
        sendResponse,
      )
    }

    return true
  },
)
