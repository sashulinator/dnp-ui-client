import Flex from '~/shared/flex'
import { c } from '~/utils/core'

import { useContext } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../root'
import Item from '../widgets/item'

export interface Props {
  className?: string | undefined
}

export const NAME = `${ROOT_NAME}-c-List`

export default function Component(props: Props): JSX.Element {
  const { className } = props

  const { loading = false, paths = [], onPathChange, explorer: data } = useContext()

  return (
    <Flex direction='column' gap='1' className={c(className, NAME)}>
      {data &&
        data.items.map((item) => {
          return (
            <Item
              idKey={data.idKey}
              key={item.data[data.idKey as (typeof item.data)[keyof typeof item.data]]}
              style={{ cursor: item.type !== 'row' ? 'pointer' : 'default' }}
              onDoubleClick={() => {
                if (loading) return
                onPathChange?.(
                  [
                    ...(paths || []),
                    { name: item.data[data.idKey as (typeof item.data)[keyof typeof item.data]], type: item.type },
                  ],
                  item,
                )
              }}
              item={item}
            />
          )
        })}
    </Flex>
  )
}

Component.displayName = NAME
