import { type AxiosError } from 'axios'

import { type UiErrorable } from '~/shared/error'

export type QueryError = AxiosError<UiErrorable>
