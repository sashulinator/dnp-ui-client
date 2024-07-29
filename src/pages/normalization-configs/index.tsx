import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Item, fetchList } from '~/entities/normalization-config'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'

import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Pagination from '~/ui/pagination'

import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Main'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 10

  useEffect(() => {
    setSkip((page - 1) * take)
  }, [page])

  const fetcherList = fetchList.useCache(
    { take, skip, select: { id: true, name: true, v: true, last: true } },
    { keepPreviousData: true },
  )

  return (
    <main className={displayName}>
      <Container p='8'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading>{routes.normalizationConfigs.getName()}</Heading>
            <Button asChild>
              <Link to={routes.normalizationConfigs_create.getURL()}>Создать</Link>
            </Button>
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            loading={fetcherList.isFetching}
            currentPage={page}
            limit='10'
            totalElements={fetcherList.data?.total.toString()}
            onChange={setPage}
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
