import { Link } from 'react-router5'
import Card from '~/ui/card'
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
  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>DNP</Heading>
        </Section>
        <Flex gap='4'>
          <Card asChild style={{ width: '12rem', height: '5rem' }}>
            <Link routeName='normalizationConfigs'>Конфиги нормализации</Link>
          </Card>
          <Card asChild style={{ width: '12rem', height: '5rem' }}>
            <Link routeName='normalizationConfigsArchive'>Архив конфигураций нормализации</Link>
          </Card>
          <Card asChild style={{ width: '12rem', height: '5rem' }}>
            <Link routeName='processes'>Процессы</Link>
          </Card>
          {/* <Card asChild={true} style={{ width: '12rem', height: '4rem' }}>
            <Link routeName='uni'>Uni</Link>
          </Card> */}
        </Flex>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
