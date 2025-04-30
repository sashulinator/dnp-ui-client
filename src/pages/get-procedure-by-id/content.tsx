import { useCallback, useMemo } from 'react'

import { Procedure } from '~/entities/processing'
import Button, { type ButtonProps, DangerButton } from '~/shared/button'
import Container from '~/shared/container'
import ErrorBoundary from '~/shared/error-boundary'
import Flex from '~/shared/flex'
import Form, { Card, Column, type FormProps, Row, useField } from '~/shared/form'
import Icon from '~/shared/icon'
import Labeled from '~/shared/labeled'
import { Main } from '~/shared/page'
import Section from '~/shared/section'
import TextInput from '~/shared/text-input'
import Editor, { type EditorProps } from '~/slices/monaco-editor'
import { parseSafe } from '~/utils/json'

export interface Props {
  className?: string | undefined
  editor: EditorProps
  form: FormProps
  saveButton: ButtonProps
}

const NAME = 'page-getProcedureById-content'

export default function Component(props: Props): JSX.Element {
  const { editor, saveButton, form } = props
  //
  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Form
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(form as any)}
            component={useCallback(() => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { input } = useField('input', { subscription: { value: true } })

              const value = parseSafe(input.value) as any

              const rootBlock = value?.params?.[0]?.component?.props?.rootBlock
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const deserializedRootBlock = useMemo(() => Procedure.LayoutSchema.propToFunction(rootBlock), [rootBlock])

              return (
                <Flex direction='column' width='100%' gap='4'>
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
                            <Procedure.LayoutSchema.default
                              context={{ columns: [], isEditingMode: true }}
                              rootBlock={deserializedRootBlock}
                            />
                          </Flex>
                        </Card>
                      </ErrorBoundary>
                    )}
                  </Flex>
                  <Editor {...input} {...editor} height='45vh' />
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
