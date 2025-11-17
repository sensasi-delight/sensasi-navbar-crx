type ActionPayload =
  | {
      action: 'getHistorySuggestions'
      data: chrome.history.HistoryQuery
    }
  | {
      action: 'getTabs' | 'getSelfInfo'
      data: undefined
    }
  | {
      action: 'setActiveTab' | 'removeTab'
      data: {
        tabId: number
      }
    }
  | {
      action: 'newTab'
      data: undefined
    }
  | {
      action: 'getTabLoadingStatus'
      data: {
        tabId: number
      }
    }

export default ActionPayload
