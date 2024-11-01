import './nav.scss'

import { useMemo } from 'react'

import ScrollArea from '~/shared/scroll-area'
import { Story } from '~/shared/storybook'
import { c, group } from '~/utils/core'

export interface Props {
  className?: string | undefined
  stories: Story<any>[]
  activeStoryName?: string | undefined
  setActiveStoryName?: ((name: string) => void) | undefined
}

const displayName = 'dnp-storybook-Storybook-w-Nav'

/**
 * dnp-storybook-Storybook-w-Nav
 */
export default function Component(props: Props): JSX.Element {
  const { stories } = props

  const groups = useMemo(() => {
    return Object.entries(
      group(stories, (item) => {
        return item.getName().split('-')[0]
      }),
    )
  }, [stories])

  return (
    <div className={c(props.className, displayName)} style={{ height: '100vh' }}>
      <ScrollArea>
        <div style={{ paddingBottom: '80px' }}>
          {groups.map(([groupName, group]) => {
            return (
              <div key={groupName}>
                <div>{groupName}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.map((item) => {
                    const name = item.getName()
                    const isActive = props.activeStoryName === name

                    return (
                      <button
                        key={name}
                        onClick={() => props.setActiveStoryName?.(name)}
                        className={c('nav-link', isActive && '-active--true')}
                      >
                        {name.replace(`${groupName}-`, '')}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

Component.displayName = displayName
