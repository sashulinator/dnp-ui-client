import { Container, Flex, Heading, Section, Select } from '@radix-ui/themes'
import { getUserRole, setUserRole } from '~/shared/roles/lib'
import { UserRole } from '~/shared/roles/types'
import { routes } from '~/shared/routes'

const displayName = 'page-Admin'

export default function AdminPage(): JSX.Element {
  const currentUserRole = getUserRole()

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>{routes.admin.getName()}</Heading>
          <Section size='1'>
            <Flex gap='4' direction={'column'}>
              <Select.Root size='3' defaultValue={currentUserRole as string} onValueChange={setUserRole}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value={UserRole.Admin}>Администратор</Select.Item>
                    <Select.Item value={UserRole.Approver}>Согласующий</Select.Item>
                    <Select.Item value={UserRole.Operator}>Оператор</Select.Item>
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
