import { Item } from '~/entities/normalization-config'
import { fetchList } from '~/entities/normalization-config-archive'
import { routes } from '~/shared/routes'

import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'

import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Main'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const fetcherList = fetchList.useCache({ take: 20, skip: 0 })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>{routes.normalizationConfigsArchive.getName()}</Heading>
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.name} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
