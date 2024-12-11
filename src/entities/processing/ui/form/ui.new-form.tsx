import { APP } from '~/app/constants.app'
import { Column, Row } from '~/shared/form'
import { type Option } from '~/shared/select'
import { c } from '~/utils/core'

import { SLICE } from '../../constants'
import { type Procedure } from '../../w.procedure'
import InputBlock from './w.input-block'
import OutputBlock from './w.output-block'
import ProceduresBlock from './w.procedures-block'

export { type Option }

export type Values = {
  name: string
  inputTables: string
  outputTable: string
}

export interface Props {
  className?: string | undefined
  fetchTablesOptions: (dcdatabaseId: string) => Promise<Option[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  feftchProcedures: () => Promise<Procedure[]>
}

export const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchTablesOptions, fetchDcdatabaseOptions, feftchProcedures } = props

  return (
    <Column className={c(props.className, NAME)}>
      <Row width='100%'>
        <Column width='50%'>
          <InputBlock fetchTablesOptions={fetchTablesOptions} fetchDcdatabaseOptions={fetchDcdatabaseOptions} />
        </Column>
        <Column width='50%'>
          <OutputBlock fetchTablesOptions={fetchTablesOptions} fetchDcdatabaseOptions={fetchDcdatabaseOptions} />
        </Column>
      </Row>
      <Row>
        <ProceduresBlock feftchProcedures={feftchProcedures} />
      </Row>
    </Column>
  )
}

Component.displayName = NAME
