import { matchPath } from 'react-router-dom'

import { type Dictionary } from '~/utils/core'

import { type Route } from '../models/route'

export function getCurrent<T extends Route>(routeMap: Dictionary<T>, pathname: string): T {
  const route = Object.values(routeMap).find((route) => matchPath(route.getPath(), pathname))
  return route === undefined ? routeMap.notFound : route
}
