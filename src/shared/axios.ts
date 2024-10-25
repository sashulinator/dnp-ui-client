import axios from 'axios'
import { stringify } from 'qs'

import { setAuthorizationHeader } from '~dnp/shared/auth/set-authorization-header'

// const loginUrl = '/login'

const api = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = '*/*'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
api.interceptors.request.use(setAuthorizationHeader as any)
// api.interceptors.response.use(undefined, (error) => handleUnauthorizedError(error))

export default api

// Private

//
