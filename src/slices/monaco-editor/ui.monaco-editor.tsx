import Editor, { type EditorProps } from '@monaco-editor/react'

import { useState } from 'react'

import { globalController } from '~/shared/theme'

export interface Props extends EditorProps {}

const NAME = 'dnp-MonacoEditor'

export default function Component(props: Props): JSX.Element {
  const [theme, setheme] = useState(globalController.get())

  globalController.subscribe(setheme)

  return <Editor height='100px' theme={theme.name === 'dark' ? 'vs-dark' : 'light'} {...props} />
}

Component.displayName = NAME
