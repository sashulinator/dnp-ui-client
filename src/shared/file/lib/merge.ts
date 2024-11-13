import { toDictionary } from '~/utils/list'

export function merge(a: FileList | null, b: FileList | null) {
  const aDict = toDictionary((file) => file.name, Array.from(a || []))
  const bDict = toDictionary((file) => file.name, Array.from(b || []))
  const merged = Object.values({ ...aDict, ...bDict })
  const dt = new DataTransfer()
  merged.forEach((file) => dt.items.add(file))
  return dt.files
}
