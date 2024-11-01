import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import type { Any } from '~/utils/core'
import { type Dictionary } from '~/utils/core'

import { type Route as IRoute } from '../../../models/route'

const NAME = 'route-Controller'

export interface Props<TPayload extends Dictionary, TContext extends Dictionary> {
  routeMap: Dictionary<IRoute<TPayload, TContext>>
  context: TContext
  /**
   * Вызовется вместо Route.render
   */
  render?: IRoute<TPayload, TContext>['render']
}

export default function Component<TPayload extends Dictionary, TContext extends Dictionary>(
  props: Props<TPayload, TContext>,
): JSX.Element {
  const { routeMap, context, render } = props

  return (
    <Routes>
      {Object.entries(routeMap).map(([key, route]) => {
        return (
          <Route
            key={key}
            path={route.getPath()}
            element={<RenderRoute context={context} render={render} route={route} />}
          />
        )
      })}
    </Routes>
  )
}

Component.displayName = NAME

/**
 * Private
 */

function RenderRoute<TPayload extends Dictionary, TContext extends Dictionary>(props: {
  route: IRoute<TPayload, TContext>
  context: TContext
  render: IRoute<TPayload, TContext>['render'] | undefined
}): JSX.Element {
  const { route, context } = props
  const location = useLocation()

  const redirect = route?.redirect?.({ route: route as IRoute<Any, Any>, context })

  if (redirect) {
    return <Navigate to={redirect.url} />
  }

  const key = route.generateKey?.(location, route as IRoute<Any, Any>)

  const render = props.render || route.render

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(render, { key, route: route as IRoute<any, any>, context })
}
