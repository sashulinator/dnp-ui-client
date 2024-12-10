import { queryClient } from '~/shared/query'

import { request, url } from './request'

export async function prefetchAndStore(): Promise<void> {
  queryClient.prefetchQuery(
    [url],
    async () => {
      const ret = await request()
      localStorage.setItem(url, JSON.stringify(ret.data))
      return ret
    },
    {
      initialData: {
        data: JSON.parse(localStorage.getItem(url) || '{}') as string[],
      },
    },
  )
}
