import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { Card, Column, Field, Row } from '~/shared/form'
import Labeled from '~/shared/labeled'
import NumberInput from '~/shared/number-input'
import { InputSelect } from '~/shared/select'
import TextInput from '~/shared/text-input'
import { c } from '~/utils/core'

import { SLICE } from '../constants.slice'
import { type Dcservice, type DcserviceCreateInput } from '../types'

export interface Props {
  className?: string | undefined
  disabled?: boolean
}

export type Values = Pick<Dcservice, 'client' | 'display' | 'host' | 'port' | 'username' | 'password' | 'entryDatabase'>

const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { disabled = false } = props

  return (
    <Column className={c(props.className, NAME)}>
      <Card label='Основное'>
        <Row width='100%'>
          <Column width='50%'>
            <Field.default<string> name={'display' satisfies keyof Values}>
              {({ input }) => (
                <Flex direction='column'>
                  <Labeled label='Отображение'>
                    <TextInput {...input} clearable={true} disabled={disabled} type='text' />
                  </Labeled>
                </Flex>
              )}
            </Field.default>
          </Column>
          <Column width='50%' />
        </Row>
      </Card>
      <Card label='Соединение'>
        <Column width='100%'>
          <Row width='100%'>
            <Column width='50%'>
              <Flex width='100%' direction='column'>
                <Field.default<string> name={'client' satisfies keyof Values}>
                  {({ input }) => (
                    <Labeled label='Клиент'>
                      <InputSelect.default
                        {...input}
                        clearable={true}
                        variant='soft'
                        disabled={disabled}
                        options={[
                          { value: 'postgres', display: 'Postgres' },
                          { value: 'greenplum', display: 'Greenplum' },
                        ]}
                      />
                    </Labeled>
                  )}
                </Field.default>
              </Flex>
            </Column>
            <Column width='50%' />
          </Row>
          <Row width='100%'>
            <Field.default<string> name={'host' satisfies keyof Values}>
              {({ input }) => (
                <Flex direction='column' width='100%'>
                  <Labeled label='Хост'>
                    <TextInput {...input} clearable={true} variant='soft' disabled={disabled} type='text' />
                  </Labeled>
                </Flex>
              )}
            </Field.default>
            <Field.default<number>
              name={'port' satisfies keyof Values}
              type='number'
              parse={(v) => (v ? Number(v) : (undefined as unknown as number))}
            >
              {({ input }) => (
                <Flex direction='column' width='100px'>
                  <Labeled label='Порт'>
                    <NumberInput {...input} value={input.value} clearable={true} variant='soft' disabled={disabled} />
                  </Labeled>
                </Flex>
              )}
            </Field.default>
          </Row>
          <Row width='100%'>
            <Column width='50%'>
              <Field.default<string> name={'username' satisfies keyof Values}>
                {({ input }) => (
                  <Flex direction='column'>
                    <Labeled label='Пользователь'>
                      <TextInput {...input} clearable={true} variant='soft' disabled={disabled} />
                    </Labeled>
                  </Flex>
                )}
              </Field.default>
              <Field.default<string> name={'password' satisfies keyof Values}>
                {({ input }) => (
                  <Flex direction='column'>
                    <Labeled label='Пароль'>
                      <TextInput {...input} clearable={true} variant='soft' disabled={disabled} type='password' />
                    </Labeled>
                  </Flex>
                )}
              </Field.default>
            </Column>
            <Column width='50%' />
          </Row>
          <Row width='100%'>
            <Column width='50%'>
              <Field.default<Values['entryDatabase']> name={'entryDatabase' satisfies keyof Values}>
                {({ input }) => (
                  <Flex direction='column'>
                    <Labeled label='База данных'>
                      <TextInput {...input} clearable={true} variant='soft' disabled={disabled} />
                    </Labeled>
                  </Flex>
                )}
              </Field.default>
            </Column>
            <Column width='50%' />
          </Row>
        </Column>
      </Card>
    </Column>
  )
}

Component.displayName = NAME

Component.toDcservice = (values: Values): DcserviceCreateInput => {
  return {
    ...values,
    port: Number(values.port),
  }
}
Component.toValues = (values: DcserviceCreateInput): Values => {
  return values
}

export type { Props as FormProps }
