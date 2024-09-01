import { TableColumn } from '~/entities/explorer/ui/viewer'
import { TableSchemaItem } from '~/entities/operational-table'
import Flex from '~/ui/flex'
import { SortingButton } from '~/ui/table'
import Text from '~/ui/text'

type Context = {
  sort: Record<string, 'asc' | 'desc'> | null
  setSort: (val: Record<string, 'asc' | 'desc'> | null) => void
}

export function toColumns<T extends Record<string, unknown>>(items: TableSchemaItem[]): TableColumn<T, Context>[] {
  return items.map((item) => {
    return {
      cellProps: { align: item.type === 'number' ? 'right' : 'left' },
      headerProps: { align: item.type === 'number' ? 'right' : 'left' },
      accessorKey: item.columnName,
      renderHeader: ({ accessorKey, context }) => {
        return (
          <Flex width='100%' justify='between' gap='2' align='center'>
            {item.name}
            <SortingButton
              size='1'
              round={true}
              variant='ghost'
              onChange={(value) => context?.setSort?.(value === undefined ? null : { [accessorKey]: value })}
              value={context?.sort?.[accessorKey]}
            />
          </Flex>
        )
      },
      renderCell: ({ value }) => {
        return <Text wrap='nowrap'>{value as string}</Text>
      },
    }
  })
}
