import { DropdownMenu } from '@radix-ui/themes'

import { useState } from 'react'

import { getStringFilterConfig } from '~/common/lib/api/get-string-filter-config'
import { type TableColumn } from '~/entities/explorer/ui/viewer'
import { type TableSchemaItem } from '~/entities/operational-table'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Sort } from '~/shared/sort'
import { SortingButton } from '~/shared/table'
import Text from '~/shared/text'
import TextField from '~/shared/text-field'
import { type StringFilter } from '~/shared/where'
import { type SetterOrUpdater, assertDefined, isString } from '~/utils/core'
import { useDebounceCallback } from '~/utils/core-hooks'
import { remove } from '~/utils/dictionary'

export type Context = {
  sort: Sort | undefined
  setSort: (val: Sort | undefined) => void
  searchFilter: Record<string, StringFilter>
  setSearchFilter: SetterOrUpdater<Record<string, StringFilter>>
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

  const stringFilterConfig = getStringFilterConfig(context.searchFilter?.[accessorKey])

  const [setSearchWithDebounce] = useDebounceCallback(context?.setSearchFilter, 500)
  const [searchValue, setSearchValue] = useState(stringFilterConfig.value || '')

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
            if (!newValue) {
              setSearchWithDebounce((s) => remove(s, accessorKey as string))
            } else {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { startsWith: newValue } }))
            }
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
            <Text size='1'>Поиск</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { contains: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('contains')
                  ? 'amber'
                  : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Содержит
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { startsWith: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              variant='soft'
              size='1'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('startsWith')
                  ? 'amber'
                  : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Начинается
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { endsWith: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('endsWith')
                  ? 'amber'
                  : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Заканчивается
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { equals: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('equals')
                  ? 'amber'
                  : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Равен
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { gt: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('gt') ? 'amber' : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Больше чем
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { gte: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('gte')
                  ? 'amber'
                  : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Больше чем или равен
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { gt: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('lt') ? 'amber' : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Меньше чем
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              setSearchWithDebounce((s) => ({ ...s, [accessorKey]: { gt: searchValue as string } }))
            }}
          >
            <Button
              square={true}
              size='1'
              variant='soft'
              color={
                (Object.keys(context.searchFilter?.[accessorKey] || {}).includes('lte')
                  ? 'amber'
                  : undefined) as 'amber'
              }
            >
              <Icon name='Star' />
            </Button>
            Меньше чем или равен
          </DropdownMenu.Item>
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
      <SortingButton
        size='1'
        round={true}
        variant='ghost'
        onChange={(newValue) => context?.setSort?.({ [accessorKey]: newValue })}
        value={sortValue}
      />
    </Flex>
  )
}
