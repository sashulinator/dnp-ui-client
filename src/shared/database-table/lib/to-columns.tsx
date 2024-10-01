import { toFilter } from '~/common/shared/where/lib/to-filter'
import { type TableSchemaItem } from '~/entities/operational-table'
import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import { type TableColumn } from '~/shared/explorer/ui/viewer'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Sort, SortButton } from '~/shared/sort'
import Text from '~/shared/text'
import { FilterConfigurator, type IntFilter, type IsFilter, type StringFilter, toFilterConfig } from '~/shared/where'
import { type SetterOrUpdater, assertDefined } from '~/utils/core'

export type Context = {
  sort: Sort | undefined
  setSort: (val: Sort | undefined) => void
  searchFilter: Record<string, StringFilter | IntFilter | IsFilter>
  setSearchFilter: SetterOrUpdater<Record<string, StringFilter | IntFilter | IsFilter>>
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
  const searchFilter = context.searchFilter?.[accessorKey]

  const filterConfig = toFilterConfig(searchFilter)

  return (
    <Flex width='100%' justify='between' gap='4' align='center'>
      <FilterConfigurator.Root
        filterConfig={filterConfig}
        onFilterConfigChange={(filterConfig) => {
          context?.setSearchFilter((s) => ({ ...s, [accessorKey]: toFilter(filterConfig) }))
        }}
      >
        <FilterConfigurator.Input placeholder={name} style={{ width: '100%' }} />

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
            <DropdownMenu.Label>
              <Text size='1'>Строковый</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.CaseSensitiveDropdownMenuItem />
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
            <DropdownMenu.Item
              onClick={() => {
                context?.setSearchFilter((s) => ({ ...s, [accessorKey]: { is: null } }))
              }}
            >
              Пусто
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                context?.setSearchFilter((s) => ({ ...s, [accessorKey]: { not: null } }))
              }}
            >
              Не пусто
            </DropdownMenu.Item>
            {/* <DropdownMenu.Separator /> */}
            {/* <DropdownMenu.Item>Регистр</DropdownMenu.Item> */}
            <DropdownMenu.Separator />
            <DropdownMenu.Label>
              <Text size='2'>Нормализация</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item onClick={() => alert('Не имплементированно!')}>Запуск по колонке</DropdownMenu.Item>
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
    </Flex>
  )
}
