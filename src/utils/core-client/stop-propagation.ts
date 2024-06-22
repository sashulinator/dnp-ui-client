interface StopPropagationEvent {
  stopPropagation: () => void
}

/**
 * @example
 * fns(stopPropagation, doSmth1, doSmth2)
 */
export function stopPropagation(e: StopPropagationEvent) {
  e.stopPropagation()
}
