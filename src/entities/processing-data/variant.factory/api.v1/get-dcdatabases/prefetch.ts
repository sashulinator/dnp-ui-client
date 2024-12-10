import { queryClient } from '~/shared/query'

import { NAME, request, url } from './request'

export async function prefetchAndStore(): Promise<void> {
  queryClient.prefetchQuery(
    [NAME],
    async () => {
      const ret = await request()
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
