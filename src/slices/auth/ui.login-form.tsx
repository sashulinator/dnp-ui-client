import Flex, { type FlexProps } from '~/shared/flex'
import { StringField, type StringFieldProps, TypedField } from '~/shared/form'
import { c } from '~/utils/core'

export type Values = {
  email: string
  password: string
}

export interface Props {
  className?: string | undefined
  root: FlexProps
}

const NAME = 'auth-LoginForm'

export default function Component(props: Props): JSX.Element {
  return (
    <Flex direction='column' gap='4' {...props.root} className={c(props.className, NAME)}>
      <TypedField<Values, 'email', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        name='email'
        label='Email'
      />
      <TypedField<Values, 'password', string, string, StringFieldProps, HTMLInputElement>
        component={StringField}
        name='password'
        type='password'
        label='Пароль'
      />
    </Flex>
  )
}

Component.displayName = NAME

export { type Props as LoginFormProps }

export { type Values as LoginFormValues }
