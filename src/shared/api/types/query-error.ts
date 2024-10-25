import { type AxiosError } from 'axios'

import { type UiErrorable } from '~dnp/shared/error'

export type QueryError = AxiosError<UiErrorable>
