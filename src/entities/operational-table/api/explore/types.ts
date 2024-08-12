import { Explorer } from '../../../explorer/types/explorer'
import { NAME_ONE } from '../../constants/name'

export const keyName = `${NAME_ONE}.explore`

export type RequestData = {
  kn: string
}

export type ResponseData = Explorer
