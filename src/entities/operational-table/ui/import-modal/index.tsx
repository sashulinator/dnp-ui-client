import { Flex } from '@radix-ui/themes'

import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import { FileUpload } from '~/shared/file-upload'

interface Props {
  open: boolean
  hasFile: boolean
  isLoading: boolean
  hasError: boolean
  onFileUpload: (file: File | null) => void
  onSubmit: () => void
  onClose: () => void
}

export const ImportOperationalTableModal = ({
  open,
  hasFile,
  isLoading,
  hasError,
  onFileUpload,
  onSubmit,
  onClose,
}: Props) => {
  const submitDisabled = isLoading || hasError || !hasFile

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>Импортировать записи</Dialog.Title>
        <Flex pt='12' pb='12'>
          <FileUpload isLoading={isLoading} hasError={hasError} onChange={onFileUpload} />
        </Flex>
        <Flex gap='4' mt='4' justify='end'>
          <Button variant='soft' color='gray' onClick={onClose}>
            Закрыть
          </Button>
          <Button loading={isLoading} disabled={submitDisabled} onClick={onSubmit}>
            Импорт
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
