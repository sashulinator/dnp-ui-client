import { isMac } from '../../core-client'

interface Event {
  ctrlKey: boolean
  metaKey: boolean
}

/**
 * Eсли macOS то проверяет metaKey, если windows то ctrlKey
 * @param {Event} e
 */
export function isMetaCtrlKey(e: Event): boolean {
  if (isMac()) {
    return e.metaKey
  } else {
    return e.ctrlKey
  }
}
