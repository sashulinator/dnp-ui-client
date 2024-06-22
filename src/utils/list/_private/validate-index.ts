export function validateIndex(index: number, list: unknown[]) {
  if (index < 0) {
    throw new Error('Index cannot be less than 0.')
  }

  if (index > list.length) {
    throw new Error(`Index cannot be more than ${length}.`)
  }
}
