import { useParams } from 'react-router-dom'
import { NAME_ONE } from '../../../constants/name'
import { Viewer } from '~/entities/explorer'
import { api } from '~/entities/operational-table'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Section from '~/ui/section'

import { useEffect, useState } from 'react'
import Pagination from '~/ui/pagination'
import { emptyFn } from '~/utils/function'

export interface Props {
  className?: string | undefined
}

const displayName = `page-${NAME_ONE.replace(/ /, '')}_id`

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 10

  const exploreFetcher = api.explore.useCache({ kn, skip, take }, { keepPreviousData: true })

  // Update skip when page changes
  useEffect(() => {
    setSkip((page - 1) * take)
  }, [page])

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        {exploreFetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => exploreFetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!exploreFetcher.isError && (
          <Section size='1'>
            <Heading>{routes.operationalTables_kn.getName()} </Heading>
          </Section>
        )}

        <Section size='1'>
          <Pagination
            currentPage={page}
            loading={exploreFetcher.isFetching}
            limit={take.toString()}
            totalElements={exploreFetcher.data?.total?.toString()}
            onChange={setPage}
          />
        </Section>

        {exploreFetcher.isSuccess && (
          <Section size='1'>
            <Viewer onPathChange={emptyFn} paths={exploreFetcher.data.paths} data={exploreFetcher.data} />
          </Section>
        )}
      </Container>
    </main>
  )
}

Component.displayName = displayName
