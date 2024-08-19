import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/layout/variants/heading'
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
          <Heading.Root loading={false} route={routes.main} backRoute={routes.main} renderIcon={routes.main.renderIcon}>
            <Button variant='outline' square={true} style={{ marginRight: 'var(--space-4)' }}>
              {React.createElement(routes.main.renderIcon)}
            </Button>
            <Heading.Name />
          </Heading.Root>
        </Section>
        <Section size='1'>
          <Flex gap='4' wrap={'wrap'}>
            <Card asChild style={{ width: '15rem', height: '5rem' }}>
              <Link to={routes.operationalTables.getURL()}>
                <Flex gap='4'>
                  <Flex>
                    <Button variant='soft' square={true}>
                      {React.createElement(routes.operationalTables.renderIcon)}
                    </Button>
                  </Flex>
                  <Flex>{routes.operationalTables.getName()}</Flex>
                </Flex>
              </Link>
            </Card>
            <Card asChild style={{ width: '12rem', height: '5rem' }}>
              <Link to={routes.normalizationConfigs.getURL()}>{routes.normalizationConfigs.getName()}</Link>
            </Card>
            <Card asChild style={{ width: '12rem', height: '5rem' }}>
              <Link to={routes.storeConfigs.getURL()}>{routes.storeConfigs.getName()}</Link>
            </Card>
            <Card asChild style={{ width: '12rem', height: '5rem' }}>
              <Link to={routes.processes.getURL()}>{routes.processes.getName()}</Link>
            </Card>
            <Card asChild style={{ width: '12rem', height: '5rem' }}>
              <Link to={routes.targetTables.getURL()}>{routes.targetTables.getName()}</Link>
            </Card>
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
