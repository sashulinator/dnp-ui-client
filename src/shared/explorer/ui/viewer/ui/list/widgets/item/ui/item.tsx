import Flex from '~/shared/flex'
import { HighlightedText } from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

import { type Item } from '../../../../../../../models/explorer'
import Icon from '../../../../../../icon'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined
  item: Item
  idKey: string | number
}

export const NAME = 'explorer-Viewer-w-Item'

/**
 * explorer-Viewer-w-Item
 */
export default function Component(props: Props): JSX.Element {
  const { item, idKey, ...divProps } = props

  return (
    <Flex
      gap='2'
      style={{ padding: '0 var(--space-2)' }}
      align='center'
      className={c(props.className, NAME)}
      {...divProps}
    >
      <Icon name={item.type} />
      <Flex>
        <HighlightedText style={{ whiteSpace: 'nowrap' }} tooltipContent='pk'>
          {item.data[idKey as (typeof item.data)[keyof typeof item.data]] as string}
        </HighlightedText>
      </Flex>
      <Flex gap='4' style={{ whiteSpace: 'nowrap' }}>
        {Object.entries(item.data).map(([key, value]) => {
          return (
            <Tooltip key={key} content={key}>
              <span>{String(value) as string}</span>
            </Tooltip>
          )
        })}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
