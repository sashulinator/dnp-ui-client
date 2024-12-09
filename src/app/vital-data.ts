import { processingDataApi } from '~/entities/processing-data'
import { queryClient } from '~/shared/query'

export const PROCESSING_DATA_DCDATABASES_KEY = 'processingData-dcdatabases'

async function getProcessingDataDatabases() {
  await queryClient.prefetchQuery(
    [PROCESSING_DATA_DCDATABASES_KEY],
    async () => {
      const ret = await processingDataApi.getDcdatabases.request()
      localStorage.setItem(PROCESSING_DATA_DCDATABASES_KEY, JSON.stringify(ret.data))
      return ret.data
    },
    {
      initialData: {
        data: JSON.parse(localStorage.getItem(PROCESSING_DATA_DCDATABASES_KEY) || '{}') as string[],
      },
    },
  )
}

getProcessingDataDatabases()
