import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type ColumnTypes } from '~/shared/table'
import Text from '~/shared/text'
import { type Dictionary } from '~/utils/core'

interface Props<TItem extends Dictionary> extends Partial<ColumnTypes.Column<TItem, Dictionary>> {
  headerTitle?: string
  justify?: 'center' | 'end' | 'start' | undefined
  onTrashClick?: (e: React.MouseEvent, item: TItem) => void
  onEditClick?: (e: React.MouseEvent, item: TItem) => void
  onCrossClick?: (e: React.MouseEvent, item: TItem) => void
}

export function createActionColumn<TItem extends Dictionary>(
  props: Props<TItem>,
): ColumnTypes.Column<TItem, Dictionary> {
  const headerTitle = props.headerTitle

  return {
    accessorKey: 'action',
    name: 'Действия',
    renderHeader: ({ name }) => {
      return (
        <Text size='1' color='gray'>
          {headerTitle ?? name}
        </Text>
      )
    },
    cellProps: {
      ...props.cellProps,
      style: {
        textAlign: 'right',
        // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
        padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
        verticalAlign: 'middle',
        ...props.cellProps?.style,
      },
    },
    headerProps: { style: { textAlign: 'right', verticalAlign: 'middle' } },
    renderCell: ({ item }) => {
      const row = item

      return (
        <Flex gap='1' justify={props.justify || 'end'} align='center' height='100%'>
          {props.onEditClick && (
            <Button
              onClick={(e) => {
                props.onEditClick?.(e, row)
              }}
              variant='soft'
              color='gray'
              size='1'
              round={true}
            >
              <Icon name='Pencil' />
            </Button>
          )}
          {props.onCrossClick && (
            <Button
              onClick={(e) => {
                props.onCrossClick?.(e, row)
              }}
              variant='soft'
              size='1'
              round={true}
            >
              <Icon name='Cross1' />
            </Button>
          )}
          {props.onTrashClick && (
            <DangerButton
              round={true}
              size='1'
              color='gray'
              variant='soft'
              onClick={(e) => {
                props.onTrashClick?.(e, row)
              }}
            >
              <Icon name='Trash' />
            </DangerButton>
          )}
        </Flex>
      )
    },
    ...props,
  }
}
