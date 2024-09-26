import Flex from '~/shared/flex'
import { Field, TextField, type TextFieldProps } from '~/shared/form'
import { c } from '~/utils/core'

import { type Column } from '../../../models/database-table'

export interface Props {
  className?: string | undefined
  columns: Column[] | undefined
}

export const NAME = 'databaseTable-RowForm'

/**
 * tableSchema-SchemaForm
 */
export default function Component(props: Props): JSX.Element {
  const { columns = [] } = props

  return (
    <Flex className={c(props.className, NAME)} direction={'column'} gap='4'>
      {columns.map((item) => {
        return (
          <Field<string, TextFieldProps<string>, HTMLInputElement>
            component={TextField}
            key={item.name}
            disabled={item.columnName === 'id'}
            name={item.columnName}
            label={item.name}
          />
        )
      })}
    </Flex>
  )
}

Component.displayName = NAME
