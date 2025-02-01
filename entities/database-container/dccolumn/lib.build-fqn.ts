import type { DccolumnLocator } from './types'

/**
 * build FullyQualifiedName
 */
export function buildFqn(locator: DccolumnLocator) {
  return `${locator.dcserviceId}:${locator.database}:${locator.schema}:${locator.table}:${locator.name}`
}
