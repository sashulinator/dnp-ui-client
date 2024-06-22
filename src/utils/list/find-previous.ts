export function findPrevious<T>(isCurrent: (i: T) => boolean, list?: T[] | undefined, recursive = true): T | undefined {
  if (list === undefined) return undefined

  const lastItem = list?.[list.length - 1]

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const previousItem = list[i - 1]
    const isFirst = i === 0

    if (!isCurrent(item)) continue
    // Если текущий последний то переходим наверх
    if (isFirst && recursive) return lastItem

    return previousItem
  }
}
