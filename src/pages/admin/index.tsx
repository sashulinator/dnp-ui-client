import { Container, Flex, Heading, Section, Select } from '@radix-ui/themes'

import { type Role, roles } from '~/entities/user'
import { getRole, setRole } from '~/entities/user/lib'
import { routes } from '~/shared/route'

const displayName = 'page-Admin'

export default function AdminPage(): JSX.Element {
  const currentUserRole = getRole() || undefined

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading>{routes.admin.getName()}</Heading>
          <Section size='1'>
            <Flex gap='4' direction={'column'}>
              <Select.Root
                size='3'
                defaultValue={currentUserRole as string}
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
          </Section>
        </Section>
      </Container>
    </main>
  )
}
