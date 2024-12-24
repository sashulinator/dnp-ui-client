import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import TagPicker from '..'

interface State {}

export default {
  getName: (): string => TagPicker.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [tags, setTags] = useState<string[] | undefined>(['tag1', 'tag2', 'tag3'])

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <TagPicker {...state} value={tags} onChange={setTags} />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
