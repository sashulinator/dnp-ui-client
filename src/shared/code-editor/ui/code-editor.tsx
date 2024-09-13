import AceEditor, { IAceEditorProps } from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import { c } from '~/utils/core'

export interface Props extends Omit<IAceEditorProps, 'className'> {
  className?: string | undefined
}

const displayName = 'ui-CodeEditor'

/**
 * ui-CodeEditor
 */
export default function Component(props: Props): JSX.Element {
  const { className, ...aceEditorProps } = props

  return (
    <AceEditor
      className={c(className, displayName)}
      width='100%'
      theme='monokai'
      {...aceEditorProps}
      setOptions={{
        useWorker: false,
        showGutter: false,
        ...props?.setOptions,
      }}
    />
  )
}

Component.displayName = displayName
