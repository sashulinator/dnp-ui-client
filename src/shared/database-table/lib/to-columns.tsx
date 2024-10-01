import { useState } from 'react'

import { type TableSchemaItem } from '~/entities/operational-table'
import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import { type TableColumn } from '~/shared/explorer/ui/viewer'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Sort, SortButton } from '~/shared/sort'
import Text from '~/shared/text'
import TextField from '~/shared/text-field'
import { FilterConfigurator, type IntFilter, type StringFilter, toFilterConfig } from '~/shared/where'
import { type SetterOrUpdater, assertDefined, isString } from '~/utils/core'
import { useDebounceCallback } from '~/utils/core-hooks'

export type Context = {
  sort: Sort | undefined
  setSort: (val: Sort | undefined) => void
  searchFilter: Record<string, StringFilter | IntFilter>
  setSearchFilter: SetterOrUpdater<Record<string, StringFilter | IntFilter>>
}

export function toColumns<T extends Record<string, unknown>>(items: TableSchemaItem[]): TableColumn<T, Context>[] {
  return items.map((item) => {
    return {
      cellProps: {
        style: {
          whiteSpace: 'nowrap',
          textAlign: item.type === 'number' ? 'right' : 'left',
          // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
          padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
          verticalAlign: 'middle',
        },
      },
      headerProps: {
        style: { minWidth: '12rem', textAlign: item.type === 'number' ? 'right' : 'left', verticalAlign: 'middle' },
      },
      accessorKey: item.columnName,
      name: item.name,
      renderHeader: _HeaderCell as TableColumn<T, Context>['renderHeader'],
      renderCell: ({ value }) => {
        return value as string
      },
    }
  })
}

interface _HeaderProps<T> {
  accessorKey: T
  context?: Context | undefined
  name: string
}

function _HeaderCell<T extends string>({ accessorKey, context, name }: _HeaderProps<T>): JSX.Element {
  assertDefined(context)

  const sortValue = context?.sort?.[accessorKey] as 'asc'
  const filter = context.searchFilter?.[accessorKey]

  const filterConfig = toFilterConfig(filter)

  const [setSearchWithDebounce] = useDebounceCallback(context?.setSearchFilter, 500)
  const [searchValue, setSearchValue] = useState(filterConfig.value || '')

  return (
    <Flex width='100%' justify='between' gap='4' align='center'>
      {isString(searchValue) && (
        <TextField.Root
          value={searchValue || ''}
          color='amber'
          variant={searchValue ? 'soft' : 'borderless'}
          onChange={(e) => {
            const newValue = e.target.value
            setSearchValue(e.target.value)
            setSearchWithDebounce((s) => ({
              ...s,
              [accessorKey]: { [filterConfig.type]: newValue } as StringFilter,
            }))
          }}
          placeholder={name}
          size='1'
          style={{ width: '100%' }}
        />
      )}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button square={true} size='1' variant='ghost'>
            <Icon name='DotsVertical' />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>Поиск</Text>
          </DropdownMenu.Label>
          <FilterConfigurator.Root
            filterConfig={filterConfig}
            onFilterConfigChange={(filterConfig) => {
              setSearchWithDebounce((s) => ({
                ...s,
                [accessorKey]: {
                  [filterConfig.type as 'contains']: filterConfig.value as string,
                  caseSensitive: filterConfig.caseSensitive ?? false,
                },
              }))
            }}
          >
            <DropdownMenu.Label>
              <Text size='1'>Строковый</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.CaseSensitiveDropdownMenuItem />
            <FilterConfigurator.ContainsTypeDropdownMenuItem />
            <FilterConfigurator.StartsWithTypeDropdownMenuItem />
            <FilterConfigurator.EndsWithTypeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Числовой</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.EqualsTypeDropdownMenuItem />
            <FilterConfigurator.GtTypeDropdownMenuItem />
            <FilterConfigurator.GteTypeDropdownMenuItem />
            <FilterConfigurator.LtTypeDropdownMenuItem />
            <FilterConfigurator.LteTypeDropdownMenuItem />
          </FilterConfigurator.Root>
          {/* <DropdownMenu.Separator /> */}
          {/* <DropdownMenu.Item>Регистр</DropdownMenu.Item> */}
          <DropdownMenu.Separator />
          <DropdownMenu.Label>
            <Text size='1'>Нормализация</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { endsWith: searchValue as string } }))
            }}
          >
            Запуск по колонке
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <SortButton
        size='1'
        round={true}
        variant='ghost'
        onChange={(newValue) => context?.setSort?.({ [accessorKey]: newValue })}
        value={sortValue}
      />
    </Flex>
  )
}
