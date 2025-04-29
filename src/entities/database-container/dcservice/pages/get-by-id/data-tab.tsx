import QueryString from 'qs'
import { useCallback, useState } from 'react'

import { Dcdatabase, Dcrow, Dctable } from '~/entities/database-container'
import Button from '~/shared/button'
import { UploadModal, type UploadModalProps } from '~/shared/file'
import Flex from '~/shared/flex'
import { FetcherStatus, type FetcherStatusProps } from '~/shared/query'

import _ActionBar, { type Props as ActionBarProps } from './_action-bar'

export interface DisplayOption {
  [columnName: string]: {
    column: { type: string }
    highlight?: {
      latin?: boolean
      cyrillic?: boolean
      punctuationMarks?: boolean
    }
  }
}

export interface Props {
  actionBarProps: ActionBarProps
  listTableProps: Dcrow.ListTable.ListTableProps<{ displayOptions: DisplayOption }>
  fetcherStatusProps: FetcherStatusProps
  tablePickerProps: Omit<Dctable.Picker.PickerProps, 'renderTrigger'>
  databasePickerProps: Omit<Dcdatabase.Picker.PickerProps, 'renderTrigger'>
  uploadModalProps: UploadModalProps
  updateFormModalProps: Dcrow.FormModal.FormModalProps
  createFormModalProps: Dcrow.FormModal.FormModalProps
  queryParams: {
    dcserviceId: string
    database: string
    schema: string
    table: string
  }
}

const NAME = 'dnp-page-databaseContainer-dcdatabase-GetById-w-DataTab'

export default function Component(props: Props): JSX.Element {
  const {
    actionBarProps,
    listTableProps,
    uploadModalProps,
    fetcherStatusProps,
    tablePickerProps,
    databasePickerProps,
    updateFormModalProps,
    createFormModalProps,
    queryParams,
  } = props

  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false)

  const isButtonDisabled =
    !queryParams.dcserviceId || !queryParams.database || !queryParams.schema || !queryParams.table

  return (
    <>
      <Flex direction='column'>
        <Flex align='end' justify='between'>
          <Flex gap='4'>
            <Flex gap='2' width={'700px'}>
              <Dcdatabase.Picker.default
                {...databasePickerProps}
                renderTrigger={useCallback(({ setIsOpen, value, setValue, enabled }) => {
                  return (
                    <Dcdatabase.Input.default
                      variant='outline'
                      style={{ width: '50%' }}
                      hasValue={!!value}
                      disabled={!enabled}
                      onClearableClick={() => setValue(undefined)}
                      fetchValue={() => value}
                      fetcherDependencies={[value]}
                      onClick={() => setIsOpen(true)}
                    />
                  )
                }, [])}
              />
              <Dctable.Picker.default
                {...tablePickerProps}
                renderTrigger={useCallback(({ setIsOpen, value, setValue, enabled }) => {
                  return (
                    <Dctable.Input.default
                      variant='outline'
                      style={{ width: '50%' }}
                      hasValue={!!value}
                      disabled={!enabled}
                      onClearableClick={() => setValue(undefined)}
                      fetchValue={() => value}
                      fetcherDependencies={[value]}
                      onClick={() => setIsOpen(true)}
                    />
                  )
                }, [])}
              />
            </Flex>
          </Flex>
          <Flex gap='2'>
            <Button disabled={isButtonDisabled} asChild={true} variant='outline'>
              <a
                target='_blanc'
                href={`/api/v1/converter/table-to-excel?${QueryString.stringify({ ...queryParams, name: queryParams.table })}`}
              >
                Экспорт Excel
              </a>
            </Button>
            <Button disabled={isButtonDisabled} variant='outline' onClick={() => setImportModalOpen(true)}>
              Импорт
            </Button>
          </Flex>
        </Flex>

        <Flex mt='3' direction='column'>
          <_ActionBar {...actionBarProps} />
          <FetcherStatus {...fetcherStatusProps}>
            <Dcrow.ListTable.default {...listTableProps} />
          </FetcherStatus>
        </Flex>
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

      <Dcrow.FormModal.default {...updateFormModalProps} />
      <Dcrow.FormModal.default {...createFormModalProps} />
    </>
  )
}

Component.displayName = NAME
