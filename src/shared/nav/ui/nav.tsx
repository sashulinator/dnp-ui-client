import './nav.scss'

import { ScrollArea, Separator } from '@radix-ui/themes'

import { routes } from '~/app/route'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Link from '~/shared/link'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import DynamicRoutes from '../widgets/dynamic-routes'
import StaticRoutes from '../widgets/static-routes'

export interface Props {
  className?: string | undefined
}

const NAME = 'dnp-nav-Nav'

/**
 * dnp-nav-Nav
 */
export default function Component(): JSX.Element {
  return (
    <nav className={c(NAME)}>
      <Flex className='container' direction='column' align='center' gap='2' pt='8px'>
        <Flex width='100%' pl='1' pr='1'>
          <Button
            variant='outline'
            size='2'
            asChild
            style={{ width: '100%', paddingLeft: 'var(--space-4)', justifyContent: 'flex-start', boxShadow: 'none' }}
          >
            <Link to={routes.main.getUrl()}>
              <Icon name='Logo' />
              <Text style={{ marginLeft: '2px' }}>НСИ</Text>
            </Link>
          </Button>
        </Flex>
        <Separator />
        <ScrollArea>
          <Flex direction='column' width='100%' align='center' gap='2'>
            <Flex p='1' width='100%'>
              <StaticRoutes />
            </Flex>
            <Separator />
            <Flex p='1' width='100%'>
              <DynamicRoutes />
            </Flex>
            <Flex height='30vh' />
          </Flex>
        </ScrollArea>
      </Flex>
    </nav>
  )
}

Component.displayName = NAME
