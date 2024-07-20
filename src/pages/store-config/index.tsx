import { useEffect, useState } from 'react'
import { Item, fetchList } from '~/entities/store-config'
import { routes } from '~/shared/routes'

import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Pagination from '~/ui/pagination'

import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-StoreConfig'

/**
 * page-storeConfig
 */
export default function Component(): JSX.Element {
  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 10

  // Update skip when page changes
  useEffect(() => {
    setSkip((page - 1) * take)
  }, [page])
  const fetcherList = fetchList.useCache({ take, skip })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>{routes.storeConfigs.getName()}</Heading>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            limit='10'
            totalElements={fetcherList.data?.total.toString()}
            onChange={setPage}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.keyName} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
