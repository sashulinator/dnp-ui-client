import { type Response } from '~/lib/api'
import { queryClient } from '~/shared/react-query'
import { assertDefined } from '~/utils/assertions'

import { type Row } from '../../../types/dictionary-table'
import { NAME, type RequestData, type ResponseData } from './request'

export function setCache(requestData: RequestData, data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData([NAME, requestData], response)
}

function replaceExplorerItem(requestData: RequestData, row: Row, name: string = NAME) {
  queryClient.setQueryData<Response<ResponseData>>([name, requestData], (original) => {
    assertDefined(original)

    return {
      ...original,
      data: {
        ...original?.data,
        explorer: {
          ...original?.data?.explorer,
          items: original?.data.explorer.items.map((item) =>
            (item.data as Row)._id === row._id ? { ...item, data: row } : item,
          ),
        },
      },
    }
  })
}

setCache.replaceExplorerItem = replaceExplorerItem
