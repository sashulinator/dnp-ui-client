import { NAME } from '~/common/shared/explorer/constants/name'
import { uncapitalize, unspace } from '~/utils/string'

export { NAME }

export const SYSNAME = uncapitalize(unspace(NAME))
