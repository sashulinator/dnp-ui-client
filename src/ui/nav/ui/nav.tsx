import { StarIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import './nav.scss'
import { api } from '~/entities/target-table'
import { routes } from '~/shared/routes'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
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
        <Card variant='ghost' asChild style={{ display: 'grid', width: '5rem', height: '3rem' }}>
          <Link to={routes.main.getURL()}>
            <span style={{ placeSelf: 'center' }}>DNP</span>
          </Link>
        </Card>
      </div>
      <Flex direction='column' gap='6'>
        {targetTableListFetcher.data?.items.map((targetTable) => {
          return (
            <Tooltip key={targetTable.kn} content={targetTable.name}>
              <Card variant='ghost' asChild={true} style={{ display: 'grid', width: '5rem', height: '3rem' }}>
                <Link to='#'>
                  <span style={{ placeSelf: 'center' }}>
                    <StarIcon />
                  </span>
                </Link>
              </Card>
            </Tooltip>
          )
        })}
        {/* <Card variant='ghost' asChild={true} style={{ display: 'grid', width: '5rem', height: '3rem' }}>
          <Link routeName='uni'>
            <span style={{ placeSelf: 'center' }}>Uni</span>
          </Link>
        </Card> */}
      </Flex>
    </nav>
  )
}
Component.displayName = displayName
