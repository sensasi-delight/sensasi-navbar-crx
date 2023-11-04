const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export default function isHrefable(href: string): boolean {
  return URL_REGEX.test(href)
}
