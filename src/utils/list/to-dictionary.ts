export function toDictionary<TListItem>(
  getKey: (item: TListItem) => string | number,
  list: TListItem[] = []
): Record<string, TListItem> | null {
  if (list.length === 0) {
    return null
  }

  return list.reduce<Record<string, TListItem>>((acc, item) => {
    acc[getKey(item)] = item
    return acc
  }, {})
}
