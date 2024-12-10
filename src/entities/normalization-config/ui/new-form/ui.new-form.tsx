import { APP } from '~/app/constants.app'
import { TypedField } from '~/shared/form'
import { c } from '~/utils/core'

import { SLICE } from '../../constants.slice'
import TableMultiple, { type Option } from './widgets/table-multiple'

export interface Props {
  className?: string | undefined
  fetchInputTablesOptions: () => Promise<Option[]>
}

const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchInputTablesOptions } = props
  return (
    <div className={c(props.className, NAME)}>
      <TypedField name='inputTables' component={TableMultiple} fetchOptions={fetchInputTablesOptions} />
    </div>
  )
}

Component.displayName = NAME
