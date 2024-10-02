import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { Item, fetchList } from '~/entities/normalization-config'
import { getRole, roles } from '~/entities/user'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Heading from '~/shared/heading'
import Link from '~/shared/link'
import Pagination from '~/shared/pagination'
import { routes } from '~/shared/route'
import Section from '~/shared/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-NormalizationConfigs'

/**
 * page-Main
 */
export default function Page(): JSX.Element {
  const isAdmin = getRole() === roles.Admin

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = fetchList.useCache(
    { take, skip: (page - 1) * take, select: { id: true, name: true, v: true, last: true } },
    { keepPreviousData: true },
  )

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading>{routes.normalizationConfigs.getName()}</Heading>
            {isAdmin && (
              <Button size='1' asChild>
                <Link to={routes.normalizationConfigs_create.getUrl()}>Создать</Link>
              </Button>
            )}
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            loading={fetcherList.isFetching}
            currentPage={page}
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

Page.displayName = displayName
