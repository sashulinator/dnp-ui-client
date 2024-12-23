import { APP } from '~/app/constants.app'
import { SLICE } from '~/entities/processing'
import Container from '~/shared/container'

export interface Props {
  className?: string | undefined
}

const NAME = `${APP}-${SLICE}-page-List`

export default function Component(): JSX.Element {
  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        <h1>Перечень обработок</h1>
      </Container>
    </main>
  )
}

Component.displayName = NAME
