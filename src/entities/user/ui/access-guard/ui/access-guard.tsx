import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { routeMap } from '~/shared/route'
import Spinner from '~/shared/spinner'

export interface Props {
  allowed: string[]
  current: string | null
  isChecking: boolean
  children: ReactNode
}

export const NAME = 'user-AccessGuard'

export default function AccessGuard({ allowed, current, isChecking, children }: Props) {
  const accessGranted = !!current && allowed.includes(current)

  if (!accessGranted && !isChecking) {
    return <Navigate to={routeMap.main.getUrl()} />
  }

  return isChecking ? <Spinner /> : children
}

AccessGuard.displayName = NAME
