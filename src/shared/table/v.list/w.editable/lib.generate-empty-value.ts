import { generateId } from '~/utils/core'

export const EMPTY = `____EMPTYПУСТО____`

export function generateEmptyValue() {
  return `${EMPTY}${generateId()}${EMPTY}`
}

export function isEmptyValue(value: string): boolean {
  return new RegExp(`^${EMPTY}.+${EMPTY}$`).test(value)
}
