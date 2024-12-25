import { useState } from 'react'

import { api as processingApi } from '~/entities/processing'
import Button from '~/shared/button'
import { UploadModal } from '~/shared/file'
import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import { Pagination, type PaginationProps } from '~/shared/page'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import Section from '~/shared/section'
import { InputSelect } from '~/shared/select'
import { ListTable } from '~/shared/table'
import { api as fileApi } from '~/slices/files'
import type { ToSort } from '~/slices/sort'
import type { Dictionary, SetterOrUpdater } from '~/utils/core'
import { emptyFn } from '~/utils/function'
import type { Atom } from '~/utils/store'

export interface Props {
  className?: string | undefined
  database?: string | undefined
  dcserviceId: string
  table?: string | undefined
  setDatabase: (v: string) => void
  setTable: (v: string | undefined) => void
  sortAtom: Atom<ToSort<Dictionary> | undefined>
  paginationProps: PaginationProps
  searchFilter: Partial<Record<string | number, ListTable.Sort.SortValue | undefined>>
  setSearchFilter: SetterOrUpdater<Record<string, ListTable.Sort.ToSort<Dictionary> | undefined>>
  databasesFetcher: {
    isLoading: boolean
    isError: boolean
    data?:
      | {
          items: { name: string; display?: string }[]
        }
      | undefined
  }
  tablesFetcher: {
    isLoading: boolean
    isError: boolean
    data?:
      | {
          items: { name: string; display?: string }[]
        }
      | undefined
  }
  rowsFetcher: {
    isLoading: boolean
    isError: boolean
    data?:
      | {
          items: { name?: string; display?: string }[]
          total: number
          columns: { name: string; display?: string }[]
        }
      | undefined
  }
}

const NAME = 'dnp-page-databaseContainer-dcdatabase-GetById-w-DataTab'
const BUCKET_NAME = 'ui-server'

export default function Component(props: Props): JSX.Element {
  const {
    database,
    table,
    dcserviceId,
    setDatabase,
    sortAtom,
    paginationProps,
    searchFilter,
    setSearchFilter,
    setTable,
    databasesFetcher,
    tablesFetcher,
    rowsFetcher,
  } = props

  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false)

  return (
    <>
      <Flex pt='6' direction='column'>
        <Flex align='end' justify='between'>
          <Flex gap='4'>
            <Flex direction='column'>
              <Labeled label='База'>
                <InputSelect.default
                  style={{ minWidth: '350px' }}
                  variant='surface'
                  value={database}
                  onChange={(v) => {
                    setDatabase(v.toString())
                    paginationProps.onChange(1)
                    sortAtom.set({})
                    setSearchFilter({})
                    setTable(undefined)
                  }}
                  options={
                    databasesFetcher.data?.items?.map((db) => ({
                      value: db.name,
                      display: db.display || db.name,
                    })) || []
                  }
                />
              </Labeled>
            </Flex>
            <Flex direction='column'>
              <Labeled label='Таблица'>
                <InputSelect.default
                  style={{ minWidth: '350px' }}
                  variant='surface'
                  value={table}
                  onChange={(v) => {
                    setTable(v.toString())
                    paginationProps.onChange(1)
                    sortAtom.set({})
                    setSearchFilter({})
                  }}
                  options={
                    tablesFetcher.data?.items?.map((db) => ({
                      value: db.name,
                      display: db.display || db.name,
                    })) || []
                  }
                />
              </Labeled>
            </Flex>
          </Flex>
          <Button onClick={() => setImportModalOpen(true)}>Импорт</Button>
        </Flex>

        {database && table && (
          <Section size='1'>
            <Pagination {...paginationProps} />
          </Section>
        )}

        {rowsFetcher.data && (
          <FetcherStatus
            isChildrenOnFetchingVisible={true}
            isLoading={rowsFetcher.isLoading}
            isFetching={rowsFetcher.isLoading}
            isError={rowsFetcher.isError}
            error={undefined}
            refetch={emptyFn}
          >
            <ScrollArea scrollbars='horizontal'>
              <ListTable.Search.default
                columns={rowsFetcher.data?.columns as any}
                context={{ searchFilter, setSearchFilter: setSearchFilter as any }}
              >
                <ListTable.Sort.default
                  columns={rowsFetcher.data?.columns as any}
                  context={{ sortController: sortAtom }}
                >
                  <ListTable.default
                    context={{}}
                    list={rowsFetcher.data.items}
                    columns={rowsFetcher.data?.columns as any}
                  />
                </ListTable.Sort.default>
              </ListTable.Search.default>
            </ScrollArea>
          </FetcherStatus>
        )}
      </Flex>

      {/* MODALS */}

      <UploadModal
        multiple={true}
        open={isImportModalOpen}
        title='Импорт данных'
        accept='.csv,.xls,.xlsx'
        upload={async (file) => {
          const response = await fileApi.upload.request({ file, fileName: file.name, bucketName: BUCKET_NAME })
          processingApi.excelToTable.request({
            fileNames: [response.data.fileName],
            bucketName: BUCKET_NAME,
            dcserviceId: dcserviceId,
            table: table || '',
            database: database || '',
          })
        }}
        onClose={() => setImportModalOpen(false)}
      />
    </>
  )
}

Component.displayName = NAME
