import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { getRole } from '~/entities/user'
import AccessGuard from '~/entities/user/ui/access-guard'
import { type Route as IRoute, routeMap } from '~/shared/route'

RootRoutes.displayName = 'app-Routes'

export interface Props {
  className?: string
  renderLayout: (props: { route: IRoute }) => JSX.Element | null
}

export default function RootRoutes(props: Props): JSX.Element {
  return (
    <Routes>
      {Object.entries(routeMap).map(([key, route]) => (
        <Route
          key={key}
          path={route.getPath()}
          element={<_RoleGuard renderLayout={props.renderLayout} route={route} />}
        />
      ))}
    </Routes>
  )
}

/**
 * Private
 */

function _RoleGuard(props: {
  route: IRoute
  renderLayout: (props: { route: IRoute }) => JSX.Element | null
}): JSX.Element | null {
  const role = getRole()

  if (!props.route.rolesAllowed?.length) {
    return React.createElement(props.renderLayout, { route: props.route })
  }

  return (
    <AccessGuard allowed={props.route.rolesAllowed} current={role} isChecking={false}>
      {React.createElement(props.renderLayout, { route: props.route })}
    </AccessGuard>
  )
}
