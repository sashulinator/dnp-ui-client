import React, { createElement } from 'react'

import { getRole } from '~/entities/user'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { Heading } from '~/shared/page'
import { type Route, routeMap } from '~/shared/route'
import Section from '~/shared/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Main'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const role = getRole() || ''

  const navigatables = Object.entries(routeMap).filter(([, route]) => {
    if (!(route as Route).rolesAllowed) return route.navigatable
    return (route as Route).rolesAllowed?.includes(role) && route.navigatable
  })

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading.Root
            loading={false}
            route={routeMap.main}
            backRoute={routeMap.main}
            renderIcon={routeMap.main.renderIcon}
          >
            <Button variant='outline' square={true} style={{ marginRight: 'var(--space-4)' }}>
              {React.createElement(routeMap.main.renderIcon)}
            </Button>
            <Heading.Name />
          </Heading.Root>
        </Section>
        <Section size='1'>
          <Flex gap='4' wrap={'wrap'}>
            {navigatables.map(([key, route]) => {
              return (
                <Card key={key} asChild style={{ width: '15rem', height: '5rem' }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link to={(route.getUrl as any)()}>
                    <Flex gap='4'>
                      <Flex>
                        <Button variant='soft' square={true}>
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {createElement((route as any).renderIcon)}
                        </Button>
                      </Flex>
                      <Flex>{route.getName()}</Flex>
                    </Flex>
                  </Link>
                </Card>
              )
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
