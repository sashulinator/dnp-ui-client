import {
  NAME,
  type RequestParams,
  type Result,
  url,
} from '~/common/entities/workshop/variant.factory/api.v1/get-dcdatabases'
import api, { type Response } from '~/shared/api'

export { url }

const request = (): Promise<Response<Result>> => api.post(url)

export { request, type RequestParams, type Result, NAME }
