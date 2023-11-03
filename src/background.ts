interface IMessage {
  action: string
  query: string
}

function getHistorySuggestions(query: string, callback: any): void {
  chrome.history.search({ text: query, maxResults: 10 }, callback)
}

chrome.runtime.onMessage.addListener(
  (message: IMessage, sender, sendResponse: any) => {
    if (message.action === 'getHistorySuggestions') {
      const { query } = message
      getHistorySuggestions(query, sendResponse)
    }

    return true
  },
)
