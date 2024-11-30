import React, { createElement } from 'react'

import { type AppRoute, routes } from '~/app/route'
import { auth } from '~/shared/auth'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { Heading } from '~/shared/page'
import Section from '~/shared/section'

export interface Props {
  className?: string | undefined
}

const NAME = 'page-Main'

export default function Component(): JSX.Element {
  const navigatables = Object.entries(routes).filter(([, route]: [unknown, AppRoute]) => {
    if (!route.payload.navigatable) return false
    if (route.payload.rolesAllowed) return route.payload?.rolesAllowed.some((role) => auth.hasRole(role, 'dnp'))
    return true
  })

  return (
    <main className={NAME}>
      <Container p='4'>
        <Section size='1'>
          <Heading.Root route={routes.main} backRoute={routes.main}>
            <Button variant='outline' square={true} style={{ marginRight: 'var(--space-4)' }}>
              {React.createElement(routes.main.payload.renderIcon)}
            </Button>
            <Heading.Name />
          </Heading.Root>
        </Section>
        <Section size='1'>
          <Flex gap='2' wrap={'wrap'}>
            {navigatables.map(([key, route]) => {
              return (
                <Card key={key} asChild style={{ width: '15rem', height: '92px' }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link to={(route.getUrl as any)()}>
                    <Flex gap='4'>
                      <Flex>
                        <Button color={(route as any).payload?.iconColor} variant='soft' square={true}>
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {createElement((route as any).payload.renderIcon)}
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

Component.displayName = NAME
