import { Link } from 'react-router5'
import './nav.scss'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'ui-Nav'

/**
 * ui-Nav
 */
export default function Component(): JSX.Element {
  return (
    <nav className={c(displayName)}>
      <div className='logo'>
        <Card variant='ghost' asChild style={{ display: 'grid', width: '5rem', height: '3rem' }}>
          <Link routeName='main'>
            <span style={{ placeSelf: 'center' }}>RDS</span>
          </Link>
        </Card>
      </div>
      <Flex direction='column' gap='6'>
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
