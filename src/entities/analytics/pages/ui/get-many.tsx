import { Container, Flex, Section } from '@radix-ui/themes'

import { routes } from '~/app/route'
import { SLICE } from '~/common/entities/analytical-actions'
import { cssAnimations } from '~/shared/css-animations'
import { RenderCounter } from '~/shared/debug'
import { Heading } from '~/shared/page'
import { c } from '~/utils/core'

export default function Component(): JSX.Element {
  const displayName = `${SLICE}-Page_list`

  return (
    <main className={displayName} style={{ position: 'relative' }}>
      <RenderCounter style={{ top: 0 }} />
      <Container p='4'>
        <Section size='1' className={c(cssAnimations.Appear)}>
          <Flex width='100%' justify='between'>
            <Heading.Root route={routes.analytics} backRoute={routes.main}>
              <Heading.BackToParent />
              <Heading.Name />
            </Heading.Root>
          </Flex>
        </Section>
      </Container>
    </main>
  )
}
