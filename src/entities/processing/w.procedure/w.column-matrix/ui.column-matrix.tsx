import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { LabeledSelect } from '~/shared/select'
import { MatrixTable } from '~/shared/table'
import { type Dictionary, c } from '~/utils/core'

import { SLICE } from '../../constants'

export type Option = MatrixTable.Option

export type ColumnProps<TItem extends Dictionary, TContext extends Dictionary> = MatrixTable.ColumnProps<
  TItem,
  TContext
>

export type Props<TItem extends Dictionary, TContext extends Dictionary> = MatrixTable.MatrixProps<
  TItem,
  TContext,
  unknown
> & {
  className?: string | undefined
  selectedTable: string
  onTableChange: (value: string) => void
  tableSelectOptions: LabeledSelect.Option[]
}

const NAME = `${APP}-${SLICE}-w-procedure-w-columnMatrix`

export default function Component<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const { className, columns, options, values, selectedTable, ...tableProps } = props

  return (
    <Flex className={c(className, NAME)} direction='column' gap='2'>
      <Flex width='500px'>
        <LabeledSelect.default options={options} value={selectedTable} />
      </Flex>
      <MatrixTable.default columns={columns} values={values} options={options} {...tableProps} />
    </Flex>
  )
}

Component.displayName = NAME
