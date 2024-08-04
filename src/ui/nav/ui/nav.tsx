import { StarIcon } from '@radix-ui/react-icons'
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import './nav.scss'
import { api } from '~/entities/target-table'
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
        {Object.entries(routes).map(([key, route]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!route.navigatable || !(route as any).renderIcon) return null
          return (
            <Tooltip key={key} content={route.getName()}>
              <Button size='3' square={true} asChild variant='soft'>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Link to={(route.getURL as any)()}>{createElement((route as any).renderIcon)}</Link>
              </Button>
            </Tooltip>
          )
        })}
      </Flex>
      <Flex direction='column' gap='3'>
        {targetTableListFetcher.data?.items.map((targetTable) => {
          return (
            <Tooltip key={targetTable.kn} content={targetTable.name}>
              <Button size='3' square={true} asChild variant='soft'>
                <Link to={routes.targetTables_id.getURL(targetTable.kn)}>
                  <StarIcon />
                </Link>
              </Button>
            </Tooltip>
          )
        })}
      </Flex>
    </nav>
  )
}
Component.displayName = displayName
