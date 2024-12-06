import { NAME, type RequestParams, type Result, url } from '~/common/slices/store/api.v1/update'
import api, { type Response } from '~/shared/api'

const request = (params: RequestParams): Promise<Response<Result>> => api.post(url, { params })

export { request, type RequestParams, type Result, NAME }
