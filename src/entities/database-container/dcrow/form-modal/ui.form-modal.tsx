/**
 * Использовал слово Modal в названии так как собираюсь перестать использовать
 * компонент Dialog в будущем для такого типа логики
 */
import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Form, { type FormApi } from '~/shared/form'
import { preventDefault } from '~/utils/core-client'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import type { Atom } from '~/utils/store'

import RowForm, { type Column } from '../form'
import type { Row } from '../types'

export type { Column }
export type { Row }

export interface Props {
  open: Atom<boolean>
  form: FormApi<Row, Partial<Row>>
  columns: Column[] | undefined
  mutator: { isLoading: boolean }
  onClose: () => void
}

const NAME = 'dnp-databaseContainer-dcrow-FormModal'

export default function Component(props: Props): JSX.Element {
  const { open, form, columns, mutator, onClose } = props

  useSubscribeUpdate(open.subscribe)
  useSubscribeUpdate((update) => form.subscribe(update, { values: true }))

  return (
    <Dialog.Root open={open.get()}>
      <Dialog.Content onOpenAutoFocus={preventDefault} maxWidth='450px'>
        <Dialog.Title>
          Запись
          {/* <TextHighlighter>{item?.name}</TextHighlighter> */}
        </Dialog.Title>
        {/** TODO убрать ts-ignore */}
        {/** @ts-ignore */}
        <Form form={form} columns={columns} component={RowForm} />
        <Flex gap='4' mt='4' justify='end'>
          <Button variant='soft' color='gray' onClick={onClose}>
            Закрыть
          </Button>
          <Button
            loading={mutator.isLoading}
            disabled={!form.getState().dirty || form.getState().invalid}
            onClick={form.submit}
          >
            Сохранить
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

Component.displayName = NAME
