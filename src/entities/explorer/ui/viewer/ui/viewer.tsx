import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Explorer, Path } from '../../../types/explorer'
import Item from '../widgets/item'
import Type from '../widgets/type'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  data: Explorer | undefined
  loading?: boolean | undefined
  paths: Path[] | undefined
  onPathChange: (paths: Path[]) => void
}

export const NAME = 'explorer-Viewer'

/**
 * explorer-Viewer
 */
export default function Component(props: Props): JSX.Element {
  const { data, loading = false, paths = [] } = props

  return (
    <Flex direction='column' gap='4' width='100%' height='100%' className={c(props.className, NAME)}>
      <Flex gap='4' align='center' className={`${NAME}_header`}>
        <Button
          square={true}
          loading={loading}
          disabled={paths.length === 0}
          variant='outline'
          onClick={() => {
            paths.pop()
            props.onPathChange([...paths])
          }}
        >
          <ChevronLeftIcon />
        </Button>

        {data && (
          <>
            <Flex gap='3' align='center'>
              {paths.map((path, i) => (
                <>
                  <Flex gap='2' align='center' asChild>
                    <Button
                      key={i}
                      variant={i === 0 ? 'soft' : 'ghost'}
                      size={i === 0 ? '3' : '2'}
                      onClick={() => {
                        if (paths.length - 1 === i) return
                        props.onPathChange(paths.slice(0, i - 1))
                      }}
                    >
                      <Type value={path.type} />
                      <div className={`${NAME}_name`}>{path.name}</div>
                    </Button>
                  </Flex>
                  {paths.length - 1 !== i && <ChevronRightIcon />}
                </>
              ))}
            </Flex>
          </>
        )}
      </Flex>
      <Flex direction='column' gap='1'>
        {data && (
          <>
            {data.items.map((item) => {
              return (
                <Item
                  style={{ cursor: item.type !== 'record' ? 'pointer' : 'default' }}
                  onDoubleClick={
                    item.type === 'record'
                      ? undefined
                      : () => props.onPathChange([...paths, { name: item.name, type: item.type }])
                  }
                  key={item.name}
                  item={item}
                />
              )
            })}
          </>
        )}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
