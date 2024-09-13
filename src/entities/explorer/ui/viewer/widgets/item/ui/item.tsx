import Flex from '~/shared/flex'
import TextHighlighter from '~/shared/text-highlighter'
import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

import { type Item } from '../../../../../types/explorer'
import Type from '../../type'

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
    <Flex
      gap='2'
      style={{ padding: '0 var(--space-2)' }}
      align='center'
      className={c(props.className, NAME)}
      {...divProps}
    >
      <Type value={item.type} />
      <Flex>
        <TextHighlighter style={{ whiteSpace: 'nowrap' }} tooltipContent='pk'>
          {item.name}
        </TextHighlighter>
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
