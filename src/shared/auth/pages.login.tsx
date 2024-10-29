import qs from 'qs'
import { useMutation } from 'react-query'

import { history, routes } from '~dnp/app/route'
import { LoginForm, type LoginFormValues, auth } from '~dnp/shared/auth'
import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import FForm, { useCreateForm } from '~dnp/shared/form'
import { c, fns } from '~dnp/utils/core'
import { preventDefault } from '~dnp/utils/core-client'

const NAME = 'pages-Login'

export default function Component(): JSX.Element {
  const getTokenMutator = useMutation(auth.login.bind(auth), {
    onSuccess: () => {
      const searchQuery = qs.parse(location.search, { ignoreQueryPrefix: true })
      history.push(searchQuery.redirect?.toString() || routes.main.getPath())
    },
  })

  const form = useCreateForm<LoginFormValues>(
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
        <Flex asChild direction='column' gap='6'>
          <form onSubmit={fns(preventDefault, form.submit)}>
            <FForm form={form} render={LoginForm} root={{ style: { width: '15rem' } }} />
            <Button disabled={getTokenMutator.isLoading} onClick={form.submit}>
              Войти
            </Button>
          </form>
        </Flex>
      </Flex>
    </main>
  )
}

Component.displayName = NAME
