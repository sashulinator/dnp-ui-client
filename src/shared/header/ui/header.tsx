import './header.scss'

import { Avatar } from '@radix-ui/themes'

import { auth } from '~/shared/auth'
import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { HighlightedText } from '~/shared/text'
import { Switch } from '~/shared/theme'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = 'dnp-header-Header'

/**
 * dnp-header-Header
 */
export default function Component(): JSX.Element {
  const isProd = localStorage.getItem('env') === 'production'
  const isStrict = localStorage.getItem('devReactStrictMode') === 'true'

  return (
    <header className={c(NAME)}>
      <Flex height='100%' width='100%' justify='between' align='center'>
        <Flex gap='2'>
          {process.env.NODE_ENV === 'development' && (
            <Flex gap='2'>
              <HighlightedText color={isProd ? 'green' : 'red'}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  production
                  <Checkbox
                    variant='soft'
                    defaultChecked={isProd}
                    onCheckedChange={(value): void => {
                      if (value) {
                        localStorage.setItem('env', 'production')
                      } else {
                        localStorage.setItem('env', 'development')
                      }
                      location.reload()
                    }}
                  />
                </label>
              </HighlightedText>
              <HighlightedText color={isStrict ? 'green' : 'red'}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  strictMode
                  <Checkbox
                    variant='soft'
                    defaultChecked={isStrict}
                    onCheckedChange={(value): void => {
                      localStorage.setItem('devReactStrictMode', String(value))
                      location.reload()
                    }}
                  />
                </label>
              </HighlightedText>
            </Flex>
          )}

          {/* {isDev() && (
            <Flex gap='4' direction={'column'}>
              <Select.Root
                size='1'
                defaultValue={localStorage.getItem('DEV_resource_role') || 'USE PRODUCTION ROLES'}
                onValueChange={(value) => {
                  localStorage.setItem('DEV_resource_role', value)
                  window.location.reload()
                }}
              >
                <Select.Trigger
                  style={{
                    backgroundColor: Object.values(roles).includes(localStorage.getItem('DEV_resource_role') || '')
                      ? 'var(--red-3)'
                      : 'var(--green-3)',
                    color: Object.values(roles).includes(localStorage.getItem('DEV_resource_role') || '')
                      ? 'var(--red-11)'
                      : 'var(--green-11)',
                    boxShadow: 'none',
                  }}
                />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value={'USE PRODUCTION ROLES'}>USE PRODUCTION ROLES</Select.Item>
                    <Select.Item value={roles.admin}>Администратор</Select.Item>
                    <Select.Item value={roles.approver}>Согласующий</Select.Item>
                    <Select.Item value={roles.operator}>Оператор</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          )} */}
        </Flex>

        <Flex className={`${NAME}_settings`} gap='4' align='center'>
          <Switch />
          {auth.tokenizer?.decoded?.preferred_username && (
            <Flex gap='1'>
              <Avatar
                radius='full'
                size='1'
                src={auth.tokenizer?.decoded?.picture}
                fallback={auth.tokenizer?.decoded?.preferred_username[0]}
              />
              <HighlightedText>{auth.tokenizer?.decoded?.preferred_username}</HighlightedText>
            </Flex>
          )}
          <Button variant='ghost' size='1' onClick={() => auth.logout()}>
            Выйти
          </Button>
        </Flex>
      </Flex>
    </header>
  )
}

Component.displayName = NAME
