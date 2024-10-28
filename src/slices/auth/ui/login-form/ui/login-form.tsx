import Flex, { type FlexProps } from '~dnp/shared/flex'
import { TextField, type TextFieldProps, TypedField } from '~dnp/shared/form'
import { c } from '~dnp/utils/core'

import { type Login } from '../../../models/login'

export interface Props {
  className?: string | undefined
  root: FlexProps
}

const NAME = 'auth-LoginForm'

export default function Component(props: Props): JSX.Element {
  return (
    <Flex direction='column' gap='4' {...props.root} className={c(props.className, NAME)}>
      <TypedField<Login, 'email', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        name='email'
        label='Email'
      />
      <TypedField<Login, 'password', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        name='password'
        type='password'
        label='Пароль'
      />
    </Flex>
  )
}

Component.displayName = NAME
