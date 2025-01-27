import type { DctableLocator } from './types'

/**
 * build FullyQualifiedName
 */
export function buildFqn(locator: DctableLocator) {
  return `${locator.dcserviceId}:${locator.database}:${locator.schema}:${locator.name}`
}
