export function findNext<T>(isCurrent: (i: T) => boolean, list?: T[] | undefined, recursive = true): T | undefined {
  if (list === undefined) return undefined

  const firstItem = list?.[0]

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const nextItem = list[i + 1]
    const isLast = i === list.length - 1

    if (!isCurrent(item)) continue
    // Если текущий последний то переходим наверх
    if (isLast && recursive) return firstItem

    return nextItem
  }
}
