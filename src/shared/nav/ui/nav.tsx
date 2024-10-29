import './nav.scss'

import { createElement } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'

import { AppRoute, routes } from '~dnp/app/route'
import { getCurrent } from '~dnp/app/route'
import { api as dictionaryApi } from '~dnp/entities/dictionary-table'
import { api } from '~dnp/entities/operational-table'
import { auth } from '~dnp/shared/auth'
import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import Icon, { map as iconMap } from '~dnp/shared/icon'
import Logo from '~dnp/shared/logo-icon'
import Separator from '~dnp/shared/separator'
import Tooltip from '~dnp/shared/tooltip'
import { c } from '~dnp/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = 'dnp-nav-Nav'

/**
 * dnp-nav-Nav
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

  const location = useLocation()
  const navigatables = Object.entries(routes).filter(([, route]: [unknown, AppRoute]) => {
    if (!route.payload.navigatable) return false
    if (route.payload.rolesAllowed) return route.payload?.rolesAllowed.some((role) => auth.hasRole(role, 'dnp'))
    return true
  })

  const current = getCurrent(routes, `/${location.pathname.split('/')[1]}`)
  const currentOper = location.pathname.split('/')[2]
  const isExplorer = location.pathname.split('/')[3] === 'explorer'

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

        {Boolean(operationalTableListFetcher.data?.data.items.length) && (
          <>
            <Separator />
            <Flex direction='column' gap='2'>
              {operationalTableListFetcher.data?.data.items.map((operationalTable) => {
                const isCurrent = currentOper === operationalTable.kn && isExplorer
                const iconName = ((operationalTable as any).iconName as keyof typeof iconMap) ?? 'Star'

                return (
                  <Tooltip side='right' key={operationalTable.kn} content={operationalTable.name}>
                    <Link
                      to={routes.operationalTables_kn_explorer.getUrl(operationalTable.kn, {
                        name: operationalTable.name,
                      })}
                    >
                      {iconMap[iconName] ? (
                        <Button size='2' square={true} variant={isCurrent ? 'solid' : 'soft'}>
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
          </>
        )}
        {Boolean(dictionaryListFetcher.data?.data.items.length) && (
          <>
            <Separator />
            <Flex direction='column' gap='3'>
              {dictionaryListFetcher.data?.data.items.map((dictionaryTable) => {
                const isCurrent = currentOper === dictionaryTable.kn && isExplorer
                const iconName = ((dictionaryTable as any).iconName as keyof typeof iconMap) ?? 'Star'

                return (
                  <Tooltip side='right' key={dictionaryTable.kn} content={dictionaryTable.name}>
                    <Link
                      to={routes.dictionaryTables_explorerFindManyAndCount.getUrl(dictionaryTable.kn, {
                        name: dictionaryTable.name,
                      })}
                    >
                      {iconMap[iconName] ? (
                        <Button size='2' square={true} variant={isCurrent ? 'solid' : 'soft'}>
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
          </>
        )}
      </Flex>
    </nav>
  )
}

Component.displayName = NAME
