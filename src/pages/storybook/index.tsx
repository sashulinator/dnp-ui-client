import { useParams } from 'react-router-dom'

import Storybook from '~/shared/storybook'
import { c } from '~/utils/core'

import { storyList } from './story-list'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Storybook'

/**
 * page-Storybook
 */
export default function Component(): JSX.Element {
  const { name } = useParams()

  return (
    <main className={c(displayName)}>
      <Storybook stories={storyList} activeStoryName={name} />
    </main>
  )
}

Component.displayName = displayName
