import { isDev } from '~dnp/utils/core-client'

import { globalStore } from '../models/global-store'

export function isResourceRoles(roles: string[] | undefined) {
  if (!roles?.length) return true

  if (isDev()) {
    return roles.includes(localStorage.getItem('DEV_resource_role') || '')
  }

  const jwtPayload = globalStore.getState().getJwtPayload()
  const jwtRoles = jwtPayload?.resource_access.account.roles || []
  return jwtRoles.some((role) => roles?.includes(role))
}

export function isRealmRoles(rolesAllowed: string[]) {
  const jwtPayload = globalStore.getState().getJwtPayload()
  const roles = jwtPayload?.resource_access.account.roles || []
  return roles.some((role) => rolesAllowed?.includes(role))
}
