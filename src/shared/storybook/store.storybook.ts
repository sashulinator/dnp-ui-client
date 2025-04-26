import { type Dictionary, assertDefined } from '~/utils/core'
import { setPath } from '~/utils/dictionary'
import { createAtom } from '~/utils/store'

import type { State, Story } from './types'

export type StoryStore = {
  stories: Dictionary<Story<unknown>>
  activeStoryName: string
  activeStory: Story<unknown> | null
  setActiveStory: (name: string) => void
}

const defaultStoryStore: StoryStore = {
  stories: {},
  activeStoryName: '',
  activeStory: null,
  setActiveStory: (name: string) => {
    const currentStore = storyStore.get()
    const newActiveStory = currentStore.stories[name]
    assertDefined(newActiveStory, `Story с названием "${name}" не существует`)
    storyStore.set({
      ...currentStore,
      activeStoryName: name,
      activeStory: newActiveStory,
    })

    const storyStoreState = stateStore.get()
    const activeStoryState = storyStoreState.state[name]

    if (activeStoryState) {
      storyStoreState.setCurrentStoryState(activeStoryState)
      return
    }

    const defaultStoryState = newActiveStory.controls.reduce<Dictionary>((acc, c) => {
      return setPath(acc, c.path, c.defaultValue)
    }, {})
    storyStoreState.setCurrentStoryState(defaultStoryState)
  },
}

export const storyStore = createAtom(defaultStoryStore)

// State

export type StateStore = {
  state: State
  setState: (s: State) => void
  getCurrentStoryState: () => Dictionary | null
  setCurrentStoryState: (s: Dictionary) => void
}

const defaultStateStore: StateStore = {
  state: {},
  setState: (state: State) => {
    const currentStore = stateStore.get()
    stateStore.set({ ...currentStore, state })
  },
  getCurrentStoryState: () => {
    const activeStoryName = storyStore.get().activeStoryName
    if (!activeStoryName) return null
    return stateStore.get().state[activeStoryName]
  },
  setCurrentStoryState: (storyState: Dictionary) => {
    const currentStore = stateStore.get()
    stateStore.set({
      ...currentStore,
      state: {
        ...currentStore.state,
        [storyStore.get().activeStoryName]: storyState,
      },
    })
  },
}

export const stateStore = createAtom(defaultStateStore)
