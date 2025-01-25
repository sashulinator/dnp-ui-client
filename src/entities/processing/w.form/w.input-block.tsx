import { useState } from 'react'

import { APP } from '~/app/constants.app'
import { Dcservice, Dctable } from '~/entities/database-container'
import { Card, Column, Field } from '~/shared/form'
import { type Option } from '~/shared/select'
import { c } from '~/utils/core'

import { SLICE } from '../constants'

type Column = { name: string; display: string; type: string }

export interface Props {
  className?: string | undefined
  tableDisabled: boolean
  // fetchTablesByDcdatabaseLocator: (dcdatabaseLocator: Dcdatabase.DcdatabaseLocator) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  onTablesChange: (tables: string[]) => void
  onDcdatabaseIdChange: (id: string) => void
}

const NAME = `${APP}-${SLICE}-Form-w-InputBlock`

export default function Component(props: Props): JSX.Element {
  const { className, onTablesChange } = props

  const [value, onChange] = useState({})

  return (
    <Card label='Вход' className={c(NAME, className)}>
      <Column width='100%'>
        <Field name='inputDcdatabaseId'>
          {({ input }) => {
            return (
              <Dctable.Input.default
                fetchTableList={async ({ sort, searchFilter, database, page, limit }) => {
                  const ret = await Dcservice.api.findTables.request({
                    dcdatabaseLocator: {
                      dcserviceId: 'workshop',
                      name: database,
                    },
                    sort,
                    where: searchFilter as any,
                    limit,
                    offset: (page - 1) * limit,
                  })
                  return ret.data
                }}
                value={value}
                onChange={(value) => {
                  const tables = Object.values(value)
                  input.onChange(tables[0].dcserviceId)
                  onTablesChange(tables.map((t) => t.name))
                  onChange(value)
                }}
                fetchDatabaseList={async () => {
                  const ret = await Dcservice.api.findDatabases.request({ id: 'workshop' })
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
