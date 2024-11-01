import Flex, { type FlexProps } from '~/shared/flex'
import { TextField, type TextFieldProps, TypedField } from '~/shared/form'
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
      <TypedField<Values, 'email', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
        name='email'
        label='Email'
      />
      <TypedField<Values, 'password', string, string, TextFieldProps<string>, HTMLInputElement>
        component={TextField}
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
