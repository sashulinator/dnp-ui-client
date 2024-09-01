import { type TableColumn } from '~/entities/explorer/ui/viewer'
import { type TableSchemaItem } from '~/entities/operational-table'
// import { type StringFilter } from '~/lib/api'
import Flex from '~/ui/flex'
import { SortingButton } from '~/ui/table'
import TextField from '~/ui/text-field'

type Context = {
  sort: Record<string, 'asc' | 'desc'> | null
  setSort: (val: Record<string, 'asc' | 'desc'> | null) => void
  // searchQueries: Record<string, StringFilter> | null
  // setSearchQueries: (val: Record<string, StringFilter> | null) => void
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
      headerProps: { style: { textAlign: item.type === 'number' ? 'right' : 'left', verticalAlign: 'middle' } },
      accessorKey: item.columnName,
      renderHeader: ({ accessorKey, context }) => {
        const value = context?.sort?.[accessorKey] as 'asc'

        return (
          <Flex width='100%' justify='between' gap='3' align='center'>
            <TextField.Root variant='borderless' placeholder={item.name} size='1' style={{ width: '100%' }} />
            <SortingButton
              size='1'
              round={true}
              variant='ghost'
              onChange={(newValue) => context?.setSort?.(newValue === undefined ? null : { [accessorKey]: newValue })}
              value={value}
            />
          </Flex>
        )
      },
      renderCell: ({ value }) => {
        return value as string
      },
    }
  })
}
