import { useEffect, useState } from 'react'
import { Item, fetchList } from '~/entities/process'
import { getUserRole } from '~/shared/roles/lib/get-user-role'
import { UserRole } from '~/shared/roles/types'
import { AccessGuard } from '~/shared/roles/widgets/access-guard'
import { routes } from '~/shared/routes'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Pagination from '~/ui/pagination'
import Section from '~/ui/section'

export interface Props {
  className?: string | undefined
}
const displayName = 'page-Processes'

/**
 * page-Processes
 */
function Page(): JSX.Element {
  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 10

  // Update skip when page changes
  useEffect(() => {
    setSkip((page - 1) * take)
  }, [page])

  const fetcherList = fetchList.useCache({ take, skip })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        <Section size='1'>
          <Heading>{routes.processes.getName()}</Heading>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            loading={fetcherList.isFetching}
            limit='10'
            totalElements={fetcherList.data?.total.toString()}
            onChange={setPage}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.id} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName

export default function Component() {
  const role = getUserRole()

  return (
    <AccessGuard allowedRoles={[UserRole.Admin, UserRole.Operator]} currentRole={role} roleIsChecking={false}>
      <Page />
    </AccessGuard>
  )
}
