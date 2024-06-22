// eslint-disable-next-line import/no-unused-modules
export function isList<T>(input: T[]): input is T[] {
  return Array.isArray(input)
}
