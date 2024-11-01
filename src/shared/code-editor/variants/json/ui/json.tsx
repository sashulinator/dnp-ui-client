import 'ace-builds/src-noconflict/mode-json'

import { c } from '~/utils/core'

import CodeEditor, { Props as CodeEditorProps } from '../../../ui/code-editor'

export interface Props extends Omit<CodeEditorProps, 'mode'> {
  className?: string | undefined
}

const displayName = 'ui-CodeEditor-v-Json'

/**
 * ui-CodeEditor-v-Json
 */
export default function Component(props: Props): JSX.Element {
  return <CodeEditor {...props} className={c(displayName, props.className)} mode='json' />
}

Component.displayName = displayName
