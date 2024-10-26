import './header.scss'

import { routes } from '~dnp/app/route'
import { type Role, getRole, roles, setRole } from '~dnp/entities/user'
import Button from '~dnp/shared/button'
import Checkbox from '~dnp/shared/checkbox'
import Flex from '~dnp/shared/flex'
import Link from '~dnp/shared/link'
import Logo from '~dnp/shared/logo-icon'
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
  const role = getRole()

  return (
    <header className={c(NAME)}>
      <Flex className='logo' align='center' justify='center'>
        <Button variant='outline' size='2' square={true} asChild>
          <Link to={routes.main.getUrl()}>
            <Logo height='1rem' width='2rem' />
          </Link>
        </Button>
      </Flex>
      <div className={`${NAME}_breadscrumbs`}>
        {process.env.NODE_ENV === 'development' && (
          <Flex justify='center' align='center' gap='2'>
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
      </div>
      <Flex className={`${NAME}_settings`} gap='4' align='center'>
        {isDev() && (
          <Flex gap='4' direction={'column'}>
            <Select.Root
              size='1'
              defaultValue={role as string}
              onValueChange={(value) => {
                setRole(value as Role)
                window.location.reload()
              }}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Item value={roles.Admin}>Администратор</Select.Item>
                  <Select.Item value={roles.Approver}>Согласующий</Select.Item>
                  <Select.Item value={roles.Operator}>Оператор</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>
        )}
        <Switch />
      </Flex>
    </header>
  )
}

Component.displayName = NAME
