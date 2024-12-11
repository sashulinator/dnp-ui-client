export function parseSafe<T>(str: string, assertion?: ((result: unknown) => void) | undefined): null | T {
  try {
    const result = JSON.parse(str)
    assertion?.(result)
    return result
  } catch (e) {
    return null
  }
}
