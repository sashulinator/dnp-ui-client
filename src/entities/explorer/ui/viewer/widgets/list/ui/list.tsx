import { useContext } from 'react'
import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'
import Item from '../../item'
import Flex from '~/ui/flex'
import { c } from '~/utils/core'

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
              style={{ cursor: item.type !== 'record' ? 'pointer' : 'default' }}
              onDoubleClick={
                item.type === 'record'
                  ? undefined
                  : () => {
                      if (loading) return
                      onPathChange?.([...(paths || []), { name: item.name, type: item.type }])
                    }
              }
              item={item}
            />
          )
        })}
    </Flex>
  )
}

Component.displayName = NAME
