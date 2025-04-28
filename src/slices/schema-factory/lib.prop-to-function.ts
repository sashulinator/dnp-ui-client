import type { Block } from './types'

/**
 * Используется когда данные прилетают с сервера через JSON
 * Функции передаются в виде строк и название у функций должны начинаться с $
 *
 * Дано      { $onClick: '() => console.log()'}
 * Результат { onClick: () => console.log() }
 */
export function propToFunction(block: Block): Block {
  const processValue = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.map(processValue)
    } else if (typeof value === 'object' && value !== null) {
      return propToFunction(value as Block)
    }
    return value
  }

  const entries = Object.entries(block || {})

  const ret = entries.reduce((acc, [key, value]) => {
    if (/^\$/.test(key)) {
      // @ts-ignore
      acc[key.slice(1)] = new Function('...args', `return (${value})(...args)`)
    } else {
      // @ts-ignore
      acc[key] = processValue(value) as any
    }
    return acc
  }, {} as Block)

  return ret as Block
}
