import './storybook.scss'

import { createElement } from 'react'

import ScrollArea from '~dnp/shared/scroll-area'
import { c } from '~dnp/utils/core'

import { type Story } from '../types'
import Nav from '../widgets/nav'

export interface Props {
  className?: string | undefined
  activeStoryName?: string | undefined
  setActiveStoryName?: ((name: string) => void) | undefined
  stories: Story<any>[]
}

const displayName = 'ui-Storybook'

/**
 * ui-Storybook
 */
export default function Component(props: Props): JSX.Element {
  const { stories } = props

  const activeStory = stories.find((item) => item.getName() === props.activeStoryName)

  return (
    <div className={c(props.className, displayName)}>
      <Nav stories={stories} activeStoryName={props.activeStoryName} setActiveStoryName={props.setActiveStoryName} />
      <ScrollArea>
        <div className='content'>{activeStory?.render && createElement(activeStory?.render)}</div>
      </ScrollArea>
    </div>
  )
}

Component.displayName = displayName
