import { type NormalizationConfig } from '../../../types/normalization-config'
import Badge from '~/ui/badge'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import Text from '~/ui/text'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  item: Pick<NormalizationConfig, 'current' | 'v'>
  isProcessCreating?: boolean | undefined
  onCreateProcessButtonClick?: (e: React.MouseEvent) => void
}

const displayName = 'normalizationConfig-Version'

/**
 * normalizationConfig-Version
 */
export default function Component(props: Props): JSX.Element {
  const { className, item, onCreateProcessButtonClick, isProcessCreating = false, ...flexProps } = props

  return (
    <Flex width='100%' justify='between' align='center' {...flexProps} className={c(displayName, className)}>
      <Flex gap='2' align='center'>
        <Text size='2' color='gray'>
          Версия: {item.v}
        </Text>
        {item.current ? (
          <Badge color='green'>Текущий</Badge>
        ) : (
          <>
            <Badge color='red'>Архивный</Badge>
            <Badge color='red'>Только чтение</Badge>
          </>
        )}
      </Flex>
      <Flex align='center' gap='4'>
        <Button color='yellow' loading={isProcessCreating} onClick={onCreateProcessButtonClick}>
          Запустить процесс
        </Button>
      </Flex>
    </Flex>
  )
}

Component.displayName = displayName
