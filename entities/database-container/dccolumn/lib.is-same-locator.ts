import type { DccolumnLocator } from './types'

export function isSameLocator(a: DccolumnLocator | undefined, b: DccolumnLocator | undefined): boolean {
  return (
    a?.dcserviceId === b?.dcserviceId &&
    a?.database === b?.database &&
    a?.schema === b?.schema &&
    a?.table === b?.table &&
    a?.name === b?.name
  )
}
