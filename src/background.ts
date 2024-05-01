// types
import type ActionPayload from './types/ActionPayload'

chrome.runtime.onMessage.addListener(
  (message: ActionPayload, sender, sendResponse) => {
    switch (message.action) {
      case 'getSelfInfo':
        sendResponse(sender)
        break

      case 'getTabs':
        chrome.tabs.query(
          {
            windowId: sender.tab?.windowId,
          },
          sendResponse,
        )
        break

      case 'newTab':
        chrome.tabs.create({}, sendResponse)
        break

      case 'removeTab':
        chrome.tabs.remove(message.data.tabId, sendResponse)
        break

      case 'setActiveTab':
        chrome.tabs.update(
          message.data.tabId,
          { highlighted: true },
          sendResponse,
        )

        break

      case 'getHistorySuggestions':
        chrome.history.search(
          { ...message.data, maxResults: message.data.maxResults ?? 10 },
          sendResponse,
        )
        break
    }

    return true
  },
)
