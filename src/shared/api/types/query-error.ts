import { type AxiosError } from 'axios'

export type ServerError = Error & { description: string }

export type QueryError = AxiosError<ServerError>
