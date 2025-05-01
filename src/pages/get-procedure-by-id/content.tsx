import { useCallback, useMemo, useState } from 'react'

import { Procedure } from '~/entities/processing'
import Button, { type ButtonProps, DangerButton } from '~/shared/button'
import Container from '~/shared/container'
import ErrorBoundary from '~/shared/error-boundary'
import Flex from '~/shared/flex'
import Form, { Card, Column, type FormProps, Row } from '~/shared/form'
import Icon from '~/shared/icon'
import Labeled from '~/shared/labeled'
import { Main } from '~/shared/page'
import Section from '~/shared/section'
import TextInput from '~/shared/text-input'
import Editor, { type EditorProps } from '~/slices/monaco-editor'
import { generateId } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { parseSafe } from '~/utils/json'
import { type Atom } from '~/utils/store'

export interface Props {
  className?: string | undefined
  editor: EditorProps
  form: FormProps
  saveButton: ButtonProps
  formatButton: ButtonProps
  procedureState: Atom<string>
}

const NAME = 'page-getProcedureById-content'

export default function Component(props: Props): JSX.Element {
  const { editor, saveButton, procedureState, formatButton, form } = props

  const [renderKey, setRenderKey] = useState(generateId)
  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Form
            subscription={{ values: false }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(form as any)}
            render={useCallback(() => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useSubscribeUpdate(procedureState.subscribe)
              const string = procedureState.get()
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const value = parseSafe(string) as any

              const rootBlock = value?.params?.[0]?.component?.props?.rootBlock
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const deserializedRootBlock = useMemo(() => Procedure.LayoutSchema.propToFunction(rootBlock), [rootBlock])
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const context = useMemo(
                () => ({ columns: [], parentFieldName: undefined, isEditingMode: true }),
                [deserializedRootBlock],
              )

              return (
                <Flex direction='column' width='100%' gap='4' key={renderKey}>
                  <Flex height='100%' width='100%' direction='column'>
                    {value?.params?.[0]?.component?.props?.rootBlock && (
                      <ErrorBoundary fallback='Недопустимая схема'>
                        <Card label='Процедура'>
                          <Flex width='100%' direction='column' gap='4'>
                            <Row justify='between'>
                              <Column width='50%'>
                                <Flex direction='column'>
                                  <Labeled label='Название'>
                                    <TextInput value={value.name} disabled={true} />
                                  </Labeled>
                                </Flex>
                              </Column>
                              <DangerButton variant='soft' round={true}>
                                <Icon name='Trash' />
                              </DangerButton>
                            </Row>
                            <Procedure.LayoutSchema.default context={context} rootBlock={deserializedRootBlock} />
                          </Flex>
                        </Card>
                      </ErrorBoundary>
                    )}
                  </Flex>
                  <Flex gap='4'>
                    <Button variant='ghost' {...formatButton}>
                      Форматировать
                    </Button>
                    <Button variant='ghost' onClick={() => form.form.submit()}>
                      Вывести в консоль значение
                    </Button>
                    <Button
                      variant='ghost'
                      onClick={() => {
                        setRenderKey(generateId())
                        form.form.reset()
                      }}
                    >
                      Перерисовать
                    </Button>
                    <Button variant='ghost' onClick={() => form.form.change('query', 'hello' as any)}>
                      установить новые значения
                    </Button>
                  </Flex>
                  <Editor value={string} onChange={(v) => procedureState.set(v || '')} {...editor} height='45vh' />
                </Flex>
              )
            }, [])}
          />
        </Section>
        <Section size='1'>
          <Button {...saveButton}>Сохранить</Button>
        </Section>
      </Container>
    </Main>
  )
}

Component.displayName = NAME
