import { Field } from 'react-final-form'

import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { Card, Column, Row } from '~/shared/form'
import Labeled from '~/shared/labeled'
import TextInput from '~/shared/text-input'
import { c } from '~/utils/core'

import { SLICE } from '../../constants.slice'
import { type Dcservice, type DcserviceCreateInput } from '../../models'

export interface Props {
  className?: string | undefined
  disabled?: boolean
}

export type Values = Pick<Dcservice, 'display' | 'host' | 'port' | 'username' | 'password'>

const NAME = `${APP}-e-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { disabled = false } = props

  return (
    <Column className={c(props.className, NAME)}>
      <Card label='Основное'>
        <Row width='100%'>
          <Column width='50%'>
            <Field<string> name={'display' satisfies keyof Values}>
              {({ input }) => (
                <Flex direction='column'>
                  <Labeled label='Отображение'>
                    <TextInput {...input} clearable={true} disabled={disabled} type='text' />
                  </Labeled>
                </Flex>
              )}
            </Field>
          </Column>
          <Column width='50%' />
        </Row>
      </Card>
      <Card label='Соединение'>
        <Column width='100%'>
          <Row width='100%'>
            <Field<string> name={'host' satisfies keyof Values}>
              {({ input }) => (
                <Flex direction='column' width='100%'>
                  <Labeled label='Хост'>
                    <TextInput {...input} clearable={true} variant='soft' disabled={disabled} type='text' />
                  </Labeled>
                </Flex>
              )}
            </Field>
            <Field<number> name={'port' satisfies keyof Values} type='number' parse={Number}>
              {({ input }) => (
                <Flex direction='column' width='100px'>
                  <Labeled label='Порт'>
                    <TextInput {...input} clearable={true} variant='soft' disabled={disabled} type='number' />
                  </Labeled>
                </Flex>
              )}
            </Field>
          </Row>
          <Row width='100%'>
            <Column width='50%'>
              <Field<string> name={'username' satisfies keyof Values}>
                {({ input }) => (
                  <Flex direction='column'>
                    <Labeled label='Пользователь'>
                      <TextInput {...input} clearable={true} variant='soft' disabled={disabled} type='text' />
                    </Labeled>
                  </Flex>
                )}
              </Field>
              <Field<string> name={'password' satisfies keyof Values}>
                {({ input }) => (
                  <Flex direction='column'>
                    <Labeled label='Пароль'>
                      <TextInput {...input} clearable={true} variant='soft' disabled={disabled} type='text' />
                    </Labeled>
                  </Flex>
                )}
              </Field>
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
    client: 'postgres',
    port: Number(values.port),
  }
}
Component.toValues = (values: DcserviceCreateInput): Values => {
  return values
}

export type { Props as FormProps }
