import Flex from '~/shared/flex'
import { Field, TextField, type TextFieldProps } from '~/shared/form'
import { c } from '~/utils/core'

import { type Column } from '../../../models/database'

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
            key={item.display}
            name={item.columnName}
            label={item.display}
          />
        )
      })}
    </Flex>
  )
}

Component.displayName = NAME
