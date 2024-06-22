import { AxiosError } from 'axios'
import { Codable } from '~/utils/error'

export type QueryError = AxiosError<Error | Codable>
