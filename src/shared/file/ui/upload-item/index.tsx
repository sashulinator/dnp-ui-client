import { useEffect } from 'react'
import { useMutation } from 'react-query'

import Button from '~/shared/button'
import Flex, { type FlexProps } from '~/shared/flex'
import Icon from '~/shared/icon'
import Spinner from '~/shared/spinner'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

type Props = FlexProps & {
  className?: string | undefined
  upload: () => Promise<unknown>
  children?: React.ReactNode
}

const NAME = 'dnp-sh-file-UploadItem'

export function Component(props: Props): JSX.Element {
  const { children, upload, className } = props

  const uploadMutator = useMutation(upload)
  useEffect(uploadMutator.mutate, [])

  return (
    <Flex width='100%' minHeight='32px' justify='between' align='center' className={c(className, NAME)}>
      {children}
      {uploadMutator.isLoading && <Spinner />}
      {uploadMutator.isSuccess && (
        <Text color='green'>
          <Icon name='Check' />
        </Text>
      )}
      {uploadMutator.isError && (
        <Flex align='center' gap='4'>
          <Text size='1' color='red'>
            Ошибка
          </Text>
          <Tooltip content='Повторить'>
            <Button size='1' round={true} variant='ghost' onClick={() => uploadMutator.mutate()}>
              <Icon name='Refresh' />
            </Button>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  )
}

Component.displayName = NAME

export default Component
export { type Props as UploadItemProps }
