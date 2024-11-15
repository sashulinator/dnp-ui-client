import { NAME } from '~/common/slices/store/constants'
import { uncapitalize, unspace } from '~/utils/string'

const SYSNAME = uncapitalize(unspace(NAME))

export { NAME, SYSNAME }
