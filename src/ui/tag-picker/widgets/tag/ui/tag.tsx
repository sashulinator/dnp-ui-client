import Button from '~/ui/button'
import Flex, { FlexProps } from '~/ui/flex'
import { TrashIcon } from '~/ui/icon'
import TextField from '~/ui/text-field'
import { c } from '~/utils/core'

export type Props = Omit<FlexProps, 'onChange'> & {
  value: string | undefined
  onTrashClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void
}

const displayName = 'ui-TagPicker-w-Tag'

/**
 * ui-TagPicker-w-Tag
 */
export default function Component(props: Props): JSX.Element {
  const { value = '', onTrashClick, onChange, ...flexProps } = props

  return (
    <Flex {...flexProps} className={c(props.className, displayName)} align='center' m='0 var(--l) 0 0'>
      <TextField.Root
        color={value ? undefined : 'red'}
        value={value}
        variant='soft'
        style={{ color: 'var(--primary)' }}
        onChange={(e) => onChange(e, e.target.value || '')}
      >
        <TextField.Slot side='left'>#</TextField.Slot>
        <TextField.Slot side='right'>
          <Button color='red' round={true} size={'1'} onClick={onTrashClick}>
            <TrashIcon />
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  )
}
Component.displayName = displayName
