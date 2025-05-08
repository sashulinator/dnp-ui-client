import { Field } from 'react-final-form'

import Flex, { type FlexProps } from '~/shared/flex'
import TextInput from '~/shared/text-input'
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
    <Flex align='stretch' direction='column' gap='4' {...props.root} className={c(props.className, NAME)}>
      <Field<Values['email']> name='email'>
        {({ input }) => <TextInput variant='soft' placeholder='Логин' {...input} type='text' />}
      </Field>
      <Field<Values['password']> name='password'>
        {({ input }) => <TextInput variant='soft' placeholder='Пароль' {...input} type='text' />}
      </Field>
    </Flex>
  )
}

Component.displayName = NAME

export { type Props as LoginFormProps }

export { type Values as LoginFormValues }
