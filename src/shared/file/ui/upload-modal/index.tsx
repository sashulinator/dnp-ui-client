import { Flex } from '@radix-ui/themes'

import { useEffect, useState } from 'react'

import Button from '~/shared/button'
import Card from '~/shared/card'
import Dialog from '~/shared/dialog'
import Text from '~/shared/text'
import { fns } from '~/utils/core'

import { UploadItem } from '../..'
import Input, { type InputProps } from '../input'

interface Props extends Omit<InputProps, 'title' | 'onFileChange'> {
  open: boolean
  title: React.ReactNode
  upload: (file: File) => Promise<unknown>
  onClose: () => void
  onFileChange?: InputProps['onFileChange'] | undefined
}

const NAME = 'dnp-sh-file-UploadModal'

export function Component(props: Props) {
  const { open, upload, onClose, title, onFileChange, ...inputProps } = props

  const [fileList, setFileList] = useState<FileList | null>(null)

  const fileArray = Array.from(fileList || [])

  useEffect(() => setFileList(null), [open])

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>{title}</Dialog.Title>
        <Flex width='100%' mt='6'>
          <Input
            {...inputProps}
            size='2'
            variant='outline'
            style={{ width: '100%' }}
            onFileChange={fns(onFileChange, (_, fileList) => setFileList(fileList))}
          />
        </Flex>
        {fileArray.length > 0 && (
          <Flex gap='2' mt='4' direction='column'>
            {Array.from(fileList || []).map((file) => {
              return (
                <Card size='1' key={file.name} asChild={true}>
                  <Flex width='100%'>
                    <UploadItem upload={() => upload(file)}>
                      <Text
                        size='1'
                        style={{ width: '300px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                      >
                        {file.name}
                      </Text>
                    </UploadItem>
                  </Flex>
                </Card>
              )
            })}
          </Flex>
        )}

        <Flex gap='4' mt='6' justify='end'>
          <Button onClick={onClose}>Ok</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

Component.displayName = NAME

export default Component
export { type Props as UploadModalProps }
