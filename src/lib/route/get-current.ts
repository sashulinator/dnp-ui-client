import { matchPath } from 'react-router-dom'

import { routes } from '~/old-shared/routes'

import { Route } from './types/route'

export function getCurrent(pathname: string): Route {
  const route = Object.values(routes).find((route) => matchPath(route.getPath(), pathname))
  return route === undefined ? routes.notFound : route
}
