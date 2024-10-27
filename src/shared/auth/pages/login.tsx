import qs from 'qs'
import { useMutation } from 'react-query'

import { history, routes } from '~dnp/app/route'
import { type Login, LoginForm } from '~dnp/shared/auth'
import { api } from '~dnp/shared/auth'
import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import FForm, { useCreateForm } from '~dnp/shared/form'
import { c } from '~dnp/utils/core'

import { getDateIn } from '../lib/get-date-in'
import { globalStore } from '../models/global-store'

const NAME = 'pages-Login'

export default function Component(): JSX.Element {
  const getTokenMutator = useMutation(api.getToken.request, {
    onSuccess: (data) => {
      globalStore.getState().set({
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
        accessTokenExpiresAt: getDateIn(data.data.expires_in).toString(),
        refreshTokenExpiresAt: getDateIn(data.data.expires_in).toString(),
      })

      const searchQuery = qs.parse(location.search, { ignoreQueryPrefix: true })
      history.push(searchQuery.redirect?.toString() || routes.main.getPath())
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
