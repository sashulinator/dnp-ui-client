import { useRouteNode } from 'react-router5'
import { storyList } from './story-list'
import Storybook from '~/ui/storybook'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Storybook'

const STORY_QUERY = 'story'

/**
 * page-Storybook
 */
export default function Component(): JSX.Element {
  const { route, router } = useRouteNode('storybook')

  return (
    <main className={c(displayName)}>
      <Storybook
        stories={storyList}
        activeStoryName={route.params[STORY_QUERY]}
        setActiveStoryName={(activeStoryName) => {
          router.navigate('storybook', { [STORY_QUERY]: activeStoryName }, { force: true })
        }}
      />
    </main>
  )
}

Component.displayName = displayName
