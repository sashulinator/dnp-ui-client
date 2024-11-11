import { c } from '~/utils/core'

import Heap from '../../entities/heap/pages'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Heap'

/**
 * page-Heap
 */
export default function Component(): JSX.Element {
  return (
    <main className={c(displayName)}>
      <Heap />
    </main>
  )
}

Component.displayName = displayName
