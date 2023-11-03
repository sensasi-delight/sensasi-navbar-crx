export function convertToHttps(url: string): string {
  if (url.startsWith('https://')) {
    return 'https://' + url.slice(8)
  } else if (url.startsWith('http://')) {
    return 'http://' + url.slice(7)
  }

  return 'https://' + url
}
