import './ui.canvas.scss'

import { createElement } from 'react'

import ScrollArea from '~/shared/scroll-area'
import type { Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { getPath, setPath } from '~/utils/dictionary'

import { stateStore, storyStore } from '../store.storybook'

const displayName = 'dnp-storybook-Storybook'

/**
 * dnp-storybook-Storybook
 */
export default function Component(): JSX.Element {
  useSubscribeUpdate(stateStore.subscribe)
  useSubscribeUpdate(storyStore.subscribe)

  const { setCurrentStoryState, getCurrentStoryState } = stateStore.get()
  const { activeStory } = storyStore.get()

  return (
    <div className={displayName}>
      <ScrollArea>
        <div className='content'>
          {activeStory?.render &&
            createElement(activeStory?.render, {
              ...getCurrentStoryState(),
              state: getCurrentStoryState(),
              setState: (v: unknown) =>
                setCurrentStoryState(setPath(getCurrentStoryState() as Dictionary, [activeStory.getName()], v)),
            } as any)}
        </div>
      </ScrollArea>
    </div>
  )
}

Component.displayName = displayName
