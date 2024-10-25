import Badge from '~dnp/shared/badge'
import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import Text from '~dnp/shared/text'
import { c } from '~dnp/utils/core'

import { type NormalizationConfig } from '../../../types/normalization-config'

export interface Props {
  className?: string | undefined
  item: Pick<NormalizationConfig, 'last' | 'v'>
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
        {item.last ? (
          <Badge color='green'>Текущий</Badge>
        ) : (
          <>
            <Badge color='red'>Архивный</Badge>
            <Badge color='red'>Только чтение</Badge>
          </>
        )}
      </Flex>
      <Flex align='center' gap='4'>
        <Button size='1' color='yellow' loading={isProcessCreating} onClick={onCreateProcessButtonClick}>
          Запустить процесс
        </Button>
      </Flex>
    </Flex>
  )
}

Component.displayName = displayName
