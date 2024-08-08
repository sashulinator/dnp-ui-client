import { StarIcon } from '@radix-ui/react-icons'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import './nav.scss'
import { api } from '~/entities/operational-table'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import Logo from '~/ui/logo'
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
  const targetTableListFetcher = api.fetchList.useCache({ where: { nav: true } })
  const navigatables = Object.entries(routes).filter(([, route]) => route.navigatable)

  return (
    <nav className={c(displayName)}>
      <div className='logo'>
        <Card
          variant='ghost'
          asChild
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            borderRadius: '0',
            height: '60px',
          }}
        >
          <Link to={routes.main.getURL()}>
            <Logo />
          </Link>
        </Card>
      </div>
      <Flex direction='column' gap='3'>
        {navigatables.map(([key, route]) => {
          return (
            <Tooltip side='right' key={key} content={route.getName()}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link to={(route.getURL as any)()}>
                <Button size='3' square={true} variant='soft'>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {createElement((route as any).renderIcon)}
                </Button>
              </Link>
            </Tooltip>
          )
        })}
      </Flex>
      <Flex direction='column' gap='3'>
        {targetTableListFetcher.data?.items.map((targetTable) => {
          return (
            <Tooltip side='right' key={targetTable.kn} content={targetTable.name}>
              <Link to={routes.targetTables_kn.getURL(targetTable.kn)}>
                <Button size='3' square={true} variant='soft'>
                  <StarIcon />
                </Button>
              </Link>
            </Tooltip>
          )
        })}
      </Flex>
    </nav>
  )
}

Component.displayName = displayName
