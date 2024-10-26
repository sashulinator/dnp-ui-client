import { NAME } from '~dnp/common/slices/explorer/constants/name'
import { uncapitalize, unspace } from '~dnp/utils/string'

export { NAME }

export const SYSNAME = uncapitalize(unspace(NAME))
