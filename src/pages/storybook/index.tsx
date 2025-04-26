import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '~/shared/flex'
import * as Storybook from '~/shared/storybook'
import { type Dictionary, assertDefined, c } from '~/utils/core'
import { useRenderDelay } from '~/utils/core-hooks'

import { storyList } from './story-list'

Storybook.storyStore.set({
  ...Storybook.storyStore.get(),
  stories: storyList.reduce<Dictionary<Storybook.Story<unknown>>>((acc, s) => {
    const name = s.getName()
    assertDefined(name)
    acc[name] = s
    return acc
  }, {}),
})

export interface Props {
  className?: string | undefined
}

const displayName = 'page-Storybook'

/**
 * page-Storybook
 */
export default function Component(): JSX.Element {
  const { name } = useParams()

  useEffect(() => {
    if (!name) return
    Storybook.storyStore.get().setActiveStory(name)
  }, [name])

  // Стейт для канваса генерируется в контроллерс поэтому ждем
  const { isRender } = useRenderDelay(0)

  return (
    <main className={c(displayName)}>
      {name && (
        <>
          <Flex width='100%' height='80%'>
            {isRender && <Storybook.Canvas.default />}
          </Flex>
          <Flex width='100%' height='20%' style={{ borderTop: '1px solid var(--gray-2)' }}>
            <Storybook.Controls.default />
          </Flex>
        </>
      )}
    </main>
  )
}

Component.displayName = displayName
