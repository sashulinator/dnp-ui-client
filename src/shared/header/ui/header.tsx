import './header.scss'

import { globalStore, resourceRoles } from '~dnp/shared/auth'
import Button from '~dnp/shared/button'
import Checkbox from '~dnp/shared/checkbox'
import Flex from '~dnp/shared/flex'
import Select from '~dnp/shared/select'
import { HighlightedText } from '~dnp/shared/text'
import { Switch } from '~dnp/shared/theme'
import { c } from '~dnp/utils/core'
import { isDev } from '~dnp/utils/core-client'

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
  const jwtPayload = globalStore().getJwtPayload()

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

          {isDev() && (
            <Flex gap='4' direction={'column'}>
              <Select.Root
                size='1'
                defaultValue={localStorage.getItem('DEV_recource_role') || 'USE PRODUCTION ROLES'}
                onValueChange={(value) => {
                  localStorage.setItem('DEV_recource_role', value)
                  window.location.reload()
                }}
              >
                <Select.Trigger
                  style={{
                    backgroundColor: Object.values(resourceRoles).includes(
                      localStorage.getItem('DEV_recource_role') || '',
                    )
                      ? 'var(--red-3)'
                      : 'var(--green-3)',
                    color: Object.values(resourceRoles).includes(localStorage.getItem('DEV_recource_role') || '')
                      ? 'var(--red-11)'
                      : 'var(--green-11)',
                    boxShadow: 'none',
                  }}
                />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value={'USE PRODUCTION ROLES'}>USE PRODUCTION ROLES</Select.Item>
                    <Select.Item value={resourceRoles.admin}>Администратор</Select.Item>
                    <Select.Item value={resourceRoles.approver}>Согласующий</Select.Item>
                    <Select.Item value={resourceRoles.operator}>Оператор</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          )}
        </Flex>

        <Flex className={`${NAME}_settings`} gap='4' align='center'>
          <Switch />
          {jwtPayload?.preferred_username && <HighlightedText>{jwtPayload?.preferred_username}</HighlightedText>}
          <Button variant='ghost' size='1' onClick={globalStore.getState().clear}>
            Выйти
          </Button>
        </Flex>
      </Flex>
    </header>
  )
}

Component.displayName = NAME
