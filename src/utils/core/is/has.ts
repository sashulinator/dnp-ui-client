import type { Has } from '../types/has'
import type { Key } from '../types/key'
import { isObject } from './object'

/**
 * Determines whether an object has a property with the specified key.
 *
 * @template K - The type of the key being checked.
 * @param {unknown} object - The object to check for the key.
 * @param {K} key - The key to look for in the object.
 * @return {boolean} `true` if the object has the key, `false` otherwise.
 */
export function has<K extends Key>(object: unknown, key: K): object is Has<K> {
  if (!isObject(object)) return false
  return Object.prototype.hasOwnProperty.call(object, key)
}
