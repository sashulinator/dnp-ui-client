import { Size } from './types/size'

export function getDocumentSize(w: Window = window): Size {
  return {
    height: w.document.documentElement.clientHeight,
    width: w.document.documentElement.clientWidth,
  }
}
