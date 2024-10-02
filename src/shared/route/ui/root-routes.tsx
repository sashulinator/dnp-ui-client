import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

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
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          {Object.entries(routeMap).map(([key, route]) => (
            <Route
              key={key}
              path={route.getPath()}
              element={<_RoleGuard renderLayout={props.renderLayout} route={route} />}
            />
          ))}
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
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
