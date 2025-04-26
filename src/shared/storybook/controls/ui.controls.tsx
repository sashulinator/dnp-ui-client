import './ui.controls.scss'

import React from 'react'

import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import ScrollArea from '~/shared/scroll-area'
import Switch from '~/shared/switch'
import TextInput from '~/shared/text-input'
import { type Dictionary, c } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { getPath, setPath } from '~/utils/dictionary'

import { stateStore, storyStore } from '../store.storybook'

const displayName = 'ui-storybook-controls'

/**
 * dnp-storybook-Storybook
 */
export default function Component(): JSX.Element | null {
  useSubscribeUpdate(stateStore.subscribe)
  useSubscribeUpdate(storyStore.subscribe)

  const { setCurrentStoryState, getCurrentStoryState } = stateStore.get()
  const { activeStory } = storyStore.get()

  if (activeStory?.controls.length === 0) return null

  return (
    <div className={displayName}>
      <ScrollArea>
        <Flex gap='2' p='4' width='100%' direction='column'>
          {activeStory?.controls.map((control, i) => {
            const input = map[control.input]
            return (
              <Flex width='100%' direction='column' key={i}>
                <Labeled label={control.label}>
                  {React.createElement(input.component, {
                    key: i,
                    value: getPath(getCurrentStoryState(), control.path),
                    onValueChange: (v: unknown) => {
                      setCurrentStoryState(setPath(getCurrentStoryState() as Dictionary, control.path, v))
                    },
                    ...input.props,
                  } as any)}
                </Labeled>
              </Flex>
            )
          })}
        </Flex>
      </ScrollArea>
    </div>
  )
}

Component.displayName = displayName

type InputProps = { value: any; onValueChange: any }

type Input = { component: React.FunctionComponent<InputProps> | React.ComponentClass<InputProps>; props: Dictionary }

const map: Record<string, Input> = {
  TextInput: {
    component: TextInput,
    props: {
      style: {
        width: '300px',
      },
    },
  },
  Switch: {
    component: ({ value, onValueChange, ...props }) => (
      <Switch {...props} checked={value} onCheckedChange={onValueChange} />
    ),
    props: {
      style: {
        width: '300px',
      },
    },
  },
}
