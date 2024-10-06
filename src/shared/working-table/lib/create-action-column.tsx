import { DangerButton } from '~/shared/button'
import Icon from '~/shared/icon'
import { type ListTableTypes } from '~/shared/table'
import Text from '~/shared/text'
import { type Dictionary } from '~/utils/core'

interface Props<TItem extends Dictionary> {
  onTrashClick: (item: TItem) => void
}

export function createActionColumn<TItem extends Dictionary, TContext extends Dictionary>(
  props: Props<TItem>,
): ListTableTypes.Column<TItem, TContext> {
  return {
    accessorKey: 'action',
    name: 'Действия',
    renderHeader: ({ name }) => {
      return (
        <Text size='1' color='gray'>
          {name}
        </Text>
      )
    },
    cellProps: {
      style: {
        textAlign: 'right',
        // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
        padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
        verticalAlign: 'middle',
      },
    },
    headerProps: { style: { textAlign: 'right', verticalAlign: 'middle' } },
    renderCell: ({ item }) => {
      const row = item

      return (
        <DangerButton
          round={true}
          size='1'
          color='gray'
          variant='outline'
          onClick={(e) => {
            e.stopPropagation()
            props.onTrashClick(row)
          }}
        >
          <Icon name='Trash' />
        </DangerButton>
      )
    },
  }
}
