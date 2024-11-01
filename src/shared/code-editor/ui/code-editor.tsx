// import 'ace-builds/src-noconflict/theme-monokai'
import AceEditor, { type IAceEditorProps } from 'react-ace'

import { c } from '~/utils/core'

export interface Props extends Omit<IAceEditorProps, 'className'> {
  className?: string | undefined
}

const NAME = 'ui-CodeEditor'

/**
 * ui-CodeEditor
 */
export default function Component(props: Props): JSX.Element {
  const { className, ...aceEditorProps } = props

  return (
    <AceEditor
      className={c(className, NAME)}
      width='100%'
      // theme='monokai'
      {...aceEditorProps}
      setOptions={{
        useWorker: false,
        showGutter: false,
        ...props?.setOptions,
      }}
    />
  )
}

Component.displayName = NAME
