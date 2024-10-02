import { matchPath } from 'react-router-dom'

import { routeMap } from '~/shared/route'

import { type Route } from '../models/route'

export function getCurrent(pathname: string): Route {
  const route = Object.values(routeMap).find((route) => matchPath(route.getPath(), pathname))
  return route === undefined ? routeMap.notFound : route
}
