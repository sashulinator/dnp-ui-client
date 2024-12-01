import { useMutation } from 'react-query'

import { APP } from '~/app/constants.app'
import Button from '~/shared/button'
import { c } from '~/utils/core'

import { SLICE } from '../constants.slice'

export interface Props {
  className?: string | undefined
  request: () => Promise<boolean>
  disabled?: boolean
}

const NAME = `${APP}-e-${SLICE}-TestConnection`

export default function Component(props: Props): JSX.Element {
  const { request } = props

  const mutator = useMutation(request)

  return (
    <Button
      disabled={props.disabled}
      color={mutator.isSuccess ? 'green' : mutator.isError ? 'red' : ('' as 'green')}
      onClick={() => mutator.mutate()}
      className={c(props.className, NAME)}
    >
      {!mutator.isError && !mutator.isSuccess && !mutator.isLoading && 'Тестировать соединение'}
      {mutator.isSuccess && 'Успешное соединение'}
      {mutator.isError && 'Ошибка соединения'}
      {mutator.isLoading && 'Соединение...'}
    </Button>
  )
}

Component.displayName = NAME

export type { Props as TestConnectionProps }
