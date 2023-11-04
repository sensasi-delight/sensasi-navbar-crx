export default interface GetHistorySuggestionPayload {
  action: 'getHistorySuggestions'
  data: {
    query: string
  }
}
