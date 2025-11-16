import type ActionPayload from '@/types/action-payload'

export default function sendToBgScript<T = unknown>(
  action: ActionPayload['action'],
  data: ActionPayload['data'] = undefined,
  callback: (param: T) => void = () => {},
): void {
  if (chrome?.runtime?.id !== undefined) {
    chrome.runtime.sendMessage(
      {
        action,
        data,
      },
      callback,
    )
  }
}
