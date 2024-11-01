import { useState } from 'react'

import Flex from '~/shared/flex'
import { Props, type Story } from '~/shared/storybook'

import Tag from '..'

interface State {}

export default {
  getName: (): string => Tag.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [tag, setTag] = useState<string | undefined>('tag-value')

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Tag
          {...state}
          value={tag}
          onChange={(_, value) => setTag(value)}
          onTrashClick={(): void => setTag(undefined)}
        />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
