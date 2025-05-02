import { emptyFn } from '~/utils/function'

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
    if (key === '$listeners') {
      // @ts-ignore
      acc[key.slice(1)] = value?.map((fn) => {
        try {
          // @ts-ignore
          return new Function('...args', `return (${Array.isArray(fn) ? fn.join('\n') : fn})(...args)`)
        } catch (e) {
          // @ts-ignore
          return emptyFn
        }
      })
    } else if (/^\$/.test(key)) {
      try {
        // @ts-ignore
        acc[key.slice(1)] = new Function('...args', `return (${value})(...args)`)
      } catch (e) {
        // @ts-ignore
        acc[key.slice(1)] = emptyFn
      }
    } else {
      // @ts-ignore
      acc[key] = processValue(value) as any
    }
    return acc
  }, {} as Block)

  return ret as Block
}
