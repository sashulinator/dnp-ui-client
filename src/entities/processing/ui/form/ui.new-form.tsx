import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import { Column, Row } from '~/shared/form'
import { type Option } from '~/shared/select'
import { c } from '~/utils/core'

import { SLICE } from '../../constants'
import type { ExecutableDesign } from '../../w.executable'
// import { type Procedure } from '../../w.procedure'
import InputBlock from './w.input-block'
import OutputBlock from './w.output-block'

export { type Option }

export type Config = {
  inputTable: string
  outputTable: string
  inputDcdatabaseId: string
  outputDcdatabaseId: string
}

export type Values = {
  name: string
  configs: Record<string, Config>
}

export interface Props {
  className?: string | undefined
  fetchTablesOptions: (dcdatabaseId: string) => Promise<Option[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  fetchExecutableDesigns: () => Promise<ExecutableDesign[]>
}

export const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchTablesOptions, fetchDcdatabaseOptions, fetchExecutableDesigns } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const executableDesignsFetcher = useQuery([NAME, 'executableDesigns'], fetchExecutableDesigns, {
    staleTime: Infinity,
  })

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
    </Column>
  )
}

Component.displayName = NAME
