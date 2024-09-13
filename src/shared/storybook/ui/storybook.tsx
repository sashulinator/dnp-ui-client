import { createElement } from 'react'
import { Story } from '../types'
import Nav from '../widgets/nav'
import './storybook.scss'
import { c } from '~/utils/core'

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
      <div className='content'>{activeStory?.render && createElement(activeStory?.render)}</div>
    </div>
  )
}

Component.displayName = displayName
