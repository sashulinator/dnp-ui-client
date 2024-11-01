import { type Row } from '~/entities/dictionary-table'
import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import FForm, { type FormApi, useCreateForm } from '~/shared/form'
import { type Column as DatabaseColumn, RowForm } from '~/slices/database'
import { type SetterOrUpdater } from '~/utils/core'

interface _DialogProps {
  open: boolean
  setOpen: SetterOrUpdater<boolean>
  form: FormApi<Row, Partial<Row>>
  columns: DatabaseColumn[] | undefined
  mutator: { isLoading: boolean }
}

const NAME = 'workingTable-page-RowFormDialog'

export default function Component(props: _DialogProps): JSX.Element {
  const { open, setOpen, form, columns, mutator } = props

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>
          Запись
          {/* <TextHighlighter>{item?.name}</TextHighlighter> */}
        </Dialog.Title>
        <FForm form={form} columns={columns} component={RowForm} />
        <Flex gap='4' mt='4' justify='end'>
          <Button
            variant='soft'
            color='gray'
            onClick={() => {
              form.initialize({})
              setOpen(false)
            }}
          >
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

interface useCreateRowFormProps {
  onSubmit: (values: Row) => Promise<unknown>
}

export function useCreateRowForm(props: useCreateRowFormProps) {
  return useCreateForm<Row>(
    {
      onSubmit: (values) => {
        props.onSubmit(values)
      },
      initialValues: {},
    },
    { values: true, initialValues: true },
  )
}
