import { useState } from 'react'

import Flex from '~dnp/shared/flex'
import { Props, type Story } from '~dnp/shared/storybook'

import TextField from '..'
import TagPicker from '..'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

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
