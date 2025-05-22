import Flex from '~/shared/flex'
import { Field } from '~/shared/form'
import Labeled from '~/shared/labeled'
import TextInput from '~/shared/text-input'
import Editor from '~/slices/monaco-editor'
import { c } from '~/utils/core'

export type Column = {
  type: string
  name: string
  display?: string | undefined
}

export interface Props {
  className?: string | undefined
  columns: Column[] | undefined
}

export const NAME = 'dnp-databaseContainer-dcrow-Form'

export default function Component(props: Props): JSX.Element {
  const { columns = [] } = props

  return (
    <Flex className={c(props.className, NAME)} direction={'column'} gap='4'>
      {columns.map((item) => {
        if (item.type === 'sql') {
          return (
            <Field.default<string> name={item.name} key={item.name}>
              {({ input }) => {
                return (
                  <Editor
                    {...input}
                    value={String(input.value)}
                    height='12rem'
                    language='sql'
                    options={{
                      stickyScroll: { enabled: false },
                      minimap: { enabled: false },
                      lineNumbers: 'off',
                      scrollBeyondLastLine: false,
                      scrollbar: {
                        horizontal: 'hidden',
                        vertical: 'hidden',
                      },
                      overviewRulerLanes: 0, // Remove overview ruler
                      wordWrap: 'on', // or 'off' depending on desired behavior
                      renderLineHighlight: 'none', // Removes line highlight
                      contextmenu: false, // Disable context menu (right-click)
                      folding: false, // Disable code folding
                      glyphMargin: false, // Remove the glyph margin (for breakpoints, etc.)
                      hideCursorInOverviewRuler: true, // Hide cursor in overview ruler
                    }}
                  />
                )
              }}
            </Field.default>
          )
        }
        return (
          <Flex key={item.name} direction='column'>
            <Field.default<string> name={item.name}>
              {({ input }) => (
                <Labeled label={item.display || item.name}>
                  <TextInput {...input} />
                </Labeled>
              )}
            </Field.default>
          </Flex>
        )
      })}
    </Flex>
  )
}

Component.displayName = NAME
