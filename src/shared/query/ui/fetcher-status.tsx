import { Button } from '@radix-ui/themes'

import { type UiErrorable } from '~dnp/shared/error'
import Flex from '~dnp/shared/flex'
import Spinner from '~dnp/shared/spinner'
import Text from '~dnp/shared/text'
import { type Nil, c } from '~dnp/utils/core'

export interface Props {
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  error: UiErrorable | Nil
  isChildrenOnFetchingVisible?: boolean | undefined
  refetch?: (() => void) | undefined
  children?: React.ReactNode
  height?: string | undefined
  className?: string | undefined
}

const NAME = 'query-FetcherStatus'

export default function Component(props: Props): React.ReactNode {
  const { height = '100px', isChildrenOnFetchingVisible = false, error, isError, children, isLoading } = props

  if (isChildrenOnFetchingVisible && !isLoading && !isError) return children
  if (!isLoading && !isError) return children

  return (
    <Flex className={c(props.className, NAME)} align='center' justify='center' height={height} width='100%'>
      {isLoading && (
        <Flex style={{ paddingTop: isLoading ? '44px' : undefined }}>
          <Spinner />
        </Flex>
      )}
      {!isLoading && isError && (
        <Flex direction='column' gap='1' align='center'>
          <Text size='1' style={{ textTransform: 'uppercase' }} color='red'>
            {error?.message || 'Неизвестная ошибка'}
          </Text>
          {error?.description && (
            <Text size='1' color='red'>
              {error.description}
            </Text>
          )}
          {props.refetch && <Button onClick={props.refetch}>Перезагрузить</Button>}
        </Flex>
      )}
    </Flex>
  )
}
