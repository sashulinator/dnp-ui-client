export const JSONParam = {
  encode: encodeObject,
  decode: decodeObject,
}

/**
 * Взято из https://github.com/pbeshai/use-query-params/blob/b14c97ec2e7b1dfaca51d4d17439f9c306b34dba/packages/serialize-query-params/src/serialize.ts
 * Encode simple objects as readable strings. Works only for simple,
 * flat objects where values are numbers, strings.
 *
 * For example { foo: bar, boo: baz } -> "foo-bar_boo-baz"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
export function encodeObject(
  obj: { [key: string]: string | null | number | undefined } | null | undefined,
): string | null | undefined {
  if (obj == null) return obj // null or undefined
  if (!Object.keys(obj).length) return '' // {} case

  return JSON.stringify(obj)
}

/**
 * Decodes a simple object to javascript. Currently works only for simple,
 * flat objects where values are strings.
 *
 * For example "foo-bar_boo-baz" -> { foo: bar, boo: baz }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
export function decodeObject(
  input: string | (string | null)[] | null | undefined,
): { [key: string]: string } | null | undefined {
  const objStr = getEncodedValue(input, true)
  if (objStr == null) return objStr
  if (objStr === '') return {}

  try {
    return JSON.parse(objStr)
  } catch (e) {
    return null
  }
}

/**
 * Interprets an encoded string and returns either the string or null/undefined if not available.
 * Ignores array inputs (takes just first element in array)
 * @param input encoded string
 */
function getEncodedValue(
  input: string | (string | null)[] | null | undefined,
  allowEmptyString?: boolean,
): string | null | undefined {
  if (input == null) {
    return input
  }
  // '' or []
  if (input.length === 0 && (!allowEmptyString || (allowEmptyString && input !== ''))) {
    return null
  }

  const str = input instanceof Array ? input[0] : input
  if (str == null) {
    return str
  }
  if (!allowEmptyString && str === '') {
    return null
  }

  return str
}
