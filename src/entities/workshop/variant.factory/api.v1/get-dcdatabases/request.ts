import api, { type Response } from '~/app/api'
import {
  NAME,
  type RequestParams,
  type Result,
  url,
} from '~/common/entities/workshop/variant.factory/api.v1/get-dcdatabases'

export { url }

const request = (): Promise<Response<Result>> => api.post(url)

export { request, type RequestParams, type Result, NAME }
