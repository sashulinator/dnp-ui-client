import { useRef } from 'react'
import Tag from '../widgets/tag'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import { PlusIcon } from '~/ui/icon'

import TextField from '~/ui/text-field'
import { useControlledState } from '~/utils/hooks'
import { push, remove, replace } from '~/utils/list'

export interface Props {
  className?: string | undefined
  value: string[] | undefined
  onChange: ((v: string[] | undefined) => void) | undefined
}

const displayName = 'ui-TagPicker'

/**
 * Tag-picker
 */
export default function Component(props: Props): JSX.Element {
  const [value, onChange] = useControlledState([], props.value, props.onChange)

  const inputRef = useRef<HTMLInputElement>(null)
  const plusButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Flex gap='2' wrap='wrap'>
      {value?.map((tag, i) => {
        return (
          <Tag
            key={i}
            value={tag}
            onChange={(_, newValue): void => onChange?.(replace(value, i, newValue))}
            onTrashClick={(): void => onChange?.(remove(i, value))}
          />
        )
      })}

      <Flex align='center' gap='2'>
        <TextField.Root
          ref={inputRef}
          autoFocus={true}
          onKeyDown={(e): void => {
            if (e.key !== 'Enter') return
            submitNewTag()
          }}
        >
          <TextField.Slot side='right'>
            <Button
              size='1'
              round={true}
              onClick={(): void => {
                submitNewTag()
              }}
            >
              <PlusIcon />
            </Button>
          </TextField.Slot>
          <TextField.Slot side='left'>#</TextField.Slot>
        </TextField.Root>
      </Flex>
    </Flex>
  )

  function submitNewTag() {
    if (inputRef.current === null) return
    if (value?.includes(inputRef.current.value)) return
    if (inputRef.current.value === '') return
    onChange?.(push(inputRef.current.value, value))
    inputRef.current.value = ''
    setTimeout(() => {
      plusButtonRef.current?.focus()
    })
  }
}

Component.displayName = displayName
