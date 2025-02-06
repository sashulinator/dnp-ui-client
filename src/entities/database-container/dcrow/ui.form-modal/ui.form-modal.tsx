/**
 * Использовал слово Modal в названии так как собираюсь перестать использовать
 * компонент Dialog в будущем для такого типа логики
 */
import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import { type FormApi } from '~/shared/form'
import { type Dictionary } from '~/utils/core'

import RowForm, { type Column } from '../ui.form'

export type { Column }

// TODO вынести в types/dcrow
export type Row = Dictionary

export interface Props {
  open: boolean
  form: FormApi<Row, Partial<Row>>
  columns: Column[] | undefined
  mutator: { isLoading: boolean }
}

const NAME = 'dnp-databaseContainer-dcrow-FormModal'

export default function Component(props: Props): JSX.Element {
  const { open, form, columns, mutator } = props

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>
          Запись
          {/* <TextHighlighter>{item?.name}</TextHighlighter> */}
        </Dialog.Title>
        {/** TODO убрать ts-ignore */}
        {/** @ts-ignore */}
        <Form form={form} columns={columns} component={RowForm} />
        <Flex gap='4' mt='4' justify='end'>
          <Button variant='soft' color='gray' onClick={() => form.initialize({})}>
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
