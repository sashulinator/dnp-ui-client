// @ts-nocheck
export function mergeDeep<T, U>(target: T, source: U): T & U {
  const output = { ...target }
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (Array.isArray(source[key]) && Array.isArray(output[key])) {
        output[key] = [...output[key], ...source[key]] // Concatenate arrays
      } else if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        typeof output[key] === 'object' &&
        output[key] !== null
      ) {
        output[key] = mergeDeep(output[key] as any, source[key] as any)
      } else {
        output[key] = source[key]
      }
    }
  }
  return output as T & U
}
