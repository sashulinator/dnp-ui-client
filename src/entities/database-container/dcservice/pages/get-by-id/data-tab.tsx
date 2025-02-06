import { useState } from 'react'

import { Dcrow } from '~/entities/database-container'
import Button from '~/shared/button'
import { UploadModal, type UploadModalProps } from '~/shared/file'
import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import { Pagination, type PaginationProps } from '~/shared/page'
import { FetcherStatus, type FetcherStatusProps } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import Section from '~/shared/section'
import { InputSelect } from '~/shared/select'
import { ListTable } from '~/shared/table'
import type { Dictionary } from '~/utils/core'

export interface Props {
  listTableProps: ListTable.ListProps<
    Dictionary,
    ListTable.Sort.Context<Dictionary> & ListTable.Search.Context<Dictionary>
  >
  fetcherStatusProps: FetcherStatusProps
  paginationProps: PaginationProps
  tableSelectProps: InputSelect.InputProps
  databaseSelectProps: InputSelect.InputProps
  uploadModalProps: UploadModalProps
  createFormModalProps: Dcrow.FormModal.FormModalProps
}

const NAME = 'dnp-page-databaseContainer-dcdatabase-GetById-w-DataTab'

export default function Component(props: Props): JSX.Element {
  const {
    listTableProps,
    uploadModalProps,
    paginationProps,
    fetcherStatusProps,
    tableSelectProps,
    databaseSelectProps,
    createFormModalProps,
  } = props

  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false)

  return (
    <>
      <Flex pt='6' direction='column'>
        <Flex align='end' justify='between'>
          <Flex gap='4'>
            <Flex direction='column'>
              <Labeled label='База'>
                <InputSelect.default style={{ minWidth: '350px' }} variant='surface' {...databaseSelectProps} />
              </Labeled>
            </Flex>
            <Flex direction='column'>
              <Labeled label='Таблица'>
                <InputSelect.default style={{ minWidth: '350px' }} variant='surface' {...tableSelectProps} />
              </Labeled>
            </Flex>
          </Flex>
          <Button onClick={() => setImportModalOpen(true)}>Импорт</Button>
        </Flex>

        {tableSelectProps.value && databaseSelectProps.value && (
          <Section size='1'>
            <Pagination {...paginationProps} />
          </Section>
        )}

        {listTableProps.list?.length > 0 && (
          <FetcherStatus {...fetcherStatusProps}>
            <ScrollArea scrollbars='horizontal'>
              <ListTable.Search.default columns={listTableProps.columns} context={listTableProps.context}>
                <ListTable.Sort.default columns={listTableProps.columns} context={listTableProps.context}>
                  <ListTable.default {...listTableProps} />
                </ListTable.Sort.default>
              </ListTable.Search.default>
            </ScrollArea>
          </FetcherStatus>
        )}
      </Flex>

      {/* MODALS */}

      <UploadModal
        {...uploadModalProps}
        multiple={true}
        open={isImportModalOpen}
        title='Импорт данных'
        accept='.csv,.xls,.xlsx'
        onClose={() => setImportModalOpen(false)}
      />

      <Dcrow.FormModal.default {...createFormModalProps} />
    </>
  )
}

Component.displayName = NAME
