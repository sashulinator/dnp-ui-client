export function parseSafe<T>(str: string, assertion?: (() => void) | undefined): null | T {
  try {
    const json = JSON.parse(str)
    assertion?.()
    return json
  } catch (e) {
    return null
  }
}
