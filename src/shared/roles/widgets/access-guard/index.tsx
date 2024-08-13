import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { Spinner } from '@radix-ui/themes'
import { UserRole } from '../../types/roles'

interface Props {
  allowedRoles: UserRole[]
  currentRole: UserRole | null
  roleIsChecking: boolean
  children: ReactNode
}

export const AccessGuard = ({ allowedRoles, currentRole, roleIsChecking, children }: Props) => {
  const accessGranted = !!currentRole && allowedRoles.includes(currentRole)

  if (!accessGranted && !roleIsChecking) {
    return <Navigate to='/' />
  }

  return roleIsChecking ? <Spinner /> : children
}
