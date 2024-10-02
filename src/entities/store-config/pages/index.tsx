import { NumberParam, withDefault } from 'serialize-query-params'
import { useQueryParams } from 'use-query-params'

import { Item, fetchList } from '~/entities/store-config'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Heading from '~/shared/heading'
import Link from '~/shared/link'
import Pagination from '~/shared/pagination'
import { routeMap } from '~/shared/route'
import Section from '~/shared/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-StoreConfig'

/**
 * page-storeConfig
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
          <Flex width='100%' justify='between'>
            <Heading>{routeMap.storeConfigs.getName()}</Heading>
            <Button size='1' asChild>
              <Link to={routeMap.storeConfigs_create.getUrl()}>Создать</Link>
            </Button>
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            limit={take}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
            loading={fetcherList.isFetching}
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
