// https://github.com/zertosh/invariant/blob/master/invariant.js

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV

export function invariant<T>(
  condition: T | null | undefined | false | '' | 0,
  format: string,
  a?: string | undefined,
  b?: string | undefined,
  c?: string | undefined,
  d?: string | undefined,
  e?: string | undefined,
  f?: string | undefined,
): asserts condition is T {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument')
    }
  }

  if (!condition) {
    var error: Error
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.',
      )
    } else {
      var args = [a, b, c, d, e, f]
      var argIndex = 0
      error = new Error(
        format.replace(/%s/g, (): string => {
          return args[argIndex++] as string
        }),
      )
      error.name = 'Invariant Violation'
    }

    ;(error as any).framesToPop = 1 // we don't care about invariant's own frame
    throw error
  }
}
