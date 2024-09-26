import { NAME } from '~/common/shared/database-table/constants/name'
import { uncapitalize, unspace } from '~/utils/string'

export { NAME }

export const SYSNAME = uncapitalize(unspace(NAME))
