import { useMemo } from 'react'

import Icon from '~/shared/icon'
import LinkTree, { type TreeItem } from '~/shared/link-tree'
import { api as storeApi } from '~/slices/store'

export interface Props {
  className?: string | undefined
}

type Item = {
  id: string
  name: string
  icon?: string
  children: Item[]
  description: string
  link: {
    url: string
    blank: boolean
  }
}

const NAME = 'nav-Nav-w-DynamicRoutes'

export default function Component(): JSX.Element {
  const name = 'navMenu'
  const lsName = 'nav-dynamic-expanded'
  const LINKS_STORAGE_KEY = 'nav-dynamic-links'

  const expanded = useMemo(getFromLocalStorage, [])

  const storeFetcher = storeApi.getByName.useCache(
    { name },
    {
      onSuccess: (data) => {
        localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(data))
      },
      keepPreviousData: true,
      initialData: {
        data: JSON.parse(localStorage.getItem(LINKS_STORAGE_KEY) || '[]'),
      },
    },
  )

  const routesTree = useMemo(() => toTreeItem((storeFetcher.data?.data || []) as Item[]), [storeFetcher.data?.data])

  return <LinkTree onExpanded={setToLocalStorage} expanded={expanded} offset={0} tree={routesTree} />

  function getFromLocalStorage() {
    const value = localStorage.getItem(lsName)
    try {
      return value ? JSON.parse(value) : {}
    } catch (e) {
      return {}
    }
  }

  function toTreeItem(items: Item[]): TreeItem[] {
    return items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        link: {
          url: item.link.url,
          blank: item.link.blank,
        },
        renderIcon: item.icon ? () => <Icon name={item.icon || ''} /> : undefined,
        children: toTreeItem(item.children || []),
      }
    })
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
