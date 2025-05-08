import axios from 'axios'
import { stringify } from 'qs'

import { _handleUnauthorizedError } from './_handle-unauthorize-error'
import { _setAuthorizationHeader } from './_set-authorization-header'

const api = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
})

// Заголовки по умолчанию
api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = '*/*'

// Устанавливаем Bearer token Заголовки
api.interceptors.request.use(_setAuthorizationHeader)

// Обрабатываем ошибку "неавторизован"
api.interceptors.response.use(undefined, _handleUnauthorizedError)

export { api }
