import { api, auth } from '~/app/auth'
import { getReturnRedirect, history, routes } from '~/app/route'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import Logo from '~/shared/logo-icon'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { LoginForm, type LoginFormValues, getDateIn } from '~/slices/auth'
import { c, fns } from '~/utils/core'
import { isDev, preventDefault } from '~/utils/core-client'
import { notifyError } from '~notification'

const NAME = 'pages-Login'

export default function Component(): JSX.Element {
  const getTokenMutator = api.getTokens.useMutation({
    onSuccess: ({ data }) => {
      auth.login({
        accessToken: data.access_token,
        accessTokenExpiresAt: getDateIn(data.expires_in - 5).getTime(),
        refreshToken: data.refresh_token,
        refreshTokenExpiresAt: getDateIn(data.refresh_expires_in - 5).getTime(),
      })
      const redirect = getReturnRedirect()
      history.push(redirect || routes.main.getPath())
    },
    onError: (error) => {
      notifyError({ type: 'error', error })
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
