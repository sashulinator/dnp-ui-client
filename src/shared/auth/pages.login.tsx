import qs from 'qs'
import { useMutation } from 'react-query'

import { history, routes } from '~/app/route'
import { LoginForm, type LoginFormValues, auth } from '~/shared/auth'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import Logo from '~/shared/logo-icon'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { c, fns } from '~/utils/core'
import { isDev, preventDefault } from '~/utils/core-client'

import { notify } from '../notification-list-store'

const NAME = 'pages-Login'

export default function Component(): JSX.Element {
  const getTokenMutator = useMutation(auth.login.bind(auth), {
    onSuccess: () => {
      const searchQuery = qs.parse(location.search, { ignoreQueryPrefix: true })
      history.push(searchQuery.redirect?.toString() || routes.main.getPath())
    },
    onError: () => {
      notify({ title: 'Ошибка', type: 'error' })
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
        <Flex direction='column' gap='6'>
          <Flex width='100%' justify='center' align='end' gap='4'>
            <Flex align='center' justify='center' gap='2'>
              <Logo width='1.5rem' height='1.5rem' />
              <Text size='6' weight='medium'>
                НСИ
              </Text>
            </Flex>
            <Tooltip content='Версия'>
              <Text size='2' color='gray'>
                {isDev() ? 'dev' : window.ENV.VERSION}
              </Text>
            </Tooltip>
          </Flex>
          <Flex asChild direction='column' gap='6'>
            <form onSubmit={fns(preventDefault, form.submit)}>
              <FForm form={form} render={LoginForm} root={{ style: { width: '15rem' } }} />
              <Button disabled={getTokenMutator.isLoading} onClick={form.submit}>
                Войти
              </Button>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </main>
  )
}

Component.displayName = NAME
