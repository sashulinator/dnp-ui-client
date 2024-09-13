import { useSearchParams } from 'react-router-dom'

import Storybook from '~/shared/storybook'
import { c } from '~/utils/core'

import { storyList } from './story-list'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Storybook'

const STORY_QUERY = 'story'

/**
 * page-Storybook
 */
export default function Component(): JSX.Element {
  const [params, setParams] = useSearchParams()
  const query = params.get(STORY_QUERY) || ''

  return (
    <main className={c(displayName)}>
      <Storybook
        stories={storyList}
        activeStoryName={query}
        setActiveStoryName={(activeStoryName) => {
          setParams({ [STORY_QUERY]: activeStoryName })
        }}
      />
    </main>
  )
}

Component.displayName = displayName
