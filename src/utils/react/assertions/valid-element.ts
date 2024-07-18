import React, { ReactElement } from 'react'

/**
 * Asserts that a value is a valid React element, throwing an error if the value is not valid.
 *
 * @template P - The type of props passed to the React element.
 *
 * @param {unknown} val - The value to assert as a valid React element.
 * @param {string} [msg] - The error message to throw if the value is not a valid React element.
 *
 * @throws {Error} - If the value passed is not a valid React element.
 *
 * @returns {asserts val is ReactElement<P>} - Asserts that the value is a valid React element.
 */

export function assertValidElement<P>(val: unknown, msg?: string): asserts val is ReactElement<P> {
  if (!React.isValidElement(val)) {
    throw new Error(msg || 'Must be a ReactElement')
  }
}
