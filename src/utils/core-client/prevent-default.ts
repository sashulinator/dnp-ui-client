interface PreventDefaultEvent {
  preventDefault: () => void
}

/**
 * @example
 * fns(stopPropagation, doSmth1, doSmth2)
 */
export function preventDefault(e: PreventDefaultEvent) {
  e.preventDefault()
}
