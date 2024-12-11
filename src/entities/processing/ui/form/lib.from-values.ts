import { assertString } from '~/utils/assertions'
import { assertArray } from '~/utils/assertions/array'
import { parseSafe } from '~/utils/json'

import { type Proccessing } from '../../models'
import { type Values } from './ui.new-form'

export function fromValues(processing: Values): Proccessing {
  //

  const inputTables = parseSafe<string[]>(processing.inputTables, (ret) => {
    assertArray(ret)
    ret.forEach((item) => assertString(item))
  })

  return {
    ...processing,
    inputTables: inputTables || [],
  }
}
