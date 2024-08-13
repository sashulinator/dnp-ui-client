import { getUserRole } from '~/shared/roles/lib/get-user-role'

import Page from '~/entities/store-config/pages/create'
import { UserRole } from '~/shared/roles/types'
import { AccessGuard } from '~/shared/roles/widgets/access-guard'

export default function Component() {
  const role = getUserRole()

  return (
    <AccessGuard allowedRoles={[UserRole.Admin]} currentRole={role} roleIsChecking={false}>
      <Page />
    </AccessGuard>
  )
}
