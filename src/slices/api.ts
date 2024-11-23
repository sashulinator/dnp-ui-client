import api from '~/shared/api'

export function createRequest<P, R>(url: string): (params: P) => Promise<R> {
  return async (params: P) => api.put(url, params)
}
