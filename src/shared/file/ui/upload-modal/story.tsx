import { useState } from 'react'

import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Props, type Story } from '~/shared/storybook'
import { random } from '~/utils/core'

import { merge } from '../../lib/merge'
import { remove } from '../../lib/remove'
import UploadItem from '../upload-item'
import UploadModal from './'

interface State {}

export default {
  getName: (): string => UploadModal.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [fileList, setFileList] = useState<FileList | null>(null)
    const [multiple, setMultiple] = useState<boolean>(false)

    const [open, setOpen] = useState<boolean>(false)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Flex>
          <Checkbox checked={multiple} onCheckedChange={(checked) => setMultiple(Boolean(checked))} />
          Множество файлов
        </Flex>
        <Button onClick={() => setOpen(true)}>Открыть</Button>
        <UploadModal
          {...state}
          title={'Кастомный тайтл'}
          upload={() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (random(0, 1) === 0) resolve(null)
                else reject(null)
              }, 1000)
            })
          }}
          onClose={() => setOpen(false)}
          open={open}
          multiple={multiple}
          accept='*'
          onFileChange={(_, newFileList) => setFileList((fileList) => merge(fileList, newFileList))}
        />

        <Flex direction='column'>
          Вот список выбранных файлов
          <ul>
            {Array.from(fileList || []).map((file) => {
              return (
                <li key={file.name}>
                  <Flex justify='between'>
                    {file.name}
                    <Flex gap='2'>
                      {file.type.includes('image') && <img width='50px' src={URL.createObjectURL(file)} />}
                      <Button onClick={() => setFileList((fileList) => remove(fileList, file.name))}>
                        <Icon name='Cross1' />
                      </Button>
                    </Flex>
                  </Flex>
                </li>
              )
            })}
          </ul>
          Автоаплоадинг
          {Array.from(fileList || []).map((file) => {
            return (
              <UploadItem
                key={file.name}
                upload={() => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (random(0, 1) === 0) resolve(null)
                      else reject(null)
                    }, 1000)
                  })
                }}
              >
                {file.name}
              </UploadItem>
            )
          })}
        </Flex>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
