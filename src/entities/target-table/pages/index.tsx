import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { Item, api } from '~/entities/target-table'
import { routes } from '~/old-shared/routes'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Heading from '~/shared/heading'
import Link from '~/shared/link'
import Pagination from '~/shared/pagination'
import Section from '~/shared/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-TargetTable'

/**
 * page-TargetTable
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = api.fetchList.useCache({ take, skip: (page - 1) * take })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading>{routes.targetTables.getName()}</Heading>
            <Button size='1' asChild>
              <Link to={routes.targetTables_create.getURL()}>Создать</Link>
            </Button>
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            limit={take}
            loading={fetcherList.isFetching}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.kn} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
