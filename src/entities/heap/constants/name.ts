import { NAME } from '~/common/entities/heap/constants'
import { uncapitalize, unspace } from '~/utils/string'

const SYSNAME = uncapitalize(unspace(NAME))

export { NAME, SYSNAME }
