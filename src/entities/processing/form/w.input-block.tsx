import { useCallback } from 'react'

import { APP } from '~/app/constants.app'
import { Dcdatabase, Dcservice, Dctable } from '~/entities/database-container'
import { Card, Column, Field } from '~/shared/form'
import { c } from '~/utils/core'
import { type Dictionary } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'

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
  disabled: boolean
  dcdatabase: Dcdatabase.DatabaseValue | undefined
  setDcdatabase: (value: Dcdatabase.DatabaseValue | undefined) => void
  dcservice: Dcservice.DcserviceDisplayWithId | undefined
  setDcserviceValue: (value: Dcservice.DcserviceDisplayWithId | undefined) => void
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
  const {
    className,
    onInputChange,
    fetchTableList,
    disabled,
    dcdatabase,
    dcservice,
    setDcdatabase,
    setDcserviceValue,
  } = props

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
              <>
                <Dcservice.Picker.default
                  enabled={!disabled}
                  fetcherDependencies={[disabled]}
                  fetchList={async (params) => {
                    const ret = await Dcservice.api.findWithTotal.request({
                      take: params.limit,
                      skip: (params.page - 1) * params.limit,
                    })
                    return ret.data
                  }}
                  fetchDisplay={async (params) => {
                    if (!params.id) return
                    return Dcservice.api.getById.request({ id: params?.id }).then((d) => d.data)
                  }}
                  value={{ id: dcservice?.id }}
                  onValueChange={(v) => {
                    setDcserviceValue(v)
                    setDcdatabase(undefined)
                    onInputChange(undefined)
                  }}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  renderTrigger={useCallback(({ enabled, setIsOpen, value, setValue }) => {
                    return (
                      <Dcservice.Input.default
                        hasValue={!!value?.id}
                        disabled={!enabled}
                        fetchDisplay={async () => {
                          if (!value?.id) return
                          return Dcservice.api.getById.request({ id: value?.id }).then((d) => d.data)
                        }}
                        fetcherDependencies={[value]}
                        onClearableClick={() => setValue(undefined)}
                        onClick={() => setIsOpen(true)}
                      />
                    )
                  }, [])}
                />
                <Dcdatabase.Picker.default
                  fetcherDependencies={[dcservice]}
                  enabled={!!dcservice && !disabled}
                  fetchList={async (params) => {
                    const ret = await Dcservice.api.findDatabases.request({ ...params, id: dcservice?.id as string })
                    return ret.data
                  }}
                  value={dcdatabase}
                  onChange={(v) => {
                    setDcdatabase(v)
                    onInputChange(undefined)
                  }}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  renderTrigger={useCallback(({ enabled, setIsOpen, value, setValue }) => {
                    return (
                      <Dcdatabase.Input.default
                        hasValue={!!value?.name}
                        disabled={!enabled}
                        fetchValue={() => value}
                        fetcherDependencies={[value, dcservice]}
                        onClearableClick={() => setValue(undefined)}
                        onClick={() => setIsOpen(true)}
                      />
                    )
                  }, [])}
                />
                <Dctable.Multipicker.default
                  enabled={!!dcdatabase?.name && !disabled}
                  fetcherDependencies={[dcservice, dcdatabase?.name]}
                  fetchTableList={(params) => {
                    return fetchTableList({ ...params, database: dcdatabase?.name, dcserviceId: dcservice?.id } as any)
                  }}
                  value={Object.values(value)}
                  onChange={(value) => {
                    const newValue = value?.map((item) => ({
                      ...item,
                      name: item.name as string,
                      schema: item.schema as string,
                      database: dcdatabase?.name as string,
                      dcserviceId: dcservice?.id as string,
                    }))
                    onInputChange(toDictionary((item) => `${item.name}.${item.schema}`, newValue) || {})
                  }}
                  renderTrigger={({ setIsOpen, setValue, value }) => {
                    return (
                      <Dctable.Input.default
                        hasValue={!!value}
                        fetchValue={async () => value as any}
                        fetcherDependencies={[value]}
                        onClick={() => setIsOpen(true)}
                        onClearableClick={() => setValue(undefined)}
                      />
                    )
                  }}
                />
              </>
            )
          }}
        </Field>
      </Column>
    </Card>
  )
}

Component.displayName = NAME
