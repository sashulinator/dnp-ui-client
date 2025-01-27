import type { DctableLocator } from './types'

export function isSameLocator(a: DctableLocator | undefined, b: DctableLocator | undefined): boolean {
  return (
    a?.dcserviceId === b?.dcserviceId && a?.database === b?.database && a?.schema === b?.schema && a?.name === b?.name
  )
}
