import { Explorer } from '../../../explorer/types/explorer'
import { NAME_ONE } from '../../constants/name'

export const keyName = `${NAME_ONE}.explore`

export type RequestData = {
  kn: string
  skip?: number
  take?: number
}

export type ResponseData = Explorer
