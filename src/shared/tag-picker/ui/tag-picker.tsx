import { useRef } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import TextInput from '~/shared/text-input'
import { push, remove, replace } from '~/utils/list'

import Tag from '../widgets/tag'

export interface Props {
  className?: string | undefined
  value: string[] | undefined
  onChange: ((v: string[] | undefined) => void) | undefined
}

const displayName = 'tagPicker-TagPicker'

/**
 * Tag-picker
 */
export default function Component(props: Props): JSX.Element {
  const { value, onChange } = props
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
        <TextInput
          ref={inputRef}
          // autoFocus={true}
          onKeyDown={(e): void => {
            if (e.key !== 'Enter') return
            submitNewTag()
          }}
          left={'#'}
          right={
            <Button
              size='1'
              round={true}
              onClick={(): void => {
                submitNewTag()
              }}
            >
              <Icon name='Plus' />
            </Button>
          }
        />
      </Flex>
    </Flex>
  )

  function submitNewTag() {
    if (inputRef.current === null) return
    if (value?.includes(inputRef.current.value)) return
    if (inputRef.current.value === '') return
    onChange?.(push(inputRef.current.value, value || []))
    inputRef.current.value = ''
    setTimeout(() => {
      plusButtonRef.current?.focus()
    })
  }
}

Component.displayName = displayName
