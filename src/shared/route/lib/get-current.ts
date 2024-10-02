import { matchPath } from 'react-router-dom'

import { routes } from '~/shared/route'

import { type Route } from '../models/route'

export function getCurrent(pathname: string): Route {
  const route = Object.values(routes).find((route) => matchPath(route.getPath(), pathname))
  return route === undefined ? routes.notFound : route
}
