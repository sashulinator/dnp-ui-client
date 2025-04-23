import { APP } from '~/app/constants.app'
import { Dcservice, Dctable } from '~/entities/database-container'
import { Card, Column, Field } from '~/shared/form'
import { c } from '~/utils/core'
import { type Dictionary } from '~/utils/dictionary'

import { SLICE } from '../constants'
import { type Config } from './ui.new-form'

type Column = { name: string; display: string; type: string }
export type TableLocator = {
  name: string
  schema: string
  database: string
  dcserviceId: string
}

export interface Props {
  className?: string | undefined
  tableDisabled: boolean
  // fetchTablesByDcdatabaseLocator: (dcdatabaseLocator: Dcdatabase.DcdatabaseLocator) => Promise<Table[]>
  onInputChange: (value: Dictionary<TableLocator> | undefined) => void
  fetchTableList: (params: {
    sort: Dctable.ListTable.ItemSort | undefined
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined
    database: string
    dcserviceId: string
    page: number
    limit: number
  }) => Promise<{ items: { name: string; display?: string | undefined; schema: string }[]; total: number }>
}

const NAME = `${APP}-${SLICE}-Form-w-InputBlock`

export default function Component(props: Props): JSX.Element {
  const { className, onInputChange, fetchTableList, tableDisabled } = props

  return (
    <Card label='Вход' className={c(NAME, className)}>
      <Column width='100%'>
        <Field name='configs' subscription={{ value: true }}>
          {({ input }) => {
            const inputValue = input.value as Dictionary<Config>
            const value = Object.values(inputValue).reduce<Dictionary<Dctable.DctableLocator>>((acc, item) => {
              acc[`${item.inputDctableLocator.schema}${item.inputDctableLocator.name}`] = item.inputDctableLocator
              return acc
            }, {})

            return (
              <Dctable.Picker.default
                disabled={tableDisabled}
                fetchTableList={fetchTableList}
                fetchDcserviceList={async () => {
                  const ret = await Dcservice.api.findWithTotal.request({})
                  return ret.data
                }}
                value={value as any}
                onChange={(value) => {
                  onInputChange(value)
                }}
                fetchDatabaseList={async (params) => {
                  const ret = await Dcservice.api.findDatabases.request({ id: params.dcserviceId })
                  return ret.data
                }}
              />
            )
          }}
        </Field>
      </Column>
    </Card>
  )
}

Component.displayName = NAME
