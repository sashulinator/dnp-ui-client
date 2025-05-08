import api, { type Response } from '~/app/api'
import { NAME, type RequestParams, type Result, url } from '~/common/slices/store/api.v1/update'

const request = (params: RequestParams): Promise<Response<Result>> => api.post(url, { params })

export { request, type RequestParams, type Result, NAME }
