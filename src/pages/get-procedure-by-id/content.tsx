import { useCallback, useMemo, useState } from 'react'

import { Dcservice } from '~/entities/database-container'
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
import Separator from '~/shared/separator'
import TextInput from '~/shared/text-input'
import Editor, { type EditorProps } from '~/slices/monaco-editor'
import { generateId } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { parseSafe } from '~/utils/json'
import { type Atom } from '~/utils/store'
import { notifyError } from '~notification'

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
              const [isSingleMode, setIsSingleMode] = useState(false)
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
                () => ({
                  columns: [{ name: 'firstname' }, { name: 'lastname' }, { name: 'age' }, { name: 'sex' }],
                  isSingleMode,
                  parentFieldName: undefined,
                  form: form.form,
                  api: {
                    dcservice: Dcservice.api,
                  },
                  isEditingMode: true,
                }),
                [deserializedRootBlock, isSingleMode],
              )

              return (
                <Flex direction='column' width='100%' gap='4' key={renderKey}>
                  <Flex>
                    <Button variant='ghost' onClick={() => setIsSingleMode((s) => !s)}>
                      Включена {isSingleMode ? 'Потабличная' : 'Массовая'} настройка
                    </Button>
                  </Flex>
                  <Flex height='100%' width='100%' direction='column'>
                    {value?.params?.[0]?.component?.props?.rootBlock && (
                      <ErrorBoundary fallback='Недопустимая схема'>
                        <Card label='Процедура'>
                          <Flex width='100%' direction='column' gap='4'>
                            <Row width='100%'>
                              <Column flexBasis='50%'>
                                <Flex direction='column'>
                                  <Labeled label='Название'>
                                    <TextInput value={value.name} disabled={true} />
                                  </Labeled>
                                </Flex>
                              </Column>
                              <Column flexBasis='50%'>
                                <DangerButton variant='soft' round={true} style={{ alignSelf: 'end' }}>
                                  <Icon name='Trash' />
                                </DangerButton>
                              </Column>
                            </Row>
                            <Separator style={{ width: '100%' }} />
                            <Procedure.LayoutSchema.default
                              onError={(e) => {
                                const { message, ...rest } = e
                                const err = rest as any
                                notifyError({
                                  description: `Ошибка в блоке "${(err as any).componentProps.block.id}" ${err.binding?.id ? `В binding "${err.binding.id}"` : ''} ${err.listenerIndex ? `В listeners[${err.listenerIndex}]` : ''}`,
                                  title: message,
                                })
                                // eslint-disable-next-line no-console
                                console.log(e.message)
                                // eslint-disable-next-line no-console
                                console.log(rest)
                              }}
                              context={context}
                              rootBlock={deserializedRootBlock}
                            />
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
