import { useMutation } from 'react-query'

import { type Login, LoginForm, setAccessToken, setRefreshToken } from '~/shared/auth'
import { api } from '~/shared/auth'
import { setAccessTokenExpiresAt } from '~/shared/auth/set-access-token-expires-at'
import { setRefreshTokenExpiresAt } from '~/shared/auth/set-refresh-token-expires-at'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import { c } from '~/utils/core'

const NAME = 'pages-Login'

export default function Component(): JSX.Element {
  const getTokenMutator = useMutation(api.getToken.request, {
    onSuccess: (data) => {
      setAccessToken(data.access_token)
      setRefreshToken(data.refresh_token)
      setAccessTokenExpiresAt(data.expires_in)
      setRefreshTokenExpiresAt(data.expires_in)
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
