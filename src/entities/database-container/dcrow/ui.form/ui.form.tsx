import Flex from '~/shared/flex'
import { Field, StringField, type StringFieldProps } from '~/shared/form'
import { c } from '~/utils/core'

export type Column = {
  type: string
  name: string
  display?: string | undefined
}

export interface Props {
  className?: string | undefined
  columns: Column[] | undefined
}

export const NAME = 'dnp-databaseContainer-dcrow-Form'

export default function Component(props: Props): JSX.Element {
  const { columns = [] } = props

  return (
    <Flex className={c(props.className, NAME)} direction={'column'} gap='4'>
      {columns.map((item) => {
        return (
          <Field<string, StringFieldProps, HTMLInputElement>
            component={StringField}
            key={item.display}
            name={item.name}
            label={item.display}
          />
        )
      })}
    </Flex>
  )
}

Component.displayName = NAME
