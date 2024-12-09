import { processingDataApi } from '~/entities/processing-data'
import { queryClient } from '~/shared/query'

import { NAME, url } from './request'

export async function prefetchAndStore(): Promise<void> {
  queryClient.prefetchQuery(
    [NAME],
    async () => {
      const ret = await processingDataApi.getDcdatabases.request()
      localStorage.setItem(url, JSON.stringify(ret.data))
      return ret.data
    },
    {
      initialData: {
        data: JSON.parse(localStorage.getItem(url) || '{}') as string[],
      },
    },
  )
}
