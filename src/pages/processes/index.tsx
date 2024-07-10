import { Item, fetchList } from '~/entities/process'
import { routes } from '~/shared/routes'

import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'

import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}
const displayName = 'page-Processes'

/**
 * page-Processes
 */
export default function Component(): JSX.Element {
  const fetcherList = fetchList.useCache({ take: 20, skip: 0 })
  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>{routes.processes.getName()}</Heading>
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
