import Button from '~/shared/button'
import Flex, { type FlexProps } from '~/shared/flex'
import Icon from '~/shared/icon'
import TextInput from '~/shared/text-input'
import { c } from '~/utils/core'

export type Props = Omit<FlexProps, 'onChange'> & {
  value: string | undefined
  onTrashClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void
}

const displayName = 'tagPicker-TagPicker-w-Tag'

/**
 * ui-TagPicker-w-Tag
 */
export default function Component(props: Props): JSX.Element {
  const { value = '', onTrashClick, onChange, ...flexProps } = props

  return (
    <Flex {...flexProps} className={c(props.className, displayName)} align='center' m='0 var(--l) 0 0'>
      <TextInput
        color={value ? undefined : 'red'}
        value={value}
        variant='soft'
        style={{ color: 'var(--primary)' }}
        onChange={(e) => onChange(e, e.target.value || '')}
        left={'#'}
        right={
          <Button color='red' round={true} size={'1'} onClick={onTrashClick}>
            <Icon name='Trash' />
          </Button>
        }
      />
    </Flex>
  )
}
Component.displayName = displayName
