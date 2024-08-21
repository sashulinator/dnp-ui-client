import { NAME_ONE } from '../../constants/name'

export const keyName = `${NAME_ONE}.explorerDelete`

export type RequestData = { kn: string; where: Record<string, unknown> }

export type ResponseData = unknown
