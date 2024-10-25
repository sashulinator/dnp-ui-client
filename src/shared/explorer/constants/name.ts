import { NAME } from '~dnp/common/shared/explorer/constants/name'
import { uncapitalize, unspace } from '~dnp/utils/string'

export { NAME }

export const SYSNAME = uncapitalize(unspace(NAME))
