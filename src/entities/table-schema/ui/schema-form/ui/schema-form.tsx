import { TableSchema } from '~/entities/operational-table'
import Flex from '~/ui/flex'
import { TextField } from '~/ui/form'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  // TODO создать отдельный тип для TableSchema, пока что беру какой есть
  tableSchema: TableSchema
}

export const NAME = 'tableSchema-SchemaForm'

/**
 * tableSchema-SchemaForm
 */
export default function Component(props: Props): JSX.Element {
  const { tableSchema } = props
  return (
    <Flex className={c(props.className, NAME)} direction={'column'} gap='4'>
      {tableSchema.items.map((item) => {
        return (
          <TextField key={item.name} disabled={item.columnName === 'id'} name={item.columnName} label={item.name} />
        )
      })}
    </Flex>
  )
}

Component.displayName = NAME
