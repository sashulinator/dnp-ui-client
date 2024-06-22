export function toMap<TListItem, Key>(
  getKey: (item: TListItem) => Key,
  list: TListItem[] = []
): Map<Key, TListItem> | null {
  if (list.length === 0) {
    return null
  }

  const map = new Map()

  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    map.set(getKey(item), item)
  }

  return map
}
