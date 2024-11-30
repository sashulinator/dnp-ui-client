import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { Card, Column, Row, TextField, type TextFieldProps, TypedField } from '~/shared/form'
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
      <Card>
        <Row width='100%'>
          <Column width='50%'>
            <TypedField<Values, 'display', string, string, TextFieldProps<string>, HTMLInputElement>
              name='display'
              label='Отображение'
              disabled={disabled}
              component={TextField}
            />
          </Column>
          <Column width='50%' />
        </Row>
      </Card>
      <Card>
        <Column width='100%'>
          <Row width='100%'>
            <Flex width='100%'>
              <TypedField<Values, 'host', string, string, TextFieldProps<string>, HTMLInputElement>
                label='Хост'
                name='host'
                disabled={disabled}
                component={TextField}
              />
            </Flex>
            <Flex width='100px'>
              <TypedField<Values, 'port', string, string, TextFieldProps<string>, HTMLInputElement>
                label='Порт'
                name='port'
                type='number'
                disabled={disabled}
                component={TextField}
              />
            </Flex>
          </Row>
          <Row width='100%'>
            <Column width='50%'>
              <TypedField<Values, 'username', string, string, TextFieldProps<string>, HTMLInputElement>
                label='Пользователь'
                name='username'
                disabled={disabled}
                component={TextField}
              />
              <TypedField<Values, 'password', string, string, TextFieldProps<string>, HTMLInputElement>
                label='Пароль'
                name='password'
                disabled={disabled}
                component={TextField}
              />
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
