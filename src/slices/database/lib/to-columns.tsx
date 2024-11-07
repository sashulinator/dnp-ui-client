import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import { type TableColumn } from '~/slices/explorer/ui/viewer'
import { type Sort, SortButton } from '~/slices/sort'
import {
  FilterConfigurator,
  type IntFilter,
  type IsFilter,
  type StringFilter,
  toFilter,
  toFilterConfig,
} from '~/slices/where'
import { type SetterOrUpdater, assertDefined } from '~/utils/core'
import { add, omit } from '~/utils/dictionary'

import { type Column } from '../models/database'

export type Context = {
  sort: Sort | undefined
  setSort: (val: Sort | undefined) => void
  searchFilter: Record<string, StringFilter | IntFilter | IsFilter>
  setSearchFilter: SetterOrUpdater<Record<string, StringFilter | IntFilter | IsFilter>>
}

export function toColumns<T extends Record<string, unknown>>(items: Column[]): TableColumn<T, Context>[] {
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
      name: item.display,
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
  const searchFilter = context.searchFilter?.[accessorKey]

  const filterConfig = toFilterConfig(searchFilter)

  return (
    <Flex width='100%' justify='between' gap='4' align='center'>
      <FilterConfigurator.Root
        filterConfig={filterConfig}
        onFilterConfigChange={(filterConfig) => {
          /**
           * Если сделать в лоб:
           *  _____________________________________________________
           * |                                                     |
           * |  { [x: string]: ReplaceValueByFilter<Dictionary> }  |
           * |        ~~~~~~~                                      |
           * |  accessorKey: keyof TItem превращается в string     |
           * |______  _____________________________________________|
           *        |/
           * const searchFilterToAdd = { [accessorKey]: toFilter(filterConfig) }
           * */
          const searchFilterToAdd = add({}, accessorKey, toFilter(filterConfig))
          context?.setSearchFilter((s) => ({ ...s, ...searchFilterToAdd }))
        }}
      >
        <Flex width='100%'>
          <FilterConfigurator.Input placeholder={name} style={{ width: '100%' }} />
        </Flex>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button color={searchFilter ? 'amber' : 'gray'} square={true} size='1' variant='ghost'>
              <Icon name='Filter' />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <FilterConfigurator.ClearDropdownMenuItem
              onClick={() => context?.setSearchFilter((s) => omit(s, accessorKey))}
            />
            <FilterConfigurator.NotModeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Строковый</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.CaseSensitiveModeDropdownMenuItem />
            <FilterConfigurator.StartsWithTypeDropdownMenuItem />
            <FilterConfigurator.EndsWithTypeDropdownMenuItem />
            <FilterConfigurator.ContainsTypeDropdownMenuItem />
            <FilterConfigurator.MatchTypeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Числовой</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.EqualsTypeDropdownMenuItem />
            <FilterConfigurator.GtTypeDropdownMenuItem />
            <FilterConfigurator.GteTypeDropdownMenuItem />
            <FilterConfigurator.LtTypeDropdownMenuItem />
            <FilterConfigurator.LteTypeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Шаблоны</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.EmptyTemplateDropdownMenuItem />
            <FilterConfigurator.NotEmptyTemplateDropdownMenuItem />
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <SortButton
          size='1'
          round={true}
          variant='ghost'
          onChange={(newValue) => context?.setSort?.({ [accessorKey]: newValue })}
          value={sortValue}
        />
      </FilterConfigurator.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button square={true} size='1' variant='ghost'>
            <Icon name='DotsVertical' />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => alert('Не имплементированно!')}>Нормализация по колонке</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
