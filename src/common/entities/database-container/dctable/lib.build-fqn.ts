import type { DctableLocator } from './types'

export function buildFqn(locator: DctableLocator) {
  return `${locator.dcserviceId}.${locator.database}.${locator.schema}.${locator.name}`
}
