import { useMutation } from 'react-query'

import { history, routes } from '~dnp/app/route'
import { type Login, LoginForm, setAccessToken, setRefreshToken } from '~dnp/shared/auth'
import { api } from '~dnp/shared/auth'
import { setAccessTokenExpiresAt } from '~dnp/shared/auth/set-access-token-expires-at'
import { setRefreshTokenExpiresAt } from '~dnp/shared/auth/set-refresh-token-expires-at'
import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import FForm, { useCreateForm } from '~dnp/shared/form'
import { c } from '~dnp/utils/core'

const NAME = 'pages-Login'

export default function Component(): JSX.Element {
  const getTokenMutator = useMutation(api.getToken.request, {
    onSuccess: (data) => {
      setAccessToken(data.data.access_token)
      setRefreshToken(data.data.refresh_token)
      setAccessTokenExpiresAt(data.data.expires_in)
      setRefreshTokenExpiresAt(data.data.expires_in)

      history.push(routes.main.getPath())
    },
  })

  const form = useCreateForm<Login>(
    {
      onSubmit: (values) => {
        getTokenMutator.mutate(values)
      },
      initialValues: {},
    },
    { values: true, initialValues: true },
  )

  return (
    <main className={c(NAME)}>
      <Flex height='100%' justify='center' align='center'>
        <Flex direction='column' gap='6'>
          <FForm form={form} render={LoginForm} root={{ style: { width: '15rem' } }} />
          <Button disabled={getTokenMutator.isLoading} onClick={form.submit}>
            Войти
          </Button>
        </Flex>
      </Flex>
    </main>
  )
}

Component.displayName = NAME
