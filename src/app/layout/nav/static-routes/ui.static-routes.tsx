import { useMemo } from 'react'

import LinkTree from '~/shared/link-tree'

import { getRoutesTree } from './routes-tree'

export interface Props {
  className?: string | undefined
}

const NAME = 'nav-Nav-w-StaticRoutes'

export default function Component(): JSX.Element {
  const lsName = 'nav-static-expanded'

  const expanded = useMemo(getFromLocalStorage, [])

  const routesTree = getRoutesTree()

  return <LinkTree onExpanded={setToLocalStorage} expanded={expanded} offset={0} tree={routesTree} />

  function getFromLocalStorage() {
    const value = localStorage.getItem(lsName)
    try {
      return value ? JSON.parse(value) : {}
    } catch (e) {
      return {}
    }
  }

  function setToLocalStorage(path: string, value: boolean) {
    const expanded = getFromLocalStorage()
    if (value) {
      expanded[path] = value
    } else {
      delete expanded[path]
    }
    localStorage.setItem(lsName, JSON.stringify(expanded))
  }
}

Component.displayName = NAME
