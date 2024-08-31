import './header.scss'

import { Role, getRole, roles, setRole } from '~/entities/user'
import Checkbox from '~/ui/checkbox'
import Flex from '~/ui/flex'
import Select from '~/ui/select'
import TextHighlighter from '~/ui/text-highlighter'
import { Switch } from '~/ui/theme'
import { c, isDev } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = 'ui-Header'

/**
 * ui-Header
 */
export default function Component(): JSX.Element {
  const isProd = localStorage.getItem('env') === 'production'
  const role = getRole()

  return (
    <header className={c(NAME)}>
      <div className={`${NAME}_breadscrumbs`}>
        {process.env.NODE_ENV === 'development' && (
          <Flex justify='center' align='center' gap='m'>
            <TextHighlighter color={isProd ? 'green' : 'red'}>
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
            </TextHighlighter>
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
