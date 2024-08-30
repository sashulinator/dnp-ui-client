import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { Item, fetchList } from '~/entities/normalization-config'
import { getRole, roles } from '~/entities/user'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Link from '~/ui/link'
import Pagination from '~/ui/pagination'
import Section from '~/ui/section'

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
      <Container p='1.5rem'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading>{routes.normalizationConfigs.getName()}</Heading>
            {isAdmin && (
              <Button size='1' asChild>
                <Link to={routes.normalizationConfigs_create.getURL()}>Создать</Link>
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
