import { useEffect } from 'react'

import { SetterOrUpdater } from '../core'
import { useDebounce } from './debounce'

export function useClosing(isOpen: boolean): [boolean, boolean, SetterOrUpdater<boolean>, SetterOrUpdater<boolean>] {
  const [opened, setOpened, setOpenedImmediately] = useDebounce(Boolean(isOpen), 300)
  const closing = opened === true && Boolean(isOpen) === false

  useEffect(_syncOpened, [isOpen])

  return [closing, opened, setOpened, setOpenedImmediately]

  /**
   * Private
   */

  function _syncOpened(): void {
    if (isOpen !== opened) {
      if (Boolean(isOpen)) {
        setOpenedImmediately(true)
      } else {
        setOpened(false)
      }
    }
  }
}
