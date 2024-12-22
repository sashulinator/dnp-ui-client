import './storybook.scss'

import { createElement } from 'react'

import ScrollArea from '~/shared/scroll-area'
import { c } from '~/utils/core'

import { type Story } from '../types'

export interface Props {
  className?: string | undefined
  activeStoryName?: string | undefined
  setActiveStoryName?: ((name: string) => void) | undefined
  stories: Story<unknown>[]
}

const displayName = 'dnp-storybook-Storybook'

/**
 * dnp-storybook-Storybook
 */
export default function Component(props: Props): JSX.Element {
  const { stories } = props

  const activeStory = stories.find((item) => item.getName() === props.activeStoryName)

  return (
    <div className={c(props.className, displayName)}>
      <ScrollArea>
        <div className='content'>{activeStory?.render && createElement(activeStory?.render)}</div>
      </ScrollArea>
    </div>
  )
}

Component.displayName = displayName
