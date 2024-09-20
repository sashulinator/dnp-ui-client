import './file-upload.scss'

import { Flex } from '@radix-ui/themes'

import { useMemo, useRef, useState } from 'react'

import Text from '~/shared/text'

import { FileIcon } from './icons/file-icon'
import { FilePlusIcon } from './icons/file-plus-icon'
import { IconCross } from './icons/icon-cross'

interface Props {
  isLoading: boolean
  hasError: boolean
  onChange: (file: File | null) => void
}

export const FileUpload = ({ isLoading, hasError, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [uploadedFile, setUploadedFile] = useState<File | null>()

  const onFileChange = (files: FileList | null) => {
    if (files) {
      setUploadedFile(files[0])
      onChange(files[0])
    }
  }

  const onDeleteClick = () => {
    setUploadedFile(null)
    onChange(null)
    if (inputRef.current?.files) {
      inputRef.current.value = ''
    }
  }

  const fileRenderName = useMemo(() => {
    if (isLoading) {
      return 'Загрузка'
    }

    if (hasError) {
      return 'Ошибка'
    }

    return uploadedFile?.name
  }, [isLoading, hasError, uploadedFile?.name])

  return (
    <Flex width='100%' direction='column' gapY='20px'>
      <Flex align='center' gapX='12px'>
        <Flex className='ui-file-upload__root' onClick={() => inputRef.current?.click()}>
          <FilePlusIcon />
        </Flex>
        <Text color='gray' size='3'>
          Прикрепите файл в формате xls, xlsx, csv
        </Text>
      </Flex>
      <input
        type='file'
        ref={inputRef}
        style={{ display: 'none' }}
        accept='.csv,.xls,.xlsx'
        onChange={(e) => onFileChange(e.target.files)}
      />
      {uploadedFile && (
        <Flex gapX='12px' justify='between' align='center' className='ui-file-upload__uploaded-file'>
          <Flex gapX='12px' align='center'>
            <FileIcon />
            <Text color='gray' size='2'>
              {fileRenderName}
            </Text>
          </Flex>
          <IconCross onClick={onDeleteClick} />
        </Flex>
      )}
    </Flex>
  )
}
