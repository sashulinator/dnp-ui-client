import { TableColumn } from '~/entities/explorer/ui/viewer'
import { TableSchemaItem } from '~/entities/operational-table'
import Flex from '~/ui/flex'
import { SortingButton } from '~/ui/table'
import Text from '~/ui/text'

export function toColumns<T extends Record<string, unknown>>(items: TableSchemaItem[]): TableColumn<T>[] {
  return items.map((item) => {
    return {
      cellProps: { align: item.type === 'number' ? 'right' : 'left' },
      headerProps: { align: item.type === 'number' ? 'right' : 'left' },
      key: item.columnName,
      renderHeader: ({ context }) => {
        return (
          <Flex width='100%' justify='between' gap='2' align='center'>
            {item.name}
            <SortingButton
              size='1'
              round={true}
              variant='ghost'
              onChange={(value) =>
                context?.setRequestParams?.((s) => ({
                  ...s,
                  sort: { [item.columnName]: value },
                }))
              }
              value={context?.requestParams?.sort[item.columnName]}
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
