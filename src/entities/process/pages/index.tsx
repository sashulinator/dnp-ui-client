import { NumberParam, withDefault } from 'serialize-query-params'
import { useQueryParams } from 'use-query-params'

import { Item, fetchList } from '~/entities/process'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Heading from '~/shared/heading'
import Pagination from '~/shared/pagination'
import { routes } from '~/shared/routes'
import Section from '~/shared/section'

export interface Props {
  className?: string | undefined
}
const displayName = 'page-Processes'

/**
 * page-Processes
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = fetchList.useCache({ take, skip: (page - 1) * take })

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading>{routes.processes.getName()}</Heading>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            loading={fetcherList.isFetching}
            limit={take}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.id} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
