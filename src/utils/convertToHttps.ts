export function convertToHttps(url: string): string {
  if (url.startsWith('https://')) {
    return url
  } else if (url.startsWith('http://')) {
    return 'http://' + url.slice(7)
  }

  return 'https://' + url
}
