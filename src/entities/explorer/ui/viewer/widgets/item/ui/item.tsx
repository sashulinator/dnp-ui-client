import Type from '../../type'
import { type Item } from '~/common/explorer'
import Flex from '~/ui/flex'
import { c } from '~/utils/core'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined
  item: Item
}

export const NAME = 'explorer-Viewer-w-Item'

/**
 * explorer-Viewer-w-Item
 */
export default function Component(props: Props): JSX.Element {
  const { item, ...divProps } = props
  return (
    <Flex asChild gap='2' style={{ padding: '0 var(--space-2)' }} align='center' className={c(props.className, NAME)}>
      <div {...divProps}>
        <Type value={item.type} />
        <Flex>{item.name}</Flex>
      </div>
    </Flex>
  )
}

Component.displayName = NAME
