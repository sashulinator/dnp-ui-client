import { isMetaCtrlKey } from './is/meta-ctrl-key'

interface Event {
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  altKey: boolean
  key?: string
}

interface Conf extends Partial<Event> {
  // если macOS то meta, если windows то ctrl
  metaCtrlKey?: boolean
}

export function keyListener<E extends Event>(conf: Conf, cb?: ((e: E) => void) | undefined) {
  return (e: E) => {
    if (conf?.shiftKey === false && e.shiftKey) return

    if (e.key !== conf.key) return
    if (conf?.ctrlKey && !e.ctrlKey) return
    if (conf?.metaKey && !e.metaKey) return
    if (conf?.shiftKey && !e.shiftKey) return
    if (conf?.altKey && !e.altKey) return
    if (conf?.metaCtrlKey && !isMetaCtrlKey(e)) return

    cb?.(e)
  }
}
