import { useContext } from 'react'

import Flex from '~/shared/flex'
import { c } from '~/utils/core'

import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'
import Item from '../../item'

export interface Props {
  className?: string | undefined
}

export const NAME = `${ROOT_NAME}-w-List`

/**
 * explorer-Viewer-w-List
 */
export default function Component(props: Props): JSX.Element {
  const { className } = props

  const { loading = false, paths = [], onPathChange, data } = useContext(context)

  return (
    <Flex direction='column' gap='1' className={c(className, NAME)}>
      {data &&
        data.items.map((item) => {
          return (
            <Item
              key={item.name}
              style={{ cursor: item.type !== 'row' ? 'pointer' : 'default' }}
              onDoubleClick={() => {
                if (loading) return
                onPathChange?.([...(paths || []), { name: item.name, type: item.type }])
              }}
              item={item}
            />
          )
        })}
    </Flex>
  )
}

Component.displayName = NAME
