import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import Editor from './ui.monaco-editor'

interface State {}

export default {
  getName: (): string => Editor.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Editor
          {...state}
          language='sql'
          value='SELECT * FROM table WHERE id=34'
          height='5rem'
          theme='vs-dark'
          options={{ minimap: { enabled: false } }}
        />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
