import './nav.scss'

import { createElement } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'

import { api as dictionaryApi } from '~/entities/dictionary-table'
import { api } from '~/entities/operational-table'
import { getRole } from '~/entities/user'
import { type Route } from '~/lib/route'
import { getCurrent } from '~/lib/route/get-current'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import Icon, { map as iconMap } from '~/ui/icon'
import Logo from '~/ui/logo-icon'
import Tooltip from '~/ui/tooltip'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'ui-Nav'

/**
 * ui-Nav
 */
export default function Component(): JSX.Element {
  const operationalTableListFetcher = useQuery('oper', () => api.fetchList.request({ where: { nav: true } }), {
    keepPreviousData: true,
  })

  const dictionaryListFetcher = useQuery(
    'dictionary',
    () => dictionaryApi.fetchList.request({ where: { nav: true } }),
    {
      keepPreviousData: true,
    },
  )

  const role = getRole() || ''

  const location = useLocation()
  const navigatables = Object.entries(routes).filter(([, route]) => {
    if (!(route as Route).rolesAllowed) return route.navigatable
    return (route as Route).rolesAllowed?.includes(role) && route.navigatable
  })

  const current = getCurrent(`/${location.pathname.split('/')[1]}`)
  const currentOper = location.pathname.split('/')[2]
  const isExplorer = location.pathname.split('/')[3] === 'explorer'

  return (
    <nav className={c(displayName)}>
      <div className='logo'>
        <Button variant='outline' size='4' square={true} asChild>
          <Link to={routes.main.getURL()}>
            <Logo height='2rem' width='2rem' />
          </Link>
        </Button>
      </div>
      <Flex direction='column' gap='3'>
        {navigatables.map(([key, route]) => {
          const isCurrent = current === route && !isExplorer

          return (
            <Tooltip side='right' key={key} content={route.getName()}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link to={(route.getURL as any)()}>
                <Button size='3' square={true} variant={isCurrent ? 'solid' : 'soft'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {createElement((route as any).renderIcon)}
                </Button>
              </Link>
            </Tooltip>
          )
        })}
      </Flex>
      <Flex direction='column' gap='3'>
        {operationalTableListFetcher.data?.data.items.map((operationalTable) => {
          const isCurrent = currentOper === operationalTable.kn && isExplorer
          const iconName = ((operationalTable as any).iconName as keyof typeof iconMap) ?? 'Star'

          return (
            <Tooltip side='right' key={operationalTable.kn} content={operationalTable.name}>
              <Link
                to={routes.operationalTables_kn_explorer.getURL(operationalTable.kn, { name: operationalTable.name })}
              >
                {iconMap[iconName] ? (
                  <Button size='3' square={true} variant={isCurrent ? 'solid' : 'soft'}>
                    <Icon name={iconName} />
                  </Button>
                ) : (
                  <Button dangerouslySetInnerHTML={{ __html: iconName }} />
                )}
              </Link>
            </Tooltip>
          )
        })}
      </Flex>
      <Flex direction='column' gap='3'>
        {dictionaryListFetcher.data?.data.items.map((dictionaryTable) => {
          const isCurrent = currentOper === dictionaryTable.kn && isExplorer
          const iconName = ((dictionaryTable as any).iconName as keyof typeof iconMap) ?? 'Star'

          return (
            <Tooltip side='right' key={dictionaryTable.kn} content={dictionaryTable.name}>
              <Link to={routes.dictionaryTables_kn_explorer.getURL(dictionaryTable.kn, { name: dictionaryTable.name })}>
                {iconMap[iconName] ? (
                  <Button size='3' square={true} variant={isCurrent ? 'solid' : 'soft'}>
                    <Icon name={iconName} />
                  </Button>
                ) : (
                  <Button dangerouslySetInnerHTML={{ __html: iconName }} />
                )}
              </Link>
            </Tooltip>
          )
        })}
      </Flex>
    </nav>
  )
}

Component.displayName = displayName
