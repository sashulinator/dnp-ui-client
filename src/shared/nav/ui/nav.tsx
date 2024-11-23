import './nav.scss'

import { createElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

import type { AppRoute } from '~/app/route'
import { routes } from '~/app/route'
import { getCurrent } from '~/app/route'
import { auth } from '~/shared/auth'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Logo from '~/shared/logo-icon'
import Separator from '~/shared/separator'
import Tooltip from '~/shared/tooltip'
import LinkMenu from '~/slices/link-menu'
import type { TreeItem } from '~/slices/link-menu/ui/link-menu/widgets.item'
import { api as storeApi } from '~/slices/store'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = 'dnp-nav-Nav'

/**
 * dnp-nav-Nav
 */
export default function Component(): JSX.Element {
  const location = useLocation()
  const navigatables = Object.entries(routes).filter(([, route]: [unknown, AppRoute]) => {
    if (!route.payload.navigatable) return false
    if (route.payload.rolesAllowed) return route.payload?.rolesAllowed.some((role) => auth.hasRole(role, 'dnp'))
    return true
  })

  const current = getCurrent(routes, `/${location.pathname.split('/')[1]}`)
  const isExplorer = location.pathname.split('/')[3] === 'explorer'

  const name = 'navMenu'

  const storeFetcher = storeApi.getByName.useCache({ name })

  const linkMenuTree = storeFetcher.data?.data as TreeItem[]

  return (
    <nav className={c(NAME)}>
      <Flex className='container' direction='column' align='center' gap='2' pt='8px'>
        <Button variant='outline' size='2' square={true} asChild>
          <Link to={routes.main.getUrl()}>
            <Logo height='1rem' width='2rem' />
          </Link>
        </Button>
        <Separator />
        {navigatables.map(([key, route]) => {
          const isCurrent = current === route && !isExplorer

          return (
            <Tooltip side='right' key={key} content={route.getName()}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link to={(route.getUrl as any)()}>
                <Button
                  size='2'
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  color={(route as any).payload?.iconColor}
                  square={true}
                  variant={isCurrent ? 'solid' : 'soft'}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {createElement((route as any).payload.renderIcon)}
                </Button>
              </Link>
            </Tooltip>
          )
        })}
        <Separator />
        {linkMenuTree?.map((item, i) => <LinkMenu tree={item} key={i} />)}
      </Flex>
    </nav>
  )
}

Component.displayName = NAME
