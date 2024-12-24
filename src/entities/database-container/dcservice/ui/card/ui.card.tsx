import { Avatar } from '@radix-ui/themes'

import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import { type Dcservice } from '../../models'

export type CardDcservice = Pick<Dcservice, 'host' | 'port' | 'display'>

export interface Props {
  className?: string | undefined
  dcservice: CardDcservice | undefined
}

const NAME = 'dnp-databaseContainer-dcservice-Card'
const FIGURE_SPACE = ' ' // https://ru.wikipedia.org/wiki/Неразрывный_пробел

export default function Component(props: Props): JSX.Element {
  const { dcservice } = props

  return (
    <Flex className={c(props.className, NAME)} width='100%' align='center'>
      {dcservice && (
        <Avatar mr='2' size='3' radius='full' fallback={<Icon width='1.4rem' height='1.4rem' name='Postgres' />} />
      )}
      <Flex direction='column'>
        {dcservice ? dcservice.display : FIGURE_SPACE}
        <Text size='1' color='gray'>
          {dcservice ? `${dcservice.host}:${dcservice.port}` : FIGURE_SPACE}
        </Text>
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
